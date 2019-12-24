---
published: true
path: "/linux/raspi/tweaks"
date: "2019-01-09"
title: "Raspberry tweaks"
tags: ["raspi", "linux"]
---

# Raspi

## Raspberry pi 2

* OSMC installed as OS
* root account: ''osmc'', ''osmc'' by default
* Automatically expands to full SD size

Enable WIFI:

```bash
  connmanctl
  technologies
  enable wifi
  scan wifi
  agent on
  services
  connect wifi_Something here_managed_psk
```

Internet radio:

```bash
  apt-get install mpd mpc
```

Added web-interface.chorus

```bash
  apt-get install smb-app-osmc
```

to have netbios resolution
