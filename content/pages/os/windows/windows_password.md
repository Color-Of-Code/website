---
published: true
path: "/os/windows/password"
date: "2020-04-20"
title: "Windows Tweaks"
tags: ["os", "windows", "password", "domain"]
---

## Password in domain

### Password expiration info

```
NET USER <user> /Domain
```

### Renew password

With NET USER

```
NET USER <user> <newpass> /Domain
```

Using powershell
https://docs.microsoft.com/en-us/powershell/module/addsadministration/set-adaccountpassword?view=win10-ps

```
PS C:\> Set-ADAccountPassword -Identity <user>
```

### Fix trust relationship

Requires a domain admin account

https://superuser.com/questions/947750/how-can-i-get-the-trust-relationship-to-the-domain-to-stop-failing/1102930
