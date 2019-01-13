---
published: true
path: "/vcs/git/bare"
date: "2018-12-28"
title: "Git: Bare"
tags: ["vcs", "git", "bare", "fetch"]
---

# Git Bare

```bash
git clone --bare `<remote url>` `<local path>`
pushd `<local path>`
git config remote.origin.fetch 'refs/heads/*:refs/heads/*'
```

After that git fetch will update all branches.

See [SO: Git Fetch fails to work on bare repo, but git pull works on normal repo](https://stackoverflow.com/questions/10696718/git-fetch-fails-to-work-on-bare-repo-but-git-pull-works-on-normal-repo) for details

