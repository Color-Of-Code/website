<?php

//
// USED TO PREPARE THE SITE FROM SCRATCH
//
// NOTE: DO NOT DEPLOY TO A WEB SERVER
//       THIS WILL DELETE ALL CONTENTS
//
// Reasons for one time uses:
// - fast remote deletion of all files
//   you must not wait for hours that your ftp client remotely
//   deletes files one by one. This does the job directly on the
//   server
//
// - copy over a set of assets from a static folder
//   saves time to not upload static content over and over
//   again. That way a default structure is already there
//
// - this ensures that even if a site happened to be hacked
//   a clean state is restored (provided the static folder was
//   outside the scopr of the attack)
//
// DISCLAIMER:
// -----------
// USE AT YOUR OWN RISK, DO NOT LEAVE THIS ON A WEB SERVER AFTER USE!
//
// (the script should delete itself after running, but check twice!)
//

function xcopy($source, $dest, $permissions = 0755)
{
    // Check for symlinks
    if (is_link($source)) {
        return symlink(readlink($source), $dest);
    }

    // Simple copy for a file
    if (is_file($source)) {
        return copy($source, $dest);
    }

    // Make destination directory
    if (!is_dir($dest)) {
        mkdir($dest, $permissions);
    }

    // Loop through the folder
    $dir = dir($source);
    while (false !== $entry = $dir->read()) {
        // Skip pointers
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Deep copy directories
        xcopy("$source/$entry", "$dest/$entry", $permissions);
    }

    // Clean up
    $dir->close();
    return true;
}

function rrmdir($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir . "/" . $object) == "dir") {
                    rrmdir($dir . "/" . $object);
                } else {
                    unlink($dir . "/" . $object);
                }

            }
        }
        reset($objects);
        rmdir($dir);
    }
}

// nuke everything
$dir = dirname(__FILE__);
rrmdir($dir);
if (!file_exists($dir)) {
    mkdir($dir, 0777, true);
}

// copy the static contents
xcopy($dir . "/../static", $dir);
