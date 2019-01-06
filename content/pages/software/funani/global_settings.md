---
published: true
path: "/funani/settings"
date: "2019-01-01"
title: "Funani: Settings"
tags: ["funani", "settings", "TODO_cleanup"]
---
# Global Settings

## Rationale

Global system settings have to be persisted. These settings are global to the whole system and allow administrators to steer and setup the global behavior of the system.

## Introduction

By now it is not clear how many settings will be needed. What is clear so far is that the list will be always growing. During the design phase each quantitative arbitrary decision (like the timeout of a session) has to result into a setting. This way the system will remain highly configurable with no magic numbers and limitations.

## Table of system settings

Name value pairs used for global system configuration. It contains things like:

* path to the root directory
* timeout parameter for the sessions (in seconds, 0 for no limit)
