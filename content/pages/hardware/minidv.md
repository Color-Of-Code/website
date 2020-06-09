---
published: true
path: "/hardware/minidv"
date: "2020-06-09"
title: "Mini DV Rescue"
tags: ["hardware", "minidv", "dv", "rescue", "linux"]
---

# Mini-DV Cassette

How to perform mini DV Grabbing with minimal and quantifiable quality loss.

Pitfall: The firewire interface used to perform grabbing is checking for transfer errors only, not content errors inside the grabbed data.

Therefore the videos you have on disk can still contain plenty of possible audio or video errors even if the grabbing did not report any problem.

This post is about a solution I used to rescue the data on mini DV cassettes, before hardware therefore is not available anymore in a manner that gives also information about the amount of problems left over in the grabbed data.

## Setup

Setup I used:

* CAMcorder SONY DCR HC23E
* A PC with a Firewire port
* Firewire cable
* Linux 18.04 LTS (Bionic)

## Software

### dvgrab

''dvgrab'' is the tool used to grab the firewire interface. It works pretty low level and has a raw mode.
The outcome is a `.dv` file containing DV video and 2 channel stereo sound. In my case only CH1 contains 2 streams of data. CH2 is empty.

```bash
dvgrab -autosplit -showstatus -timecode -timestamp -size 0 -rewind NAME-
```

NAME should be a meaningful prefix.

### DVAnalyzer

In order to create error reports about the quality of the data grabbed I found DV-Analyzer to be really very helpful.

<quote author="DVAnalyzer">
DV Analyzer provides a way to analyze and report audio, video, subcode, and structural errors within a DV file. This enables automated quality control and the ability to verify the accuracy and integrity of the reformatting process on a frame-by-frame basis.
</quote>

* https://mediaarea.net/DVAnalyzer

```bash
wget https://mediaarea.net/repo/deb/repo-mediaarea_1.0-13_all.deb && dpkg -i repo-mediaarea_1.0-13_all.deb && apt-get update
apt install dvanalyzer-gui # (for GUI)
apt install dvanalyzer # (for CLI)
```

In my case I had CH2 errors reported for every frame due to the missing information in the grabbed file. Although dvgrab had only one sound channel, it stored the resulting file with 2 channels, which is irritating for DVAnalyzer. As I did not want to alter the grabbing process (too risky) I patched the
DVAnalyzer in order to ignore the second channel.

```diff
diff --git a/Source/MediaInfo/Multiple/File_DvDif_Analysis.cpp b/Source/MediaInfo/Multiple/File_DvDif_Analysis.cpp
index 78596c1..fb3ee5c 100644
--- a/Source/MediaInfo/Multiple/File_DvDif_Analysis.cpp
+++ b/Source/MediaInfo/Multiple/File_DvDif_Analysis.cpp
@@ -1126,7 +1126,7 @@ void File_DvDif::Errors_Stats_Update()
             const size_t DseqSpan=QU_System?6:5;
             for (size_t ChannelGroup=0; ChannelGroup<ChannelGroup_Count; ChannelGroup++)
             {
-                for (size_t Channel=0; Channel<2; Channel++)
+                for (size_t Channel=0; Channel<1; Channel++)
                 {
                     size_t ChannelTotalPos=ChannelGroup*2+Channel;
                     size_t Audio_Errors_PerChannel=0;
```

That way I got only the meaningful errors reported in my setup.

**NOTE**: DO NOT use this patch if you actually have 2 channels in use. You can check that by loading the sound tracks into audacity for example and control the silenced tracks. 2 channels are 4 streams of audio data. CH1 left, CH1 right, CH2 left, CH2 right.

To automate the analysis process I used following bash file to generate one XML per DV file:

```bash
#!/bin/bash

for file in *.dv; do
    echo "Analyzing $file ..."
    f=${file::-3}
    dvanalyzer --XML --Header --Footer --Verbosity=9 "$f.dv" > "$f.xml"
done;
```

### DV Rescue

DV rescue contains a set of tools to assess the quality of DVs. The `dvplay` tool highlights the image parts that are not intact and thus
allows to see the broken parts of videos.

### DV Reconstruct

Work in progress. The idea is to compute from several grabs a better version by picking the best parts of each DV file.

<quote author="mediaarea.net">
If the retransfer contains improvements from the initial transfer, those can be integrated into a final transfer version. This isn’t simply taking the best frame from one transfer or another, but taking the best data block of a given frame of a transfer.
...
The “Reconstruct” feature will enable a restoration of the video that is currently not feasible with any tool. Since all DV videotape transferred in the future will inevitably contain glitches, error concealment, dropouts, and incoherencies, we think this feature is essential for ensuring that transferring DV is worthwhile, accurate and results in the highest quality possible.
</quote>

## References

* https://bergs.biz/blog/2017/01/26/capture-minidv-tapes-via-firewire/
* https://linux.die.net/man/1/dvgrab
* http://manpages.ubuntu.com/manpages/bionic/en/man1/dvgrab.1.html
* https://docs.google.com/presentation/d/1JFYHaKMZWHd8LFOVWmGuxdLNgFOiSXcoSxCMB-TXCvA/edit#slide=id.g7429c2bb59_0_107
