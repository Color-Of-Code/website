---
published: true
path: "/virtualization/vdi-management"
date: "2020-09-26"
title: "vdi management"
tags: ["virtualization", "windows", "vdi", "linux", "virtualbox"]
---

## Introduction

`vdi` files are VirtualBox native virtual drive containers. These can have a fixed size or be dynamic, consuming as much space as is needed.

* "Hardware virtualization" deals with how to convert a real partition into a `vdi` container for use within VirtualBox
* "Compact vdis": At some point you might want to shrink such dynamic disk containers to ease maintenance (backup for example)

## Hardware virtualization

* [Ab in die VM](http://www.heise.de/ct/artikel/Ab-in-die-VM-1077800.html)
* [Laufendes Windows-System mit Disk2VHD als virtuelle Maschine weiterverwenden](http://www.tutonaut.de/anleitung-laufendes-windows-system-mit-disk2vhd-als-virtuelle-maschine-archivieren.html)

Tested with Windows 7

1. `disk2vhd`: create a vhd (without vhdx!)
2. transform the vhd into vdi with `VBoxManage clonehd`
3. setup a vm with VirtualBox & test if you can boot the vdi
4. Check the drivers, eventually remove the PCI bus driver if you get Code 12 errors. In my special case I had trouble with `AMD pci express 3gio filter`
5. Re-activation of the windows key in the VM (do not use old system anymore!!)

## Compact vdis

To shrink dynamic drives to a reasonable size (almost same as actually used bytes) follow the procedure here:

See https://www.howtogeek.com/312883/how-to-shrink-a-virtualbox-virtual-machine-and-free-up-disk-space/

Windows guest

* use defragmenter to defragment / compact the filesystem
* use sdelete to zero out unused space `sdelete.exe c: -z`

Linux guest

* use `zerofree`

Host

* Run `VBoxManage modifymedium disk <vdi file> --compact`
