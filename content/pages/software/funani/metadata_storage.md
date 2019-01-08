---
published: false
path: "/funani/metadata-storage"
date: "2019-01-01"
title: "Funani: Metadata Storage"
tags: ["funani", "metadata", "storage", "TODO_cleanup"]
---
# Metadata storage

##  Rationale 

Metadata records all information about the files stored into the system and their relations. This document works out what tables and table contents are needed by the system. [User management](user_management) tables are defined here.

##  Tables 

; Data Description
> Contains details about one file in the [data storage](data_storage) area. This table holds the handle of the file, its size, its type, the user that owns it, ...

The metadata table contains:


*  an id for the content

*  an SHA1 sum of the content file

*  the MIME-Type of the data

*  the size of the file

*  the user that owns the file (user id)

##  Extensions 

This shall be realized as modules:
; Data history
> Contains version information about the files. Some document scans for example are reworked and made better. The newest file in the history is the most up-to-date and has a special state. 
; Groups
> Groups of files can be defined as well as groups of groups
; Tags
> Many to many relation for tags to files. Tags are also defined in a hierarchical way.


## 3rd party software

store big binaries outside git


*  git-annex: [https://git-annex.branchable.com/](https://git-annex.branchable.com/) [http://doc.gitlab.com/ee/workflow/git_annex.html](http://doc.gitlab.com/ee/workflow/git_annex.html) [GitMinutes #16: Joey Hess on git-annex](https://www.youtube.com/watch?v=ubRtA9dnolM)

*  git-media: [https://github.com/alebedev/git-media](https://github.com/alebedev/git-media)

*  bup [http://git-annex.branchable.com/special_remotes/bup/](http://git-annex.branchable.com/special_remotes/bup/) (makes also optionaly use of PAR2 sums for correction)

*  [Metadata in media, German](https://wiki.ubuntuusers.de/Metadaten)

See [:git_annex;start](/git_annex;start) page for details
