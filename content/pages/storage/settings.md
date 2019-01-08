---
published: true
path: "/storage/synology-settings"
date: "2019-01-01"
title: "Synology settings"
tags: ["storage", "synology", "nas", "settings", "raid", "TODO_cleanup"]
---

# Settings (DS415+)

## Storage

### Calculators

* [Synology RAID calculator](https://www.synology.com/en-us/support/RAID_calculator)
* [Data loss RAID calculator](https://www.memset.com/tools/raid-calculator/)

### RAID 5 vs RAID 6

* [RAID 5 vs SHR (German)](http://geotagging-blog.de/2013/02/synology-nas-mit-raid-5-oder-shr/)
* [Don't use RAID 5 on small arrays](http://www.zdnet.com/article/raidfail-dont-use-raid-5-on-small-arrays/)
* [RAID 5 stops working in 2009](http://www.zdnet.com/article/why-raid-5-stops-working-in-2009/)
* [RAID 6 stops working in 2019](http://www.zdnet.com/article/why-raid-6-stops-working-in-2019/)

Beware of URE (Unrecoverable Read Errors) preventing array rebuilds in case of HDD crash.

With an error probability of $1 < 10^{14} bits$ that leads into a probability of successful rebuild for a RAID-5 made of 4x3TB HDDs of only 38.3%.

### Data Scrubbing

* [Schedule a data scrubbing](http://forum.synology.com/enu/viewtopic.php?t=65340)
* [RAID-5 URE Failures](http://holtstrom.com/michael/blog/post/588/RAID-5-URE-Failures.html)

### Information

* [BackBlaze statistics about HDD failure](https://www.backblaze.com/blog/3tb-hard-drive-failure/)
* [The math on HDD failure](https://forums.freenas.org/index.php?threads/the-math-on-hard-drive-failure.21110/)

## Network

### Load balancing

Load balancing can be activated so only one virtual NIC is visible and provides a better throughput in heavy load situations:

* Control Panel > Network > Create > Create Bond > Adaptive Load Balancing
* Apply

The Bond then used both NICs.

### WOL (Wake On LAN)

You need to send a special network packet to the NIC by using a tool like WOL2.

* https://github.com/moette/WOL2
* http://forum.synology.com/enu/viewtopic.php?f=149&t=21599
* http://www.heise.de/netze/artikel/Wake-on-WAN-221718.html (German)

## Security

### DoS protection

* Control Panel > Security > Protection > (Choose NIC) > Enable DoS protection
* Apply

## SSH

### Enable SSH

* Control Panel > Terminal & SNMP > Enable SSH Service
* Choose a port different from the standard port (e.g. 22123)

### SSH users

`<WRAP center round alert 60%>`
By default SSH can only be used by users `admin` and `root` and by using the admin password for both.
`</WRAP>`

* Change the shell for users allowed to use ssh inside `/etc/passwd` from `/sbin/nologin` into `/bin/sh`

Following setting avoids trouble if user home directories are not existing.

* Control Panel > User > Advanced > User Home > Enable user home service
* Apply

`<WRAP center round important 60%>`
The permissions on the default home directories may not be correct for a seamless use of SSH keys.

These are accepted permissions for home directory by ssh (ssh is and should be very picky about this)

* `rwx------`
* `rwxr-x---`
* `rwxr-xr-x`

You have to do a `chmod 755` on a user's home directory.

The user's `~/.ssh` folder and `~/.ssh/authorized_keys` file also need to have the correct permissions (`chmod 700` and `chmod 600`, respectively.)

`</WRAP>`

## Applications

*  Audio station
*  Photo station
*  Video station

## Rsync

`<WRAP center round todo 60%>`
Rework this section: using the root account directly seems to actually be a good option for backup purposes
`</WRAP>`

### Activate backup and replication

*  Backup & Replication > Backup Services > Network Backup Destination > Enable network backup service
*  Use customized rsync configuration
*  Apply

* `vi /etc/ssh/sshd_config`
* Uncomment `#RSAAuthentication yes`
* save
* restart ssh from the synology backup service panel (otherwise won't restart, because connection will be lost in the middle)

### User and groups

* Create a group `backup operators` that has RW permission on NetBackup
* Create a user e.g. `rsyncuser` that is member of `backup operators` and gets ssh access

### Rsync on share

rsync is used from the client side only and uses more network access and traffic to determine the differences.

### Rsync over ssh

rsync is used in a client/server mode better suited for security relevant transfers and a fine grained delta calculation.

* Create a rsync RSA key pair (without pass): `ssh-keygen -t rsa -b 2048 -f rsync-key`
* Copy key to NAS: `ssh-copy-id -p 22123 -i rsync-key rsyncuser@hostname`

You need to edit the file `/etc/rsyncd.conf`. ([Help](https://www.samba.org/ftp/rsync/rsyncd.conf.html))

[Help](http://www.linuxquestions.org/questions/linux-server-73/rsync-password-asked-even-after-generating-key-while-ssh-works-passwordless-4175464076/page3.html)


    rsync -av -e "ssh -p 22123 -i /home/user/.ssh/rsync-key" home/ rsyncuser@`<ip>`:/volume1/NetBackup/backupdata/


## Hardware and Power

Check what settings for applications can block hibernation.

*  https://www.synology.com/en-us/knowledgebase/faq/568

Information about sleep modes

*  https://www.synology.com/en-us/knowledgebase/faq/557

Information about what can prevent hibernation or intempestively wake up the NAS

*  http://forum.synology.com/enu/viewtopic.php?f=83&t=78930

"Hibernation requires patience. I have a DS-1813+ and played cat-and-mouse a little to get hibernation working properly. You can get some hints about what's waking your DS-414 up using syno_hibernate_debug_tool. Logon into your NAS using ssh and activate hibernation debug logs with the `syno_hibernate_debug_tool --enable 10` command, and after one day check `/var/log/messages`.

What I discovered using this technique:

*  QuickConnect and Dynamic DNS support DO AFFECT hibernation, as DSM needs to write down external IP addresses on disk periodically. So, you have to disable it;
*  Tasks scheduled via CRON also DO AFFECT hibernation. If you have cron scheduled jobs, sometimes you'll see some access to crontab on disk, that wake your DS up;
*  NTP auto-sync DO AFFECT hibernation. If you enable your DSM to synchronize its internal clock clock with external NTP servers, you can eventually see events on log that wakes up the disks;
*  Third-party packages that offer services, as Plex does, DO AFFECT hibernation. Some background processes fired up by third-party packages wakes up the disks periodically.

After disabling all these services, now my DS-1813 sleeps like a baby. However, it wakes up every time I turn on my Windows notebook, due to NETBIOS traffic issue. Well, my suggestion to you is to follow the tips on this fixed topic and try to determine the awake root cause. My experience about this subject is: there are no ready-to-do recipe, you have to diagnose it on your working environment. Synology can help on most difficult scenarios, too."

## Emergency

### Password

**How do I log in if I forgot the admin password?**

You can reset the admin password by pressing the RESET button on your Synology product for about 4 seconds until you hear a beeping sound. This will restore IP, DNS and passwords for the "admin" account to default value, and reset the "guest" account to the "disabled" status. The default password of the "admin" account is blank.

### Data recovery

In case the DS crahes and you are left alone with a set of disks.

* https://www.synology.com/en-us/knowledgebase/faq/579
