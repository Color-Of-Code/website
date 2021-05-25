---
published: true
path: "/os/linux/ubuntu/remote-upgrade"
date: "2021-05-25"
title: "Ubuntu Tweaks"
tags: ["os", "ubuntu", "upgrade", "linux", "release", "screen", "ssh"]
---

# Ubuntu Remote Release Upgrade

## Introduction

Running a remote release upgrade can be dangerous, VPN, SSH can be updated or break during the upgrade
process and leave a not bootable system as a result... This post shows how to mitigate the risks.

## Proxy settings

* /etc/apt/apt.conf

```conf
Acquire::http::Proxy "http://<proxy_addr>:<proxy_port>/";
Acquire::https::Proxy "http://<proxy_addr>:<proxy_port>/";
```

* snap

```bash
sudo snap set system proxy.http="http://<proxy_addr>:<proxy_port>"
sudo snap set system proxy.https="http://<proxy_addr>:<proxy_port>"
```

## Preparation

### Screen

Make sure `screen` is installed. This will enable to run the upgrade inside an encapsulated environment
that can survive network disconnects.

```bash
sudo apt install screen
```

### Upgrader tool

Make sure these packages are installed and up to date

```bash
sudo apt install update-manager-core
sudo apt install ubuntu-release-upgrader-core
```

Ensure the settings are correct:

```bash
sudo nano /etc/update-manager/release-upgrades
# set prompting behavior for for the release upgrader as lts.
```

### Update system to latest state

```bash
sudo snap refresh
sudo apt update
sudo apt upgrade
```

## Upgrade

```bash
sudo do-release-upgrade -d
```

The upgrade process also starts an alternative ssh server running at port 1022,
beside automatically running within a screen session (if screen is installed)

## Reconnect (if needed)

```bash
# list screen sessions
sudo screen -list
# reattach to a screen session:
sudo screen -d -r root/2953.ubuntu-release-upgrade-screen-window
```
