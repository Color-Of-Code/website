---
published: true
path: "/hardware/pc/linux"
date: "2020-09-01"
title: "Main PC"
tags: ["hardware", "pc", "linux"]
---

# main PC

## Requirements

* reduce noise (prio 1)
* reduce power (prio 2)
* optimized in processing videos
* code compilation

Thoughts

* Opted for an air cooled 3950X against a water cooled system because of some doubts regarding maintenance and possible issues...
* There are some air cooled threadripper rigs but honestly the balance between noise/power consumption/use is not ok for my purposes (oversized)
* The threadripper platform quad DDR4 was very tempting though for RAM performance... But in the end I favored modesty with dual DDR4 at a quite low CL, anyways I expect the Graphic Card to do or at least support most of the CPU intensive processing jobs.
* Unfortunately the support in the tools I use for video processing for OpenCL is not good, so probably I'll have to pick an nVidia card.

## Components

| Component  | Size(s) | Description |
| ----       | ----   |  ----        |
| Mainboard  | X570   | ASUS Prime X570-P |
| CPU        | 3950X  | AMD Ryzen™ 9 3950X boxed |
| CPU Cooler | NH-D15 | Noctua NH-D15 SE-AM4 |
| Case       | Define R6 | Fractal Design Define R6 USB-C Black Midi-Tower |
| PSU        | 750W  | 750W Seasonic Focus PX - 80 Plus Platinum |
| RAM        | 32GB  | 32GB GSkill Trident Z RGB DDR4 - 3200 (2x 16GB)  F4-3200C14D-32GTZR |
| Storage    | 1TB   | Samsung 970 EVO Plus - M.2 2280 M.2 (PCIe 3.0) SSD |
| Adapter    | USB-C | Delock 66432: Adapter for the internal USB-3.0 (19 pin header) to USB Key A |
| Graphic    | TBD   | unclear, at the moment an old PCIe 2.0 passive card is in use (later, RTX 2070S, RTX 2080?)  |

NOTES:

* I had to suffer to buy RGB memory because the shop I bought it only had that one on stock. The version without RGB is F4-3200C14D-32GTZ.
* There was not much benefit in taking PCIe 4.0 SSD, that M.2 module is really fast
* The adapter was needed to make the USB-C port work (no Key A connector on the mainboard) to connect the cable from case
* Another bunch of SATA disks will come into the system at a later time (from previous rig once tests are complete)

## Installation, known issues

* The cooler was modified to make both FANs work in pull mode (not enough place due to tall RAM)
* Initially with BIOS v1407, RAM was instable and POST unsuccessful
* Bios update (v2606) required to clear the RTC RAM (shortcut 2 pins on the mainboard) otherwise the system didn't POST at all
* With BIOS v2606, the RAM performs well at the XMP profile settings (14-14-14-34 timings)

## Software

Further installation is performed using bios 2606 and RAM running at 14-14-14-34@3200MHz (XMP)

* Ubuntu 20.04.1 LTS
* 500MB EFI / Rest Ext4 filesystem

NOTES:

* ZFS is still experimental on linux and repair tools availibility are low.
* LVM is not setup because I do not intend to make any changes to the main system storage.
* The FAN sensor values are not yet readable from the vanilla linux kernel + modules in 20.04.1 LTS (super IO chip not fully supported)
* CPU FAN + temperature is readable

## Tests

* CPU stress tests went ok
* RAM stess tests not performed yet
