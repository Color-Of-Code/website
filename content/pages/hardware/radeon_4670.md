---
published: true
path: "/hardware/vga/radeon-4670"
date: "2020-05-18"
title: "Radeon 4670 support"
tags: ["hardware", "vga", "linux"]
---

# Radeon 4670 support

Problem is a blank screen during and after startup. The BIOS boot logo can be seen correctly.

## Official Hardware Support ends

But the open source driver is available (with some missing features)

```
Open Source AMD Radeon Ubuntu Driver
The Open Source AMD Radeon Ubuntu Driver is already installed on your system by default
and out of the box. They're integrated into Mesa and the Linux kernel. There is nothing
further you need to do in order to start using your AMD Radeon card. In this scenario
you may not be on the bleeding edge in terms of the latest AMD Radeon driver version,
but your system will benefit from an increased stability and painless automatic driver
updates.
```

* https://wiki.archlinux.org/index.php/AMDGPU
* https://wiki.archlinux.org/index.php/ATI (legacy)

## Debugging

### Getting information

* https://en.wikipedia.org/wiki/List_of_AMD_graphics_processing_units
* https://www.x.org/wiki/RadeonFeature/
* https://xorg.freedesktop.org/wiki/radeon/

```
lshw -c video
```

```
dmesg | grep -i amdgpu
```

To get the name and current status of connectors, you can use the following shell oneliner:

```bash
$ for p in /sys/class/drm/*/status; do \
    con=${p%/status}; echo -n "${con#*/card?-}: "; \
    cat $p; \
  done
DVI-I-1: connected
HDMI-A-1: disconnected
VGA-1: disconnected
```

The format is:

```txt
video=<conn>:<xres>x<yres>[M][R][-<bpp>][@<refresh>][i][m][eDd]
<conn>: Connector, e.g. DVI-I-1, see /sys/class/drm/ for available connectors
<xres> x <yres>: resolution
M: compute a CVT mode?
R: reduced blanking?
-<bpp>: color depth
@<refresh>: refresh rate
i: interlaced (non-CVT mode)
m: margins?
e: output forced to on
d: output forced to off
D: digital output forced to on (e.g. DVI-I connector)
```

You can override the modes of several outputs using video= several times, for instance, to force DVI to 1024x768 at 85 Hz and TV-out off:

```txt
video=DVI-I-1:1024x768@85 video=TV-1:d
```

Check available modes (for open source drivers)
```bash
$ xrandr -q
```

Check available framebuffer modes
```bash
$ hwinfo --framebuffer
```

```bash
glxinfo -B
```

Check loaded kernel modules
```
lsmod | grep amd
```

### Logs

Check boot messages:

```bash
dmesg
```

Xorg log:

```bash
cat /var/log/Xorg.0.log
```

## Disable modesetting

* `/etc/default/grub`

Add `radeon.modeset=0` to this line:

`GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"`

that it reads: `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash radeon.modeset=0"`

Then execute :

```bash
update-grub
```

## Links

* https://wiki.archlinux.org/index.php/Kernel_mode_setting
* https://www.phoronix.com/scan.php?page=article&item=amd_catalyst_legacy2&num=1
* https://linuxconfig.org/amd-radeon-ubuntu-20-04-driver-installation
* https://askubuntu.com/questions/688388/14-04-gets-black-screen-unless-radeon-modeset-0
* https://ubuntuforums.org/showthread.php?t=2425114
* http://www.hisdigital.com/us/product2-450.shtml
