---
published: true
path: "/vcs/svn/svn-to-git"
date: "2018-12-28"
title: "Svn to Git"
tags: ["vcs", "git", "svn", "convert", "TODO_cleanup"]
---

# SVN to GIT

Interesting additional tools

* [Understanding git](http://de.slideshare.net/JeffKunkle/understanding-git)
* https://rtyley.github.io/bfg-repo-cleaner/
* git-filter-branch
* git subtree split [https://developer.atlassian.com/blog/2015/05/the-power-of-git-subtree/](https://developer.atlassian.com/blog/2015/05/the-power-of-git-subtree/)
* Conversion of some properties (.gitignore) [https://github.com/JohnAlbin/git-svn-migrate](https://github.com/JohnAlbin/git-svn-migrate)
* [https://de.atlassian.com/git/tutorials/migrating-convert/](https://de.atlassian.com/git/tutorials/migrating-convert/) has some crappy magic
* [http://www.sailmaker.co.uk/blog/2013/05/05/migrating-from-svn-to-git-preserving-branches-and-tags-3/](http://www.sailmaker.co.uk/blog/2013/05/05/migrating-from-svn-to-git-preserving-branches-and-tags-3/)

## 1 use git-svn

* to clone, a users.txt is used to map users and avoid metadata if you do not intend anymore to use svn

```bash
git svn clone http://my-project.googlecode.com/svn/ \
		--authors-file=users.txt --no-metadata -s my_project
```

## 2 Get rid of git-svn-id metadata

*  If you still had git-svn-id metadata inside the commit messages, you can get rid of them using:

```bash
git filter-branch -f --msg-filter 'sed -e "/git-svn-id:/d"'
```

## 3 Remove empty commits

* Remove empty commits by setting a default commit message

```bash
git filter-branch -f --msg-filter '
read msg
if [ -n "$msg" ] ; then
	echo "$msg"
else
	echo "`<empty commit message>`"
fi'
```
