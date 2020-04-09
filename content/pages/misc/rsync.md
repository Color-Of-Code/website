---
published: true
path: "/misc/rsync-flags"
date: "2020-04-08"
title: "Rsync Flags"
tags: ["rsync", "flags", "log"]
---

## Rsync

### Source

https://stackoverflow.com/questions/4493525/what-does-f-mean-in-rsync-logs

### Options

Often used flags during my sync jobs:

```
# itemize and progress
rsync -aiv --info=progress2
```

### Rsync flags

Primer on the bit flags and how to get `rsync` to output bit flags for all actions (it does not do this by default).

With the combination of the `--itemize-changes` flag **and** the `-vvv` flag, `rsync` gives us detailed output of all file system changes that were identified in the source directory when compared to the target directory. The bit flags produced by `rsync` can then be decoded to determine what changed. To decode each bit's meaning, use the following table.

### Explanation

Each bit position and value in `rsync`'s output:

```
  YXcstpoguax  path/to/file
  |||||||||||
  ||||||||||╰- x: The extended attribute information changed
  |||||||||╰-- a: The ACL information changed
  ||||||||╰--- u: The u slot is reserved for future use
  |||||||╰---- g: Group is different
  ||||||╰----- o: Owner is different
  |||||╰------ p: Permission are different
  ||||╰------- t: Modification time is different
  |||╰-------- s: Size is different
  ||╰--------- c: Different checksum (for regular files), or
  ||              changed value (for symlinks, devices, and special files)
  |╰---------- the file type:
  |            f: for a file,
  |            d: for a directory,
  |            L: for a symlink,
  |            D: for a device,
  |            S: for a special file (e.g. named sockets and fifos)
  ╰----------- the type of update being done::
               <: file is being transferred to the remote host (sent)
               >: file is being transferred to the local host (received)
               c: local change/creation for the item, such as:
                  - the creation of a directory
                  - the changing of a symlink,
                  - etc.
               h: the item is a hard link to another item (requires
                  --hard-links).
               .: the item is not being updated (though it might have
                  attributes that are being modified)
               *: means that the rest of the itemized-output area contains
                  a message (e.g. "deleting")

**Some example output from rsync for various scenarios:**

  >f+++++++++ some/dir/new-file.txt
  .f....og..x some/dir/existing-file-with-changed-owner-and-group.txt
  .f........x some/dir/existing-file-with-changed-unnamed-attribute.txt
  >f...p....x some/dir/existing-file-with-changed-permissions.txt
  >f..t..g..x some/dir/existing-file-with-changed-time-and-group.txt
  >f.s......x some/dir/existing-file-with-changed-size.txt
  >f.st.....x some/dir/existing-file-with-changed-size-and-time-stamp.txt
  cd+++++++++ some/dir/new-directory/
  .d....og... some/dir/existing-directory-with-changed-owner-and-group/
  .d..t...... some/dir/existing-directory-with-different-time-stamp/
```

### Capturing `rsync`'s output

Both the `--itemize-changes` flag **and** the `-vvv` flag are needed to get `rsync` to output an entry for *all* file system changes. Without the triple verbose (`-vvv`) flag, I was not seeing directory, link and device changes listed. It is worth experimenting with your version of rsync to make sure that it is observing and noting all that you expected.

Using the `--dry-run` flag to the command and collect the change list, as determined by rsync, into a variable (without making any changes) so you can do some processing on the list yourself. Something like the following would capture the output in a variable:

```bash
  file_system_changes=$(rsync --archive --acls --xattrs \
      --checksum --dry-run \
      --itemize-changes -vvv \
      "/some/source-path/" \
      "/some/destination-path/" \
    | grep -E '^(\.|>|<|c|h|\*).......... .')
```

Above, the (stdout) output from `rsync` is redirected to `grep` (via stdin) so we can isolate only the lines that contain bit flags.

### Processing the captured output

The contents of the variable can then be logged for later use or immediately iterated over for items of interest.

You can look at the script  (https://github.com/jmmitchell/movestough) for examples of post-processing the captured output to isolate new files, duplicate files (same name, same contents), file collisions (same name, different contents), as well as the changes in subdirectory structures.
