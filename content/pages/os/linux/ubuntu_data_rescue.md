---
published: true
path: "/linux/ubuntu/data-rescue"
date: "2020-03-01"
title: "Ubuntu Data Rescue"
tags: ["ubuntu", "data rescue", "linux"]
---

## Ubuntu data rescue

- example 1: System does not boot anymore after an OS upgrade (kernel panic). Data is on a LVM.
- example 2: System does not boot anymore (HDD errors). Data is on an ext3 partition.

### Example 1

System does not boot anymore after an OS upgrade (kernel panic). Data is on a LVM.

Automatic:

Booted Ubuntu 16.04 LTS with a LAN connection active. The LVM was setup properly and recognized perfectly. This was not the case without network access.

In this case it's easy to backup the data and proceed with a re-installation.

    Select do something else
    Setup /, swap and /boot partitions
    Select the place where bootloader will be stored
    Take care that no checkbox for format partition is set (otherwise data will be wiped!)

The setup warns against deletion of folders during install (backup!) but should leave /home alone.

    After installation recreate the users in the same order as on the original system and/or take care to chown the files appropriately.

Manual steps:

Install LVM2 tools (now you need network access!)

```bash
apt install lvm2
```

Check if partitions are recognized

```bash
fdisk -lu
```

Once installed, run pvscan to scan all disks for physical volume. this to make sure your LVM harddisk is detected by Ubuntu

```bash
pvscan
```

After that run vgscan to scan disks for volume groups

```bash
vgscan
```

Activate all volume groups available.

```bash
vgchange -a y
```

Run lvscan to scan all disks for logical volume. You can see partitions inside the hard disk now active.

```bash
lvscan
```

Mount the partition to any directory you want, usually to /mnt
You can access the partition in the /mnt directory and can backup your data

After booting in the new system check that the data is now all ok and call

```bash
apt update && apt upgrade
```

Maybe several times until no error comes (some packages might be incompatible external ones or remain on the system and not get cleaned up correctly).

### Example 2

References:

- http://certifiedgeek.weebly.com/blog/ubuntu-data-recovery-adventure-unknown-filesystem-type-linux_raid_member-lvm2_member
- https://bosnadev.com/2014/12/29/pro-tip-repair-ubuntu-system-live-cd/
- http://www.linuxjournal.com/article/8874
- https://quonn.wordpress.com/2010/12/01/how-to-mount-lvm-partition-on-ubuntu/

### Example 3

Non LVM volume, a simple ext4 partition with disk errors. SMART values look ok but disk access is very slow on some sectors.

Use `ddrescue` to create an image file out of the partition in two steps. Step 1 creates an image file and a log file to record problematic sectors:

```bash
ddrescue -n /dev/sdb disk-image-file.img rescue.log
```

After this first run there might be problematic sectors which can be retried using re-reads, following command tries to reread max 3 times:

```bash
ddrescue -d -r 3 /dev/sdb disk-image-file.img rescue.log
```

If that fails you can try again but retrimmed, so it tries to reread full sectors:

```bash
ddrescue -d --retrim -r 3 /dev/sdb disk-image-file.img rescue.log
```

How to mount and use the disk image ((use the offset option if you made a full image and want a given partition)):

```bash
mount -o loop,ro disk-image-file.img mountpoint
# find out the offset of the partition you want to mount using fdisk
mount -o loop,ro,offset=x disk-image-file.img mountpoint
```

Repair the partition eventually using the appropriate checker for the partition format:

```bash
fsck.ext3 disk-image-file.img
fsck.ext4 disk-image-file.img
...
```

References:

- https://help.ubuntu.com/community/DataRecovery
- https://www.gnu.org/software/ddrescue/manual/ddrescue_manual.html
