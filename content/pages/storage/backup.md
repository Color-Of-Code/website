---
published: true
path: "/storage/synology-backup"
date: "2020-12-20"
title: "Synology backup"
tags: ["storage", "synology", "nas", "backup"]
---

## Backup script

Backup via shell Skript vom host zur NAS.
## Daten - Backup

Wenn die Synology an ist, kann auf dem Backup (Nur Lesend) an diesem zugegriffen werden:

* \\SYNDEHAAN\NetBackup

Die Anmeldung erfolg mit dem mitgeteilten Benutzerkonto.

Die Daten werden in einen Verzeichnis `mirror` gespiegelt und während des Spiegels werden die Unterschiede (Änderungen/Löschungen) in einem Ordner im Verzeichnis `backup` gespeichert.

Beispiel:

* \\SYNDEHAAN\NetBackup\Jaap\Documents\mirror
* \\SYNDEHAAN\NetBackup\Jaap\Documents\backup\2015\08\2015-08-23_01h4656\Notes\MakeBackup.note
