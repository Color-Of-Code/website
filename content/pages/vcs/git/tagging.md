---
published: true
path: "/vcs/git/tagging"
date: "2018-12-28"
title: "Git: Tagging"
tags: ["vcs", "git", "tag"]
---

# Git

## Tagging retroactively

```bash
# This moves you to the point in history where the commit exists
git checkout SHA1_OF_PAST_COMMIT

# This command gives you the datetime of the commit you're standing on
git show --format=%aD  | head -1

# And this temporarily sets git tag's clock back to the date you copy/pasted in from above
GIT_COMMITTER_DATE="Thu Nov 11 12:21:57 2010 -0800" git tag -a 0.9.33 -m"Retroactively tagging version 0.9.33"

# Combining the two...
GIT_COMMITTER_DATE="$(git show --format=%aD  | head -1)" git tag -a 0.9.33 -m"Retroactively tagging version 0.9.33"
```
