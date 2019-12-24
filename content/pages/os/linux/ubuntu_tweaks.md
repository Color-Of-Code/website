---
published: true
path: "/os/linux/ubuntu/tweaks"
date: "2018-12-24"
title: "Ubuntu Tweaks"
tags: ["os", "ubuntu", "tweaks", "linux"]
---

# Ubuntu Tweaks

## BtrFS snapshot settings

https://wiki.archlinux.org/index.php/snapper

* `snapperd` is managing the snapshots
* there are a couple of systemd services to trigger snapshots

Disable snapshot on boot:

```bash
systemctl disable snapper-boot.service
#systemctl enable snapper-boot.service # to undo that
```

Edit `/etc/snapper/configs/root` to reduce snapshot pressure on the system:

Comparison of pre/post

```bash
# start comparing pre- and post-snapshot in background after creating
# post-snapshot
BACKGROUND_COMPARISON="no"
```

This can be computationally very annoying on big filesystems if set to `yes`

Timeline based snapshots can be deactivated

```bash
# create hourly snapshots
TIMELINE_CREATE="no"
```

Of course you would have to perform these manually if wanted

```bash
# create a snapshot that will be cleaned up by the timeline algo according to the retention settings
snapper -c root create -c timeline
```

## Check updatedb settings

`/etc/updatedb.conf`

This should not include `.svn` folders, .git folders or btrfs snapshots

You can even completely remove the package if you do not make use of its features

```bash
apt remove mlocate
```

## Midnight Commander - Color scheme

Add this to the `~/.config/mc/ini` file:

```ini
[Colors]
base_color=lightgray,default:\
normal=lightgray,default:\
selected=black,green:\
marked=yellow,default:\
markselect=white,green:\
errors=white,red:\
menu=lightgray,default:\
reverse=black,lightgray:\
dnormal=white,default:\
dfocus=black,green:\
dhotnormal=brightgreen,default:\
dhotfocus=brightgreen,green:\
viewunderline=brightred,default:\
menuhot=yellow,default:\
menusel=white,black:\
menuhotsel=yellow,black:\
helpnormal=black,lightgray:\
helpitalic=red,lightgray:\
helpbold=blue,lightgray:\
helplink=black,cyan:\
helpslink=yellow,default:\
gauge=white,black:\
input=black,green:\
directory=white,default:\
executable=brightgreen,default:\
link=brightcyan,default:\
stalelink=brightred,default:\
device=brightmagenta,default:\
core=red,default:\
special=black,default:\
editnormal=lightgray,default:\
editbold=yellow,default:\
editmarked=black,cyan:\
errdhotnormal=yellow,red:\
errdhotfocus=yellow,lightgray
```

Do not put newlines between the color definitions! Write them as a single line! I only did it for readability.

```ini
[Colors]
base_color=lightgray,default:normal=lightgray,default:selected=black,green:marked=yellow,default:markselect=white,green:errors=white,red:menu=lightgray,default:reverse=black,lightgray:dnormal=white,default:dfocus=black,green:dhotnormal=brightgreen,default:dhotfocus=brightgreen,green:viewunderline=brightred,default:menuhot=yellow,default:menusel=white,black:menuhotsel=yellow,black:helpnormal=black,lightgray:helpitalic=red,lightgray:helpbold=blue,lightgray:helplink=black,cyan:helpslink=yellow,default:gauge=white,black:input=black,green:directory=white,default:executable=brightgreen,default:link=brightcyan,default:stalelink=brightred,default:device=brightmagenta,default:core=red,default:special=black,default:editnormal=lightgray,default:editbold=yellow,default:editmarked=black,cyan:errdhotnormal=yellow,red:errdhotfocus=yellow,lightgray
```

## Hide user from login screen

Reconfigure AccountsService. To hide a user named XXX, create a file named

```bash
	/var/lib/AccountsService/users/XXX
```

containing two lines:

```ini
[User]
SystemAccount=true
```

If the file already exists, make sure you append the `SystemAccount=true` line to the `[User]` section.

## Edit Gtk style

To add border to windows in Ubuntu 18.04:

```bash
gedit ~/.config/gtk-3.0/gtk.css
```

Then add the following:

```css
  decoration {
    border: 2px solid #333333;
    background: gray;
  }
```

After saving the file, remember refresh gnome using this command:

```bash
    setsid gnome-shell --replace
```

To customize the active title bar background colors. (use :backdrop for inactive windows)

```css
  .titlebar {
    background: #404040;
  }

  .titlebar:backdrop  {
    background: #000000;
    color:white;
  }
```

## CPU stalls on boot

```txt
INFO: rcu_sched self-detected stall on CPU
```

