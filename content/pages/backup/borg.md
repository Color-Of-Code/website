---
published: true
path: "/backup/borg"
date: "2021-05-26"
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

```bash
sudo apt install borgbackup
```

### Client

```bash
sudo apt install borgbackup
```
