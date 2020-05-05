---
published: true
path: "/hardware/nas/linux"
date: "2020-05-05"
title: "NAS"
tags: ["hardware", "nas", "linux"]
---

# DIY NAS

## Requirements

* support 8 SATA disks
* support [ECC](https://en.wikipedia.org/wiki/Error_detection_and_correction)
* reduce noise (prio 1)
* reduce power (prio 2)

## Components

| Component | Price | Size(s) | Description |
| ----      | ----  | ---- | ----        |
| Mainboard | ~300€ | [uATX](https://en.wikipedia.org/wiki/MicroATX) | SUPERMICRO X10SRM-F Server Motherboard R3 (LGA 2011) Intel C612 |
| Mainboard | ~400€ | ATX | Supermicro Motherboard H11SSL-i |
| Chassis   | ~110€ | ATX, uATX, Mini ITX | Fractal design Define R5 |
| Chassis   |       |  | Silverstone DS 380 |
| Chassis   | ~200€ | [Mini ITX](https://en.wikipedia.org/wiki/Mini-ITX)  | [U-NAS NSC 800](http://www.u-nas.com/xcart/product.php?productid=17617) |
| PSU      | ~100€  | 450W | Corsair SF450 PSU 80+ Platinum |
| PSU      | ~100€  | 550W | be quiet! Straight Power 11 Platinum |
| RAM      | ~80€   | 16GB  | DDR4 2133 ECC |
| RAM      | ~110€  | 16GB  | DDR4 2400 ECC |
| RAM      | ~36€   | 16GB  | DDR3 1333 ECC |
| RAM      | ~26€   | 8GB  | DDR3 1333 ECC |

If mainboard is not capable of handling so many SATA connections use a HBA via PCI. LSI Chips are well supported

## Cables

* SFF-8087
* Molex > SATA (Y Cable)
* 90° SATA
* Anti-vibration
* Additional GBit Router
* 1TB SSD (~100€)

## References

* [PC Part Picker](https://pcpartpicker.com/)
* [Mainboards](https://www.supermicro.com/en/products/motherboards/server-boards)
* [STH Guides](https://www.servethehome.com/buyers-guides/)
* [Econonas-2019](https://blog.briancmoses.com/2019/11/diy-nas-econonas-2019.html)
* [Pat's NAS Building Tips and Rules of Thumb](https://butterwhat.com/2019/12/17/pats-nas-building-tips-and-rules-of-thumb.html)
* [RDIMM vs. UDIMM](https://mcl.de/blog/rdimm-vs.-udimm-die-arbeitsspeicher-technologien-im-vergleich)

## Software

* Ubuntu Server
* [ZFS Raidz2](https://en.wikipedia.org/wiki/ZFS)
* LFS / RAID 6 ?

## Installation

* Using IPMI
* Automatic installer via USB
