---
published: true
path: "/virtualization/lxc"
date: "2019-01-01"
title: "Linux Containers"
tags: ["virtualization", "linux", "lxc", "container", "TODO_cleanup"]
---
# LXC - Linux containers

* [Wikipedia: LXC](https://en.wikipedia.org/wiki/LXC)
* [LXC tutorial step by step](https///www.stgraber.org/2013/12/20/lxc-1-0-blog-post-series/)
* [LXC Overview](https///blogs.oracle.com/OTNGarage/entry/linux_containers_part_1_overview)
* [Exploring LXC networking](http://containerops.org/2013/11/19/lxc-networking/)
* [Getting started](https///www.digitalocean.com/community/tutorials/getting-started-with-lxc-on-an-ubuntu-13-04-vps)
* [LXCs](https://blogs.oracle.com/OTNGarage/entry/linux_container_lxc_part_2)
* [System containers to isolate servives](http://www.techrepublic.com/blog/linux-and-open-source/how-to-create-lxc-system-containers-to-isolate-services/)
* [LAMP in an LXC](http://www.zyisrad.com/linux-apache-mysql-php-in-an-lxc-container/)

## Ubuntu setup

Install basic support tools:

```bash
apt-get install lxc
```

Check the configuration:

```bash
lxc-checkconfig
```

List containers:

```bash
lxc-ls --fancy
```

Access console to a container:

```bash
lxc-console
```

Templates can be found under:

```
/usr/share/lxc/templates
```

Small and efficient and secure template [lxc-alpine](http://www.alpinelinux.org/):

    alpine

## Python3 api

There is a nice python3 api that can be used to automate the setup of LXC.

* https://github.com/lxc/lxc/tree/master/src/python-lxc

It is actually a wrapper for the C api.

## LXC Web Panel

In order to control the LXCs in a user friendly manner, there is a web panel:

* https://lxc-webpanel.github.io/install.html
* https://github.com/lxc-webpanel/LXC-Web-Panel
