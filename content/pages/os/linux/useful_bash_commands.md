---
published: true
path: "/os/linux/bash_commands"
date: "2020-03-22"
title: "Useful Bash Commands"
tags: ["os", "bash", "commands", "linux"]
---

## Keyboard/Terminal

- Search in history: <hk keys="Ctrl + R"></hk>
- Restore lost echo: `reset`

### List logged in users

```bash
who -a
```

## Storage

### List block devices

```bash
blkid
```

## Network

### Scans

arp, nmap, tcpdump

### Routing

Manipulate routing table to route only a segment through a ppp0 tunnel and
default to a route through the local gateway into the internet.

```bash
# route IPs in company range through tunnel
ip route add 172.24.0.0/16 dev ppp0

# delete default route via tunnel
ip route del default dev ppp0

# add default route back to internet via local GW
ip route add default via 192.168.178.1 dev wlp2s0
```

## Logs

List user agents:

```bash
awk -F\" '($2 ~ "^GET /"){print $6}' /var/log/apache2/access.log | sort | uniq
```

## Others
