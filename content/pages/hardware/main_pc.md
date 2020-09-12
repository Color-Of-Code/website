---
published: true
path: "/hardware/pc/linux"
date: "2020-09-01"
title: "PC Build 2020"
tags: ["hardware", "pc", "linux"]
---

# PC Build 2020

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
| Motherboard  | X570   | ASUS Prime X570-P |
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
* The adapter was needed to make the USB-C port work (no Key A connector on the motherboard) to connect the cable from case
* Another bunch of SATA disks will come into the system at a later time (from previous rig once tests are complete)

## Installation, known issues

* The cooler was modified to make both FANs work in pull mode (not enough place due to tall RAM)
* Initially with BIOS v1407, RAM was instable and POST unsuccessful
* Bios update (v2606) required to clear the RTC RAM (shortcut 2 pins on the motherboard) otherwise the system didn't POST at all
* With BIOS v2606, the RAM performs well at the XMP profile settings (14-14-14-34- timings, 1.35v)
* There are still sporadic POST issues ([Hint 1](https://www.reddit.com/r/ASUS/comments/et9q38/prime_x570_pro_wont_post_but_only_randomly/), [Hint2](https://rog.asus.com/forum/showthread.php?117380-Intermittent-No-Display-and-No-POST-on-ASUS-X570-P/page1), [Hint 3](https://www.overclockers.com/forums/showthread.php/795714-Not-sure-if-its-Asus-DOCP-or-my-ram-with-reboot-halting))
* Disabled FAST boot (seems to help POST RAM checks to pass)

## Software

Further installation is performed using bios 2606 and RAM running at 14-14-14-34@3200MHz (XMP)

* Ubuntu 20.04.1 LTS
* 500MB EFI / Rest Ext4 filesystem

NOTES:

* ZFS is still experimental on linux and repair tools availibility are low.
* LVM is not setup because I do not intend to make any changes to the main system storage.
* The FAN sensor values are not yet readable from the vanilla linux kernel + modules in 20.04.1 LTS (super IO chip [NCT6798D](https://github.com/lm-sensors/lm-sensors/issues/197) not fully supported)
* CPU FAN + temperature is readable

The problems with the sensors are related to the hwmon driver [nct6775](https://github.com/lm-sensors/lm-sensors/issues/220).

```
nct6775: Found NCT6798D or compatible chip at 0x2e:0x290
ACPI Warning: SystemIO range 0x0000000000000295-0x0000000000000296 conflicts with OpRegion 0x0000000000000290-0x0000000000000299 (\AMW0.SHWM) (20190509/utaddress-204)
ACPI: If an ACPI driver is available for this device, you should use it instead of the native driver
```

A [workaround](https://bugzilla.kernel.org/show_bug.cgi?id=204807) could be using the boot parameter `acpi_enforce_resources=lax` (but it's risky).
Added output of my `acpidump -b` to that ticket.

## Tests

Basic tests to ensure correct cooling, CPU operation and DRAM stability

* CPU stress tests went ok
* RAM tests performed with DRAM voltage at 1.35v (1 pass PassMark free OK) but there are POST issues
* RAM tests performed with DRAM voltage at 1.34v (1 pass PassMark free OK + 4 Passes in a row OK)
* Running PC with Fast Boot disabled and DRAM voltage at 1.35v

## Benchmarks

Results: [OpenBenchmarking.org](https://openbenchmarking.org/)

* [pts: Phoronix Test Suite](https://en.wikipedia.org/wiki/Phoronix_Test_Suite)
* [Linpack Extreme](https://www.ngohq.com/linpack-xtreme.html)
* [TFM Tyler's Frame Machine](https://github.com/Tylemagne/TFM)
* [Unigine](https://benchmark.unigine.com/)  (part of pts)
* [Hyperfine](https://github.com/sharkdp/hyperfine)
* [IOZone](http://www.iozone.org/)
* [Bonnie++](https://doc.coker.com.au/projects/bonnie/)
* sysbench (part of pts)
* fio (part of pts)
* netperf
* hardinfo
* LLCbench

## Linpack extreme

Tests mainly CPU/Memory/Cooling stability.

Processor: AMD Ryzen 9 3950X 16-Core @ 3.50GHz (16 Cores / 32 Threads), Motherboard: ASUS PRIME X570-P (2606 BIOS), Chipset: AMD Starship/Matisse, Memory: 2 x 16384 MB DDR4-3200MT/s F4-3200C14-16GTZR, Disk: 1000GB Samsung SSD 970 EVO Plus 1TB, Graphics: MSI NVIDIA NVA8 1GB, Audio: NVIDIA HD Audio, Monitor: TOSHIBA-TV, Network: Realtek RTL8111/8168/8411

OS: Ubuntu 20.04, Kernel: 5.4.0-47-generic (x86_64), Desktop: GNOME Shell 3.36.4, Display Server: X Server 1.20.8, Display Driver: modesetting 1.20.8, OpenGL: 3.3 Mesa 20.0.8, Compiler: GCC 9.3.0, File-System: ext4, Screen Resolution: 1920x1080

Benchmark:

```
Current date/time: Fri Sep 11 17:42:33 2020

CPU frequency:    4.365 GHz
Number of CPUs: 1
Number of cores: 16
Number of threads: 16

Parameters are set to:

Number of tests: 1
Number of equations to solve (problem size) : 20000
Leading dimension of array                  : 20000
Number of trials to run                     : 1
Data alignment value (in Kbytes)            : 4

Maximum memory requested that can be used=3200404096, at the size=20000

=================== Timing linear equation system solver ===================

Size   LDA    Align. Time(s)    GFlops   Residual     Residual(norm) Check
20000  20000  4      14.714     362.5091 2.588746e-10 2.291607e-02   pass

Performance Summary (GFlops)

Size   LDA    Align.  Average  Maximal
20000  20000  4       362.5091 362.5091

Residual checks PASSED
```

Stress test:

```
Linpack Xtreme v1.1.3 by Regeneration

Current date/time: Fri Sep 11 17:44:33 2020

CPU frequency:    4.315 GHz
Number of CPUs: 1
Number of cores: 16
Number of threads: 32

Parameters are set to:

Number of tests: 1
Number of equations to solve (problem size) : 22611
Leading dimension of array                  : 22611
Number of trials to run                     : 20
Data alignment value (in Kbytes)            : 4

Maximum memory requested that can be used=4090514884, at the size=22611

=================== Timing linear equation system solver ===================

Size   LDA    Align. Time(s)    GFlops   Residual     Residual(norm) Check
22611  22611  4      60.533     127.3300 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.983     128.4979 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.095     128.2595 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.940     128.5910 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.365     127.6842 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.800     128.8918 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.109     128.2299 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.867     128.7473 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.998     128.4654 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.988     128.4871 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.838     128.8094 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.998     128.4664 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.005     128.4515 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.009     128.4432 3.636039e-10 2.527392e-02   pass
22611  22611  4      59.780     128.9350 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.304     127.8149 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.361     127.6928 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.219     127.9941 3.636039e-10 2.527392e-02   pass
22611  22611  4      61.212     125.9193 3.636039e-10 2.527392e-02   pass
22611  22611  4      60.350     127.7167 3.636039e-10 2.527392e-02   pass

Performance Summary (GFlops)

Size   LDA    Align.  Average  Maximal
22611  22611  4       128.1714 128.9350

Residual checks PASSED
```
