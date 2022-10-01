---
published: true
path: "/networking/dns"
date: "2022-09-30"
title: "Networking: DNS lookup"
tags: ["network", "linux", "dns", "lookup"]
---

## DNS

### APIs

There is no single API call to perform the lookup.

Options are:

* libc [getaddrinfo](http://man7.org/linux/man-pages/man3/getaddrinfo.3.html)
* libc [gethostbyname]() (OBSOLETE SPEC)
* libc resolver library (Low level DNS retrieval)
* direct interfacing to the dns servers via network calls

The applications that use libc will fall back to a DNS server on 127.0.0.1 and use nsswitch mechanisms. Also in that case caching service like `nscd` or `sssd` might be used.

Direct interfacing applications include the “host” utility, because “host” is actually one of the applications included with ISC BIND, and it is intended specifically to interface with DNS directly, and not the system NSS API. It also includes applications like Firefox which bypass NSS and implement their own DNS API for performance reasons. And it includes applications which need access to records other than A and AAAA records. Such applications will need to use the resolver library or their own DNS client library to access MX or TXT records.

### Configuration files

How to find out which executables care about which config file? Run the command through strace:

```bash
strace -f -e trace=openat <command>
```

#### /etc/hosts

Configuration for the `files` resolution method, listing up names to IP mappings.

#### /etc/nsswitch.conf

Allow applications to not have to hard-code which file or service they look these things up on.
The `hosts` line defines the order of lookup for DNS.

```conf
hosts:          files mdns4_minimal [NOTFOUND=return] dns
```

This allows to change the order and scope of lookup but does not work out only for applications
that care about nsswitch.

TODO:
* list of programs that care about this:

* ping

### /etc/resolv.conf

* `nameserver`: which DNS servers to look up the host for
* `search`: suffixes that get automatically appended if not found

TODO
* link help and options like `search`
* command line tools and how to perform settings for Ubuntu 22.04

* Restart networking: `systemctl restart networking`

### dnsmasq

The dnsmasq program is another level of indirection for `/etc/resolv.conf`.

`/etc/dnsmasq.conf`

* View contents of the cache: `kill -SIGUSR1 <(cat /run/dnsmasq/dnsmasq.pid)`

### docker

What is done in the docker context might seem irritating first but is well explained [here](https://zwischenzugs.com/2018/08/06/anatomy-of-a-linux-dns-lookup-part-iv/)

### Hints

* DNS can stop working if the DNS response is over 512 bytes and the DNS client request program doesn’t handle this correctly.

### References

* https://zwischenzugs.com/2018/06/08/anatomy-of-a-linux-dns-lookup-part-i/
* https://zwischenzugs.com/2018/06/18/anatomy-of-a-linux-dns-lookup-part-ii/
* https://zwischenzugs.com/2018/07/06/anatomy-of-a-linux-dns-lookup-part-iii/
* https://zwischenzugs.com/2018/08/06/anatomy-of-a-linux-dns-lookup-part-iv/
* https://zwischenzugs.com/2018/09/13/anatomy-of-a-linux-dns-lookup-part-v-two-debug-nightmares/
