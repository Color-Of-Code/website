---
published: true
path: "/misc/cd-paranoia-icons"
date: "2020-03-13"
title: "CD Paranoia"
tags: ["cd paranoia", "progress", "info", "smiley"]
---

## CD Paranoia

### Bargraph

Used to indicate things during read. The letters are hierarchical; for example if a transport error occurs in the same sector as jitter, the bargraph will print `e` instead of `-`.

| Character | Meaning |
| --- | --- |
| `-` | Two blocks overlapped properly, but they were skewed (frame jitter). This case is completely corrected by Paranoia and is not a cause for concern. |
| `+` | Not only frame jitter, but an unreported, uncorrected loss of streaming in the middle of an atomic read operation. That is, the drive lost its place while reading data, and restarted in some random incorrect location without alerting the kernel. This case is also corrected by Paranoia. |
| `e` | A transport level SCSI or ATAPI error was caught and corrected. Paranoia will completely repair such an error without audible defects. |
| `X` | A scratch was caught and corrected. Cdparanoia wil interpolate over any missing/corrupt samples. |
| `*` | A scratch and jitter both occurred in this general area of the read. Cdparanoia wil interpolate over any missing/corrupt samples. |
| `!` | A read error got through the stage one of error correction and was caught by stage two. Many `!` are a cause for concern; it means that the drive is making continuous silent errors that look identical on each re-read, a condition that can't always be detected. Although the presence of a `!` means the error was corrected, it also means that similar errors are probably passing by unnoticed. Upcoming releases of cdparanoia will address this issue. |
| `V` | A skip that could not be repaired or a sector totally obliterated on the medium (hard read error). A `V` marker generally results in some audible defect in the sample. |

### Smilie

Different faces depending on the current errors it's correcting.

| Smilie | Meaning |
| --- | --- |
| `:-)` | Normal operation. No errors to report; if any jitter is present, it's small. |
| `:-|` | Normal operation, but average jitter is quite large. |
| `:-P` | A rift was found in the middle of an atomically read block; in other words, the drive lost streaming in the middle of a read and did not abort, alert the kernel, or restart in the proper location. The drive silently continued reading in some random location. |
| `:-/` | The read appears to be drifting; cdparanoia is shifting all of its reads to make up for it. |
| `8-|` | Two matching vectors were found to disagree even after first stage verification; this is an indication that the drive is reliably dropping/adding bytes at consistent locations. Because the verification algorithm is partially based on rereading and comparing vectors, if two vectors read incorrectly but identically, cdparanoia may never detect the problem. This smilie indicates that such a situation *was* detected; other instances may be slipping through. |
| `:-0` | Transport or drive error. This is normally not a cause for concern; cdparanoia can repair just about any error that it actually detects. For more information about these errors, run cdparanoia with the -v option. Any all all errors and a description will dump to stderr. |
| `:-(` | Detected a scratch. |
| `;-(` | Gave up trying to repair a sector; it could not read consistent enough information from the drive to do so. At this point cdparanoia will make the best guess it has available and continue (a `V` appears in the bargraph at this point). This often results in an audible defect. |
| `:^D` | Finished reading a track and no error correction mechanism has been tripped so far reading a new track. |

### Summary

` `, `-`, and `+` symbols in the progress bar are harmless; the resulting audio file should have no defects.
`!` indicates that cdparanoia is uncertain about having caught all errors; a few are likely harmless, lots indicate a problem.
`V` indicates an error that definitely got through, probably an audible error (unless it happened in silence at the edges due to a known bug).
