---
published: true
path: "/virtualization/disk-to-vdi"
date: "2019-12-01"
title: "Hardware disk to vbox vdi"
tags: ["virtualization", "windows", "vdi", "linux", "virtualbox"]
---

## Hardware virtualization

* [Ab in die VM](http://www.heise.de/ct/artikel/Ab-in-die-VM-1077800.html)
* [Laufendes Windows-System mit Disk2VHD als virtuelle Maschine weiterverwenden](http://www.tutonaut.de/anleitung-laufendes-windows-system-mit-disk2vhd-als-virtuelle-maschine-archivieren.html)

Tested with Windows 7

1. `disk2vhd`: create a vhd (without vhdx!)
2. transform the vhd into vdi with `VBoxManage clonehd`
3. setup a vm with VirtualBox & test if you can boot the vdi
4. Check the drivers, eventually remove the PCI bus driver if you get Code 12 errors. In my special case I had trouble with `AMD pci express 3gio filter`
5. Re-activation of the windows key in the VM (do not use old system anymore!!)
