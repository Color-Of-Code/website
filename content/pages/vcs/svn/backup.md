---
published: true
path: "/vcs/svn/backup"
date: "2018-12-28"
title: "Svn to Git"
tags: ["vcs", "svn", "backup", "TODO_cleanup"]
---

# Backing up subversion repositories

## Introduction

The **source** code is - as the name already tells - the real valuable data for software development. Therefore a proper backup of this important data is absolutely required.

Backups shall provide protection against hardware failures (Hard Disk crash, ...) but ideally also protect against erroneous software (defects in the version control software itself, DB corruption, ...). Usually problems appear slightly resulting in a corrupted DB. The danger of a slowly degrading system is that you might backup an already corrupted DB. So, if you are lucky you will have a full crash and a healthy backup. If your backup got already corrupted as well, on restoration, you will face the same problems as with the original DB.

This article will provide hints on possible backup solutions for subversion repositories to help choosing an appropriate one.

## Subversion

Subversion's repository structure is concentrated in one directory (conf, dav, db, hooks, locks). Each repository holds the bare source, in the db directory. The structure of this db directory varies slightly for subversion from version to version. The data is stored in form of delta files containing the so-called changesets (consistent set of changes across several files). In the versions I looked at, the properties are also stored in separate files. But the db directory also contains extra data, like specific scripts (hook scripts) or the repository configuration (in the conf directory). Beside this, transactional data (valid during a commit for example) is also stored there until the action can be made all at once (atomic commit feature from subversion). The nature of a version control system of being additive qualifies it well for incremental backup procedures.

### Backup

For backing up the repositories, you have following options (see the svn book for details regarding on how to perform them):

1. A naive approach using standard backup software (rsync, ...)
2. [svnadmin dump](http://svnbook.red-bean.com/nightly/en/svn.ref.svnadmin.c.dump.html)
3. [svnadmin hotcopy](http://svnbook.red-bean.com/nightly/en/svn.ref.svnadmin.c.hotcopy.html)
4. [svnsync](http://svnbook.red-bean.com/nightly/en/svn.ref.svnsync.html) (can be done remotely, without file access to the repository being sync'ed)
5. a [git svn](http://www.kernel.org/pub/software/scm/git/docs/git-svn.html) clone (possible but drawbacks/advantages to be analyzed, feel free to give me feedback)

The solutions differ in:

* (a) if the backup can be done online or if the server has to be stopped during the backup

* the amount of data they back-up (some solutions do not copy all the repository information)

* (b) allowing incremental backups or not. Hotcopy only allows full backups for example.

* (c) Can the hook scripts or the configuration files also be backed up with this method?

* (d) Can the backup be directly used as a read-only fallback solution for the original server. In the case of git-svn the backup can be cloned and used with a git client only.

* (e) restoration time, how quick you can go back to normal work. For transferring the git repository into an svn repository there is quite some work to perform: dump out the repository and load it into subversion. That makes the git-svn approach even slower than the dump solution regarding the time needed to restore the repository.

* (f) independence of the back-end tool or format. This is an advantage to deal with eventual defects in the tool itself. If the repository data is faulty then the data backed-up will also contain the defects. In the case of a text dump the resulting backup is independent from the binary format of a specific subversion version. But this has a cost: the time to restore is high.

* (g) remote: if the backup can be performed remotely (with no direct access to the filesystem holding the repositories). Actually from the presented methods only svnsync and git-svn allow this mode of operation.

|                             | **1) naive** | **2) dump**    | **3) hotcopy** | **4) sync** | **5) git-svn** | 
| --                           | ------------ | -----------    | -------------- | ----------- | -------------- | 
| **a) online**                | -            | yes            | yes            | yes         | yes            | 
| **b) incremental**           | yes          | yes            | -              | yes         | yes            | 
| **c1) hook files**           | yes          | -              | yes            | -           | -              | 
| **c2) config files**         | yes          | -              | yes            | -           | -              | 
| **d) backup RO**             | yes          | -              | yes            | yes*        | yes (git)      | 
| **e) restore time**          | File copy    | Restore (long) | File copy      | File copy*  | dump -> load   | 
| **f) back-end independence** | -            | yes            | -              | -           | yes            | 
| **g) remote**                | -            | -              | -              | yes         | yes            | 

* Take care of the [uuid of the repository](http://svnbook.red-bean.com/nightly/en/svn.reposadmin.maint.html#svn.reposadmin.maint.uuids) it can be changed manually to match the original one in the db directory. In case of mismatching uuids a relocate to the backup repository will not succeed.

**PITFALL**: Another pitfall is that in the case of svnsync and git-svn, the user performing the backup needs an account with full access to all paths to the source repository. Failing to do that will result into an incomplete backup.

### Restoration

The restoration of a backup is a procedure that is quite time consuming in the case of dump files. These have to be loaded with "svnadmin load". Rebuilding the repository can then take ages depending on the amount of data to restore. Until then you will not be able to work. The hotcopy can be re-used as it is, as well as the self made copy using a standard backup tool. You will need to copy back the files again. The sync solution will need adapting the uuid and replacing the hook files (which you will have to backup manually) but in principle it is also quite easy.

## Recommendation

Considering all these aspects I would recommend using `svnsync` to create a copy that can be updated incrementally at any time. Take care of copying the hook scripts and config files separately as well as the uuid. (To operate `svnsync` you will need to allow the `pre-revprop-change` hook temporarily)

I recommend against the hotcopy unless you have small repositories. In the case of several GB of data, the inability of hotcopy to operate incrementally is a KO criteria (scales badly with the repository size).

Beside this, a regular textual dump with `svnadmin dump` of the repositories is advised for dealing with the scenario where the normal backup is unusable. This is maybe quite paranoid, but it's there as a fallback in this worst case scenario.
