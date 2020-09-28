---
published: true
path: "/storage/zfs"
date: "2020-09-27"
title: "ZFS on linux"
tags: ["storage", "zfs", "backup", "linux"]
---

## ZFS on Linux

Installation on ubuntu 20.04 LTS

```bash
apt install zfsutils-linux
```

Introduction: https://linuxhint.com/zfs-concepts-and-tutorial/

There are different levels of operation

* pool level: `zpool` bundles several virtual devices
* vdev level: allows to define which redundancy is applied to a set of devices (once added to a pool a vdev is immutable)
* filesystem level: `zfs` command allows to manage so called data sets (filesystems) on a pool

## Create a one disk pool

* `zpool create -f backup1 /dev/sda` create a new pool with one drive

Although you'll not be able to have recovery strategies with one drive you still can benefit from the additional error detection.

https://www.reddit.com/r/zfs/comments/5yuo44/single_drive_zfs_pools_on_desktop_computer/

* "ZFS will let you do all kinds of super duper neato shit like snapshots, and as you clearly need, protection against corruption/bit rot. This functionality is expected to work just fine with one disk in your zpool."
* `zfs set copies` can allow to create some redundancy of important files saving from local data corruption, although it'll obviously not save from disk failures...

## Commands

### Pool operations

* `zpool create -f backup1 /dev/sda` create a new pool with one drive
* `zpool history backup1` show history of commands
* `zpool scrub backup1` verify the pool
* `zpool export backup1` export the pool ("unmount" the pool)
* `zpool import backup1` import the pool ("mount" onto the default mount point)

### Data set operations

* `zfs set mountpoint=/mnt/backup1 backup1` define the default mount point
* `zfs create backup1/family` create a data set
* `zfs snapshot backup1/family@20200925` create a snapshot of the data set
* `zfs list` list the data sets
* `zfs list -t snapshot` list snapshots
* `zfs list -r -t snapshot -o name,creation backup1/family` list snapshots for a given data set
* `zfs list -o space` disk space accounting check
* `zfs list -ro space backup1/family` disk space accounting check for a given data set

### Features

Use the dedup flag with care as it has a huge RAM impact but [people are working on it](https://openzfs.org/w/images/8/8d/ZFS_dedup.pdf).

Hints: https://constantin.glez.de/2011/07/27/zfs-to-dedupe-or-not-dedupe/
