---
published: true
path: "/backup/solutions"
date: "2020-04-30"
title: "Backup solutions"
tags: ["backup", "incremental", "client", "server"]
---

# Backup solutions

## Must haves

- [chunk based deduplication](https://wiki.archlinux.org/index.php/Synchronization_and_backup_programs#Chunk-based_increments)) (not only file based)
- client / server (transfer to remote backup server)
- web viewer
- consistency check
- easy restoration (ro mountable)
- scriptable and customizable
- runs on Windows & Linux

## Nice to have

- optional encryption
- purge options

## Candidates

- [borg](https://www.borgbackup.org/) ([repos](https://github.com/borgbackup/borg))
- [bup](https://bup.github.io/) ([repos](https://github.com/bup/bup/blob/master/cmd/save-cmd.py))
- [duplicati](https://www.duplicati.com/) ([repos](https://github.com/duplicati/duplicati))
- [restic](https://restic.net/) ([repos](https://github.com/restic/restic))
