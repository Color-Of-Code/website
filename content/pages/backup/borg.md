---
published: true
path: "/backup/borg"
date: "2021-05-27"
title: "Backup with Borg"
tags: ["backup", "borg", "incremental", "client", "server"]
---

# Borg

## Introduction

Borg is a client server system allowing to backup remotely to repositories

### Risk analysis

Scenario: Backup server compromised

- Confidentiality of all client data in danger if no encryption is used. Client encryption
  is a must, could even be at repository level if the client shares different backup users
  with different kinds of data to backup.
- Integrity compromised at repository level, the structure of the backup data could be
  partly or completely damaged (mitigate by monitoring and report suspicious changes to the
  system).
- Availability (not much to do about that then), a second level backup is necessary

Scenario: Backup client compromised

- Confidentiality is compromised for the data on the client system and accessible by the client on the remote
  backup server. That means clients should be segregated into separate repositories to avoid a compromised
  client to be able to sneak/peek in another client's data.
- Integrity: compromised the client could add or delete data from the backup server it has access to and
  can be mitigated by setting an `append-only` mode. But BEWARE with borg a pruning takes place automatically
  the first time a client wihout `append-only` accesses the repository.
- Availability: mitigate by preparing a redundant system

### Recovery / Access

Using `borg mount` to remotely mount snapshots to select data to be restored

## Installation

### Server

Install software

```bash
sudo apt install borgbackup
```

Create `borg` user

```bash
sudo useradd -m borg
sudo passwd borg
```

Make directories for each of the clients

```bash
sudo mkdir -p /srv/borg/client1
# ...
sudo mkdir -p /srv/borg/clientN

# set permissions
sudo chown -R borg:borg /srv/borg
```

### Client

```bash
sudo apt install borgbackup
```

Create a key pair (without password)

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_borg
# private key: ~/.ssh/id_borg.
# public key: ~/.ssh/id_borg.pub.
```

copy the SSH public key to the borg server

```bash
ssh-copy-id -i ~/.ssh/id_borg borg@<server>
```

### Configure server SSH access restrictions

Login as user `borg` on the server

```bash
# edit the authorized_keys file to restrict each client
vi ~/.ssh/authorized_keys

# each of the client should follow this format:
# command="cd /srv/borg/<client>; borg serve --append-only --restrict-to-path /srv/borg/<client>"

# for example, here is the entry for client1
# command="cd /srv/borg/client1; borg serve --append-only --restrict-to-path /srv/borg/client1" ssh-ecdsa  root@<server>
```

### Configure client for initial backup

Common variables:

```bash
export BORG_RSH="ssh -i ~/.ssh/id_borg"
export BORG_REPO=borg@<server>:<repos>
```

Initialize repository:

```bash
borg init --encryption=keyfile --append-only $BORG_REPOS
borg key export $BORG_REPOS ~/borg-server-backup.key # Store this and passphrase into KeePass
```

The key can be found here: `~/.config/borg/keys`

Backup example daily:

```bash
# with heuristic compression, uses lzma if data compresses well
borg create \
  --verbose --filter AME \
  --list --stats --show-rc \
  --compression auto,lzma --exclude-caches \
  $BORG_REPOS::'daily-{utcnow:%Y\-%m\-%d_%H:%M:%S}' \
  /path1 \
  /pathN
```

```bash
# no compression for data formats where it is clear that compression
# will not be that useful (like backup of bare git repositories)
borg create \
  --verbose --filter AME \
  --list --stats --show-rc \
  --compression none --exclude-caches \
  $BORG_REPOS::'daily-{utcnow:%Y\-%m\-%d_%H:%M:%S}' \
  /path1 \
  /pathN
```

## Pitfalls

- repositories not created with the `append-only` option are not append only
- the `append-only` restriction only applies to the client connecting using that key.
- any other client not having the restriction with automatically start pruning (!!BE CAREFUL!!)
  - [Documentation](https://github.com/borgbackup/borg/blob/master/docs/usage/notes.rst#append-only-mode-forbid-compaction)
  - See [append-only mode is confusing #3504](https://github.com/borgbackup/borg/issues/3504)
  - See [audit an append-only mode repo to make sure the client was well behaved #2251](https://github.com/borgbackup/borg/issues/2251)
- compression can be specified and is applied on the chunks but does not apply to existing chunks, these need to be forcibly retransferred with another compression method applied if absolutely wanted.

## Recover data

`borg mount` can be used to mount the data provided you have the key and passphrase and ssh access
to the server holding the encrypted data.
