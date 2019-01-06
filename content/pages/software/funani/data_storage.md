---
published: true
path: "/funani/data-storage"
date: "2019-01-01"
title: "Funani: Data Storage"
tags: ["funani", "data", "storage", "TODO_cleanup"]
---
# Data storage

##  Rationale 

Data is stored on disk, Metadata is stored in a database. How the data in the database is structured is defined in another blueprint: [metadata storage](metadata storage). The metadata in the database also contains a link back to the data. The data is usually huge and shall not be stored inside the database. This also ensures a better performance and easier backup solutions.

##  Tasks 

The data storage module's jobs are:

* store data inside a store and return an unique handle on it
* load data from the store from a handle
* enumerate the store contents (for backup or verification)
* ensure no duplicate file is in the store
* keep the files as they are, without any change to them

## Ideas

The handle on the files can be implemented as the SHA1 sum of the file. That way if a new file is uploaded and a file with the same SHA1 sum already exists, the file is a duplicate. Another benefit is that the data consistency can be checked by verifying the hash values. For a quick retrieval, the file name and directory can also be implemented from the SHA1 code.

The real names of the files are stored in the database.

SHA1 in python:

```python
import hashlib

BLOCKSIZE = 65536
hasher = hashlib.sha1()
with open(file_path, 'rb') as afile:
	buf = afile.read(BLOCKSIZE)
	while len(buf) > 0:
		hasher.update(buf)
		buf = afile.read(BLOCKSIZE)
print(hasher.hexdigest())
```

## Open Source ideas

* Content Addressable Storage [CAS](wp>Content-addressable_storage)
* XAM Initiative: http://www.snia.org/forums/xam

### Filesystems

* ZFS filesystem [ZFS and ECC](http://jrs-s.net/2015/02/03/will-zfs-and-non-ecc-ram-kill-your-data), [ZFS linux support](http://zfsonlinux.org/faq.html)
* Use raw disk access in case of virtualization [See one of the answers](http://superuser.com/questions/289189/access-a-zfs-volume-in-windows)
* Distributed Filesystem: [ceph](https///en.wikipedia.org/wiki/Ceph_(software))
* [Open Archive](http://www.openarchive.net/product)

### Libraries

* Cassette under APL v2 [Casette](https///github.com/drewnoakes/cassette) (C#)
* Keep inside Arvados under AGPL v2 [Keep](https///github.com/curoverse/arvados) (Go)
* Vault under Public Domain [Vault](https///github.com/greglook/vault) (Clojure)
* Camlistore under APL v2 [Camlistore](https///camlistore.org/docs/overview) (Go)
* IPFS under MIT [IPFS](https///github.com/ipfs/go-ipfs) (Go)