The culprit was, a setting in BIOS, AMD C1E Support was set to Enabled and setting it to Auto or Disabled fixed the issue for me! No more stalls/hangs!

## Disable IPv6

Edit `/etc/sysctl.conf` or create a new file inside `/etc/sysctl.d`, for example `/etc/sysctl.d/10-ipv6-disable.conf`

```conf
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

Run

```bash
sysctl -p
```

to refresh with the new configuration.

## Disable floppy drive

Removes the kernel driver for floppy drive detection

```bash
echo "blacklist floppy" | sudo tee /etc/modprobe.d/blacklist-floppy.conf
sudo rmmod floppy
sudo update-initramfs -u
```

## Preview jpegs and videos over USB

Smartphones are sometimes mounted as MTP (default for Sony XPERIA) and not Mass Storage. This impacts on preview.

Switch the phone into USB Mass Storage mode

## Oracle Java

```bash
    sudo add-apt-repository ppa:webupd8team/java
    sudo apt-get update
    sudo apt-get install oracle-java8-installer
```

## Firefox activate pipelining

```bash
about:config

network.http.pipelining -> true
network.http.pipelining.maxrequests -> 32
network.http.pipelining.ssl -> true
network.http.proxy.pipelining -> true
```

http://www.techfragments.com/481/the-12-best-firefox-aboutconfig-performance-tweaks/

## Reduce swappiness

https://wiki.ubuntuusers.de/Swap#Swapnutzung-einstellen

Ubuntu defaults to 60.

```bash
sudo sysctl vm.swappiness=25
```

## Find process from window

    xprop _NET_WM_PID | sed 's/_NET_WM_PID(CARDINAL) = //' | ps `cat`

This will make your cursor a cross with which you can click on an open window. It will report the PID and command in the terminal you ran it in.

In general, `xprop` and `xwininfo` will provide you with a lot of information about an open window.

## Preload

Not always recommended, might misbehave. I turned it off

```bash
sudo apt-get install preload
```

https://launchpad.net/ubuntu/wily/+package/preload

## Annoying Legitimate polkit

I attacked the /usr/share/polkit-1/actions/org.freedesktop.accounts.policy
file and tried different values for `<action id="org.freedesktop.accounts.change-own-user-data">`;

I set these values as shown:

```xml
<defaults>
  <allow_any>yes</allow_any>
  <allow_inactive>yes</allow_inactive>
  <allow_active>yes</allow_active>
</defaults>
```

Kill all polkit processes

```bash
sudo killall polkit-gnome-authentication-agent-1
```

## Nautilus: Disable CTRL+Scroll

* https://wiki.ubuntu.com/Keybindings

Nothing built in even dconf-editor seems to provide control about the mouse behaviour

```bash
apt-get install xbindkeys
xbindkeys --defaults > $HOME/.xbindkeysrc
```

Find key combinations:

```bash
xbindkeys -k
```

File: `~/.xbindkeysrc`

```conf
# disable ctrl + scroll wheel by binding it to /bin/true
"/bin/true"
  Control + b:5 + release

"/bin/true"
  Control + b:4 + release
```

```bash
killall xbindkeys && xbindkeys
```

((Source1: http://raymondmoul.com/disable-ctrl-scroll-zooming-ubuntu/))
((Source2: http://blog.hanschen.org/2009/10/13/mouse-shortcuts-with-xbindkeys/))

xbindkeys works somewhat but not reliably.

Finally I think the only way is to modify nautilus's source code:

`src/nautilus-view.c`

in function:

`nautilus_view_handle_scroll_event`

In order to download the source and re-build it, do this:

* Install all build-dependencies for nautilus: `sudo apt-get build-dep nautilus`

* Run `apt-get source nautilus` in a directory you want the source.

* `cd` into the nautilus- directory.

* Run `debuild -us -uc -i -I`. This creates an unsigned source, unsigned changes file and one or more binary packages. You'll find these one level of a folder lower.

* `dch -i` or `debchange -i`

* `debcommit` or `dpkg-source --commit`

* Install the package(s) using sudo dpkg -i /path/to/binary-package1.deb /path/to/binary-package2.deb [...].

* Make changes to the source, and rebuild/install as many times as you like.

You can apply this recipe to any Debian/Ubuntu package.

https://help.ubuntu.com/community/UpdatingADeb

## Setting up environment

http://packaging.ubuntu.com/html/fixing-a-bug.html

```bash
sudo apt-get install packaging-dev
```

## CD Rip Morituri

https://blog.mdosch.de/2015/03/25/empfehlung-cd-ripper-morituri/

## Thunar thumbnails

To restore proper thumbnail generation:

```bash
pkill tumblerd
```
