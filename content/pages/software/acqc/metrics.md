---
published: true
path: "/software/acqc/metrics"
date: "2019-01-07"
title: "ACQC.Metrics"
tags: ["software", "foss", "acqc", "metrics", "TODO_cleanup"]
---

# Advanced Code Quality Center

## ACQC-Metrics

[License Agreement](legal/license).

**Quantify the quality of your code and develop higher quality code!\\ **

ACQC Metrics computes typical **source code file and function metrics**. What are metrics good for? Well, it **measures the software** in terms of complexity for example. Very long or complex functions can be identified in order to break them down in smaller pieces (for better **maintainability**). Maybe you are also just interested in knowing how big the software currently is. Then ACQC metrics is also good for you.

===== Main features =====

* Computation of function and file metrics for C and C++ (see details below)
* Display of a nice Kiviat diagram for the selected functions
* Opening the source file (displaying the associated source) on double click

**Screenshot: analysis of liboil (left), display of kiviat diagram (right) and open Notepad++ (bottom)**

{{:product:acqc_metrics:acqc_metrics.png|ACQC metrics}}

**Simply drop source files on the window and it'll compute metrics for you.**

## Supported metrics

> **LINES**: the number of **physical lines** in your file **LLOC**: the logical **lines of code** (without comments, without spaces) **LLOCi**: the logical **lines of comments** (lines caontaining only comments) **LLOW**: the logical **whitespace lines** (lines without any other content than whitespace characters) **PROCS**: the number of **procedures/functions** inside the file **CARGS**: the total **number of arguments** used by the function or functions in the file **CC**: the **cyclomatic complexity** known also under McCabe complexity, represents the number of decisions taken by the code **DC**: the **"depth" complexity**. If you imbricate a lot (if's inside if's or while's inside switches for example) this will get high. 

> You can also use it to track down some [[patterns:anti-patterns|Software Anti-Patterns]], for example: Spaghetti code: High LINES and CC Loop-switch sequence: Big difference between DC and CC (high imbrication) 

===== Setup and usage =====

ACQC Metrics is easy to use, download, unpack and run it (Make sure the prerequisities are installed like .NET 3.5).

Drag and drop the files you want it to analyze on its window. Unwanted files can be selected and deleted from the report. Ctrl+C will copy the contents of the list to the clipboard and can be pasted into another program (Excel for example).

Alternatively since version 1.0.2 it is possible to run it as a command line tool to generate an XML file containing the metrics for a given source file. This enables the integration of ACQC Metrics in other tools. Since version 1.0.7 there is a separate ACQC-Metrics.com executable for the command line version, that enables to keep the GUI free from the annoying console window under certain Operating Systems (like Windows 7).

Analysis of a single file using the command line:

```
acqc-metrics -o results.xml fullpath\file_to_analyze.cpp
```

Recursive analysis of all files under a given directory:

```
acqc-metrics -o results.xml path\to\base\directory
```

Selective recursive analysis of files matching a pattern under a given directory:

```
acqc-metrics -o results.xml directory\*.c
```

## Feedback

Metrics are computed for C and C++ files. Support for other languages will be added in the future (Java and C# are ongoing)

**Remember that ACQC.Metrics is work in progress, contact me if you need a feature, I'll do my best to implement it quickly.\\ **

Give it a try and send your comments tofeedback to [[jaap.dehaan@color-of-code.de|jaap.dehaan@color-of-code.de]]

===== Available versions: =====

* {{:product:acqc_metrics:acqc_metrics-1.0.7.zip|ACQC_Metrics-1.0.7.zip}} [154KB, 2013-08-14], Fixed crash on closing Kiviat window using the upright cross and trying to show it again.
* ACQC-Metrics-1.0.6.zip [78KB, 2012-12-01], Kiviat diagram, editor support, added recursive directory parsing and basic wildcard support.
* ACQC-Metrics-1.0.4.zip [77KB, 2011-02-06(first release)-**2011-04-04(hotfix)**], Kiviat diagram, editor support, fixed handling of read-only files.
* ACQC-Metrics-1.0.3.zip [63KB, 2010-12-19], better command line support
* ACQC-Metrics-1.0.2.zip [61KB, 2009-09-27], sortable columns, function/file metrics can be hidden
* ACQC-Metrics-1.0.1.zip [60KB, 2009-08-29], now displays also function metrics
* ACQC-Metrics-1.0.0.zip [59KB, 2009-08-27]

===== Prerequisities: =====

* Windows XP, Vista, 7 or later
* Microsoft .NET Framework 3.5 [http://www.microsoft.com/downloads/details.aspx?...](http://www.microsoft.com/downloads/details.aspx?FamilyId=333325FD-AE52-4E35-B531-508D977D32A6&amp;displaylang=en)
