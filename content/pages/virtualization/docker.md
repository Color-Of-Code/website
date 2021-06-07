---
published: true
path: "/virtualization/docker"
date: "2021-06-07"
title: "Docker"
tags: ["virtualization", "linux", "docker", "container"]
---
## Docker

### Ubuntu 20.04 setup

Install basic support tools:

```bash
sudo apt install docker.io
```

Configure to restart docker on boot:

```bash
sudo systemctl enable --now docker
```

### Permissions

Give `<USER>` permissions to run docker.

```bash
sudo usermod -aG docker <USER>
```

### Proxy

There are four different places where a HTTP proxy can be used in Docker.

- Between the Docker client and Docker daemon
- Between the Docker daemon and the Internet
- At container run-time
- At container build-time

Unfortunately each case needs to be configured differently in Docker.

Let's assume the proxy is on http://your.proxy:3128 for the following examples.

#### Proxy between the Docker client and Docker daemon

The Docker client is very thin and doesn’t do very much on its own. It simply calls
the Docker daemon to perform tasks by making REST requests.

This scenario is simple and the Docker client honours the well-known environment
variables for setting HTTP proxies as shown below.

```bash
export http_proxy=http://your.proxy:3128
export https_proxy=http://your.proxy:3128
export no_proxy=localhost,127.0.0.1
docker ps
```

Client configuration: Create a configuration file

```bash
mkdir -p ~/.docker
code ~/.docker/config.json
```

And add following information:

```json
{
  "proxies": {
    "default": {
      "httpProxy": "http://your.proxy:3128",
      "httpsProxy": "http://your.proxy:3128",
      "noProxy": "localhost,127.0.0.1,*.local"
    }
  }
}
```

### Proxy between Docker daemon and the Internet

A common misconception with the Docker client is that it connects to the registry to download
an image when you run “docker pull”. Configuring your environment to use a proxy should be enough
to pull an image from behind a firewall, right? Unfortunately this is not true.

As mentioned above the Docker client only makes REST requests to the Docker daemon and it does the
actual work. In this case it is the Docker daemon configuration that needs to be modified.

The Docker documentation on how to Control and Configure Docker with `systemd` tells you how to do this and is reproduced below.
As root, run the following commands.

#### Docker service proxy configuration

See also https://docs.docker.com/v17.09/engine/admin/systemd/#httphttps-proxy

Create a systemd drop-in directory for the docker service:

```bash
mkdir -p /etc/systemd/system/docker.service.d
```

Create a file called `/etc/systemd/system/docker.service.d/http-proxy.conf` that adds the HTTP_PROXY environment variable:

```ini
[Service]
Environment="HTTP_PROXY=http://your.proxy:3128"
Environment="HTTPS_PROXY=http://your.proxy:3128"
Environment="NO_PROXY=127.0.0.1,localhost
```

If you have internal Docker registries that you need to contact without proxying you can specify them via the `NO_PROXY` environment variable:

Flush changes and restart docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Verify that the configuration has been loaded:

```bash
systemctl show --property=Environment docker
```

### Proxy at Container Build-Time and Container Run-Time

Most Docker images perform network activity, such as downloading packages from distribution
archives or check out source code from Github. When the container is run it will probably also
need to make network connections as part of its normal operation. In both these cases in our
corporate environment a HTTP proxy must be configured.

One solution is to set the proxy environment variables in the Dockerfile using the `ENV` command.

```Dockerfile
FROM debian:jessie

# Don't do this - very bad style
ENV http_proxy http://your.proxy:3128
ENV https_proxy http://your.proxy:3128
```

This method works for both the container build and container run cases, but we now have hardcoded
the fact that we are using a proxy in the image. Now it is no longer possible for anyone who isn’t
behind your corporate proxy to build (or use) your container image if it’s distributed outside of
your company. Thus, it’s considered bad style to hardcode variables specific to your environment.

#### Proxy at Container Build-Time

The correct way is to use the `-–build-arg` command-line option to “docker build”. This sets environment
variables only when building the container image. For example if I have a Dockerfile in my current
directory I can build it from behind a firewall like so:

```bash
docker build \
    --build-arg http_proxy=http://your.proxy:3128 \
    --build-arg https_proxy=http://your.proxy:3128 \
    -t yourimage  .
```

#### Proxy at Container Run-Time

Compare this with the `--env` command-line option to “docker run” which set environment variables
when running the container. When running the container from behind a firewall:

```bash
docker run \
    --env http_proxy=http://your.proxy:3128 \
    --env https_proxy=http://your.proxy:3128 \
    myimage
```

By using the `--build-arg` and `--env` options in this way the container image can be both built, run
and distributed outside of the firewalled environment.

```bash
# inspect the merged config
$ docker-compose -f docker-compose.yml -f docker-compose.proxy.yml config
# run any command using the merged config
$ docker-compose -f docker-compose.yml -f docker-compose.proxy.yml up
```
