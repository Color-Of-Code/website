---
published: true
path: "/linux/ubuntu/luks-rescue"
date: "2023-06-28"
title: "Ubuntu LUKS Rescue"
tags: ["ubuntu", "luks", rescue", "linux"]
---

## Ubuntu LUKS rescue

I had a 18.04 system running LUKS for data security purposes.

After a `do-release-upgrade` starting from bionic I landed in jammy. I had a bunch of ppas and some combination of
`apt autoremove` after `apt update` and `apt upgrade` left me in a seemingly disastrous situation.

After a reboot and some wating time busybox shell pops up:

```
BusyBox v.1.21.1 (Ubuntu 1:1.21.1-1ubuntu1) built-in shell (ash)
Enter 'help' for list of built-in commands.

(initramfs)
Typing exit will display more information about the failure before bringing us back to the same busybox shell:

Gave up waiting for root device. Common problems:
  - Boot args (cat /proc/cmdline)
    - Check rootdelay= (did the system wait long enough?)
    - Check root= (did the system wait for the right device?)
  - Missing modules (cat /proc/modules; ls /dev)
ALERT! /dev/mapper/ubuntu-vg-root does not exist. Dropping to a shell! 

BusyBox v.1.21.1 (Ubuntu 1:1.21.1-1ubuntu1) built-in shell (ash)   
Enter 'help' for list of built-in commands.  

(initramfs)
```

If you landed on this page, chances are high that you are in the same situation...

### Reason

The main issue was in my case that for some reason `apt autoremove` decided to uninstall lvm2 and cryptsetup-initramfs.

That cryptsetup-initramfs is responsible for adding the drivers necessary to read LUKS encrypted partitions to the initramfs run at boot time.

As this driver is missing the whole disk looks like garbage to the OS and cannot find `/dev/mapper/ubuntu-vg-root`.

Therefore the system is totally stuck.

### Repair

#### Boot using a USB installation disk.

Create bootable USB disk using the latest Ubuntu installer from some working machine:

* Download an desktop image
* Use startup disc creation tool

Boot the system using that USB stick (hold the F12 key during boot and enter boot menu in my case).

Open a terminal with Ctrl+Alt+T

#### Check you can access the data

Assuming a drive which is partitioned this way:

* /dev/nvme0p1: EFI partition
* /dev/nvme0p2: unencrypted boot partition
* /dev/nvme0p3: encrypted LVM partition

Mount the required partitions:

```bash
cryptsetup luksOpen /dev/nvme0p3 nvme0p3_crypt
# At the prompt enter the password

# fetch the LVM info
vgchange -ay

mount /dev/mapper/ubuntu-vg-root /mnt
mount /dev/nvme0p3 /mnt/boot

# Mount the dynamic stuff needed to run the initramfs tool
mount -t proc proc /mnt/proc
mount -o bind /dev /mnt/dev
mount -o bind /sys /mnt/sys
```

You should now be relieved and see that your data is visible inside the `/mnt` folder.

**Note:**

With cryptsetup luksOpen, the same name as specified in `/etc/crypttab` on the root partition must be used.

#### Repair the boot process

Now it's time to repair the initramfs so it knows about the encrypted disk.

Then "enter" the root partition using:

```bash
chroot /mnt

# make sure necessary packages are installed
apt install lvm2 cryptsetup-initramfs

# regenerate initramfs
update-initramfs -c -k all
```

If you see any error message, you need to go deeper into it and solve that.

### Reboot

If everything went well you should end up with a system booting again as you were used to.

