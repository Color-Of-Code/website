---
published: true
path: "/storage/synology-settings"
date: "2020-07-24"
title: "Risk analyis: data loss "
tags: ["storage", "backup", "nas", "filesystem", "raid"]
---

# Risk analysis: data loss

Personal risk analysis and planned countermeasures.

Initially I thought it would be a good idea to buy an ECC RAM enabled hardware but this looks like an adventure with consumer hardware. Reliable server component being both loud and expensive I need to give up this idea. Only AMD Threadripper seems to ensure that the ECC works correctly but this is also dependent on the mainboard for example and there are no available tests covering the actual correction. In the end only one bit toggle can be detected and corrected, 2 bits detected but not corrected and if RAM is defective most of the time you face a situation where complete regions are KO. So finally I decided to go for a system without ECC RAM (both for technical and commercial reasons). This decision is reflected into the analysis.

## Risks

As the data goes from RAM to Disk via the CPU each of the things carrying the information are prone to deteriorate it.

### Disasters

Under disasters I consider risks coming from outside the system.

Elemental damage

* water damage
* fire damage
* lightning damage
* dust

Security

* theft of physical devices
* theft of information via network
* Virus / Malware / Ransomware

### System failure

Under system failures I consider risks coming from the system itself, not performing as intended.

RAM

* Bitrot
* Silent memory corruption
* Defective RAM cells

CPU / Software

* Wrong processing
* Bug in backup software
* Bug in filesystem drivers

Disk

* demagnetisation
* disk failure
* bad sectors

Cables / Bus

* connection cable not seated correctly
* Wrong communication (due to bugs, high load, ...)

Power

* power failure

Cooling

* heat/cooling trouble
* water cooling leak (if applicable)

### Accidents

Under accident I consider risks coming from the user/operator making a mistake of some kind.

Human

* delete/overwrite files accidentally
* wrong backup procedure/configuration
* dropping backup disk / handling error (~ disk failure)

## Prevention / measures

* ZFS use to detect bitrot & silent corruption on disk
* Disk scrubbing to avoid demagnetisation of HDDs
* Use checksums or [parchive](https://en.wikipedia.org/wiki/Parchive) use
* At least always a backup offline
* Mount only backup drives for the time running backups
* Store at least a backup off-site
* Use 2 different backup software tools
* Use 2 different filesystems
* Password safe
* Always encrypt sensitive information
* Monitor hardware
* Check backup
* Use snapshots and verify immutable data integrity
