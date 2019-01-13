---
published: true
path: "/size_reporter/start"
date: "2019-01-09"
title: "Size Reporter"
tags: ["software", "product", "size", "reporter", "TODO_cleanup"]
---

# SizeReporter

[License Agreement](legal/license).

## Introduction

SizeReporter generates a **CSV/TSV/XML report** of the disk usage:

* CSV: Comma separated values (";")
* TSV: Tab separated values
* XML: XML format

It runs from the console and can be triggered by scheduled jobs or be run by scripts. It does not make any GUI call (no pop-ups, no dialogs) so it can also be run safely by services or continuous integration systems (CI) like CruiseControl for example.

The CSV file can be read by **MS excel** directly or imported into Open office calc for example to process the results and create reports or diagrams.

## Usage

The executable only has two parameters: the directory to parse (may be a network path) and the depth of reporting.

{{:product:size_reporter:size_reporter.png|Screenshot SizeReporter}}

During a run, the tool displays the current state in the console and reports the current directory being parsed as well as intermediate results.\\ \\ After running, the tool generates at least two files:

* sizereport_errors_20100414-193146.log
* sizereport_result_20100414-193146.csv or .xml

Example of output:

```
Depth    Files    Dirs    Virtual   Size on   Last modification     Relative Path
                          size (MB) disk (MB)   
3        9        0       1,091     1,113    2005-05-17 21:27:01    .\$hf_mig$\KB898461\update
2        12       1       1,326     1,355    2005-05-17 21:27:01    .\$hf_mig$\KB898461
```

It currently reports following items:

* **level**: the directory level from the root of parsing (level 0 is the directory that was given as a parameter on the command line)
* **file count**: The number of files in the directory and all sub-directories
* **directory count**: The number of directories and sub-directories inside the directory excluding the directory itself)
* **virtual size (MB)**: the sum of the size of each file in the sub-tree
* **size on disk (MB)**: the sum of bytes occupied on disk. Due to cluster rounding and eventual file compression, this often differs from the virtual size.
* **last modification date**: the date of the last modification in the sub-tree
* **path**: the path of the sub-tree, relatively to the path given as an argument

## Help

There is an integrated help that is displayed on the command line by typing:

```
SizeReporter --help
```

The options get listed. The main options are

```
--culture           specify the culture to use for floats e.g. "en-US"
--empty             also report all empty files in an extra report
--tsv               create a Tab Separated Values file instead of a CSV
--xml               generate an XML report
--quiet             do not display anything on the console
--follow-junctions  also follow and report space consumed in a junction
```

The "culture" is interesting if you have a computer in a different locale to generate the report and to process the results. For example you generate the reports on a German machine and want to process the results on a machine with English locale. Then specify "en-US" to generate the report to get the floating point numbers right. You can also import the files into Calc or Excel and specify the format but that is more work than double clicking on the CSV...

## Release Notes

* 2011-02-22, Version 1.1.0: Added options to specify name of generated files
* 2010-06-11, Version 1.0.4: Added --xml and --empty flags
* 2010-04-26, Version 1.0.3: Fixed the --version and --help flags
* 2010-04-19, Version 1.0.2: Added option to set culture, tsv option and start/end time and duration report
* 2010-04-16, Version 1.0.1: Fixed directory modification time reporting, added option to include junction parsing
* 2010-04-14, Version 1.0.0: First official release after heavy testing.

## Special remarks

### Bad timestamps

Sometimes the dates of last modification can lay in the future. In this case, SizeReporter ignores anything that lies more than one day in the future. This can happen for plenty of different reasons that have nothing to do with the tool itself, like bad SSH clients used to upload data on a data storage area...

### Path handling

The tool can deal with extremely long paths, special characters inside paths and so on... The robustness of the tool is one of the strongest features.

### Junction handling

At the time of writing, junctions are skipped as we are interested in the physical disk space consumed by the local directory tree only. However if you want to also report the space consumed by files from the junction, then use "--follow-junctions" on the command line. With the "--list-junctions" option you can let the tool provide you with a complete list of junctions.

Example: Generate a report of all junctions on C: to "junctions.csv"

```
SizeReporter.exe --list-junctions --junctions-file "junctions.csv" "C:" 1
```

## Installation

The tool does not come with an installer, just download the zip and unpack it where you like and tun the executable.\\ 

* Download {{:product:size_reporter:size_reporter-1.1.0.zip|Size_Reporter-1.1.0.zip}} [21KB, 2011-02-22] and unpack it
* Make sure you have the prerequisities installed (see below)
* Run SizeReporter.exe from the command line

## Prerequisities

* Windows XP, Vista, 7 or later
* Microsoft .NET Framework [http://www.microsoft.com/downloads/details.aspx?...](http://www.microsoft.com/downloads/details.aspx?FamilyId=333325FD-AE52-4E35-B531-508D977D32A6&amp;displaylang=en)
