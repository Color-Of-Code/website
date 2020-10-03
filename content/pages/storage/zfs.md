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

Deduplication was activated for funani, pictures and videos as these data sets have many redundant copies of files.

To see the status of deduplication, look at the DDT entries

```
$ zpool status -D backup1
  pool: backup1
 state: ONLINE
  scan: scrub repaired 0B in 0 days 00:02:00 with 0 errors on Sat Sep 26 22:47:29 2020
config:

	NAME                                   STATE     READ WRITE CKSUM
	backup1                                ONLINE       0     0     0
	  ata-WDC_WD8004FRYZ-01VAEB0_VDK269PK  ONLINE       0     0     0

errors: No known data errors

 dedup: DDT entries 470195, size 489B on disk, 157B in core

bucket              allocated                       referenced
______   ______________________________   ______________________________
refcnt   blocks   LSIZE   PSIZE   DSIZE   blocks   LSIZE   PSIZE   DSIZE
------   ------   -----   -----   -----   ------   -----   -----   -----
     1     320K   39,9G   39,9G   39,9G     320K   39,9G   39,9G   39,9G
     2     138K   17,2G   17,2G   17,2G     289K   36,1G   36,1G   36,1G
     4    2,02K    258M    258M    258M    8,40K   1,05G   1,05G   1,05G
    32        1    128K    128K    128K       60   7,50M   7,50M   7,50M
 Total     459K   57,4G   57,4G   57,4G     617K   77,1G   77,1G   77,1G
```

The important fields are the Total allocated blocks and the Total referenced blocks.
In the example above, 77.1G is stored on disk in 57.4G of space.
Or 617k blocks in 459k block's worth of space.

To get the actual size of the table, see:

`DDT entries 470195, size 489B on disk, 157B in core`

* 470195 * 157 = 73820615 bytes = 70.4MB in RAM.

After running data copy actions for a while:

```
$ zpool status -D backup1
  pool: backup1
 state: ONLINE
  scan: scrub repaired 0B in 0 days 00:02:00 with 0 errors on Sat Sep 26 22:47:29 2020
config:

	NAME                                   STATE     READ WRITE CKSUM
	backup1                                ONLINE       0     0     0
	  ata-WDC_WD8004FRYZ-01VAEB0_VDK269PK  ONLINE       0     0     0

errors: No known data errors

 dedup: DDT entries 3636080, size 466B on disk, 150B in core

bucket              allocated                       referenced
______   ______________________________   ______________________________
refcnt   blocks   LSIZE   PSIZE   DSIZE   blocks   LSIZE   PSIZE   DSIZE
------   ------   -----   -----   -----   ------   -----   -----   -----
     1    1,80M    230G    230G    230G    1,80M    230G    230G    230G
     2    1,45M    186G    186G    186G    3,42M    437G    437G    437G
     4     225K   28,2G   28,2G   28,2G     959K    120G    120G    120G
     8       27   3,32M   3,32M   3,32M      228   28,1M   28,1M   28,1M
    16        1   42,5K   42,5K     44K       19    808K    808K    836K
    32        1    128K    128K    128K       58   7,25M   7,25M   7,25M
    4K        1    128K    128K    128K    7,67K    982M    982M    982M
 Total    3,47M    443G    443G    443G    6,16M    788G    788G    788G
```

* 3636080 * 150 = 545412000 bytes = 520MB in RAM.

With `zdb` some more insight in block handling can be analyzed (command takes long to complete):

```
$ zdb -b backup1

Traversing all blocks to verify nothing leaked ...

loading concrete vdev 0, metaslab 464 of 465 ...
1.02T completed (1703MB/s) estimated time remaining: 0hr 27min 57sec
...
2.47T completed (2055MB/s) estimated time remaining: 0hr 10min 50sec
...
3.77T completed (2494MB/s) estimated time remaining: 4294540182hr 4294967237min 4294967289sec
	No leaks (block sum matches space maps exactly)

	bp count:              33582294
	ganged count:                 0
	bp logical:       4210840985088      avg: 125388
	bp physical:      4134910136832      avg: 123127     compression:   1.02
	bp allocated:     4142963724288      avg: 123367     compression:   1.02
	bp deduped:         20500357120    ref>1: 140999   deduplication:   1.00
	Normal class:     4122463367168     used: 51.60%

	additional, non-pointer bps of type 0:      88259
	Dittoed blocks on same vdev: 880345
```

Dittoed blocks are duplicate blocks but not sure how to interpret these numbers (TODO)
