---
published: true
path: "/os/windows/tweaks"
date: "2019-01-10"
title: "Windows Tweaks"
tags: ["os", "windows", "tweaks"]
---

# Windows tips and tricks

## Windows 7 "god mode"

This allows to see all system settings in one window. Create a folder named

```
All Settings.{ED7BA470-8E54-465E-825C-99712043E01C}
```

You can use anything in place of All Settings, the most important the point and what comes after the point.

## Energy options

http://www.sevenforums.com/tutorials/197908-power-plan-specify-default-all-users.html

Find out the GUIDs of power plans:

```bash
    powercfg /list
```

In the local Local Group Policy Editor, Administrative templates, System, Power management, Select an active power plan

```bash
    gpedit.msc
```

Not configured: users can select their own
Set: globally set for the machine
