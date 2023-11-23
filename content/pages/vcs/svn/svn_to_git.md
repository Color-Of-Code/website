---
published: true
path: "/vcs/svn/svn-to-git"
date: "2023-11-23"
title: "Svn to Git"
tags: ["vcs", "git", "svn", "convert", "migrate"]
---

## SVN to GIT migration

Steps to migrate a svn repository into a git repository

### Environment variables

In order to ease the reuse of these explanations let't define some variables:

* `SVN_URL`: https://server:port/svn/subpath
* `GIT_SVN`: a fresh initialized git repository
* `PREFIX`: default is `origin` or any other wanted name

`SVN_URL` can be some path within a repository, there is no need to specify a whole SVN repository, only parts of it can be migrated.

### Build authors-transform configuration

The `authors-transform.txt` file is needed to map svn users onto corresponding git users.

Export log comments

```bash
svn log -q $SVN_URL > commit-log.txt
cat commit-log.txt | awk -F '|' '/^r/ {sub("^ ", "", $2); sub(" $", "", $2); 
print $2" = "$2" <"$2">"}' | sort -u > authors-transform.txt

```

You now should edit the resulting `authors-transform.txt` according to your infrastructure and wanted user mappings.

### Clone the svn repository

Clone the svn repository with `--no-metadata` to avoid addition of info like `git-svn-id` to the log comment. But do not use `--no-metadata` if you intend to still use your svn repository

```bash
git svn clone $SVN_URL --no-metadata -A authors-transform.txt --stdlayout $GIT_SVN
```

Or if the layout is non standard (-t, -b option can be set multiple times), this is broken in git-2.5.1:

```bash
git svn clone $SVN_URL --no-metadata -A authors-transform.txt \
	-T Trunk -b Branches -t Tags --prefix svn/ $GIT_SVN
```

You can stop and proceed by using the same command.

### Git ignore file

Convert `svn:ignore` properties to `.gitignore``

```bash
pushd $GIT_SVN
git svn show-ignore --id=$PREFIX/trunk > .gitignore
git add .gitignore
git commit -m 'Convert svn:ignore properties to .gitignore.'
popd
```

### Checks

Check other unhandled properties if you need to check for exernals for example

There is one file per branch/tag:

```bash
cat .git/svn/refs/remotes/*/trunk/unhandled.log

cat .git/svn/refs/remotes/*/trunk/unhandled.log | grep _prop | grep -v "svn:ignore"
```

### Other branches

List origin branches (assuming origin is your prefix)

```bash
for branch in `git branch -r | grep "$PREFIX/" | sed "s/ $PREFIX\///"`; do
  echo "branch defined in $PREFIX: $branch"
done
```

Convert origin branches to local branches (assuming origin is your prefix)

```bash
for branch in `git branch -r | grep "$PREFIX/" | sed "s/ $PREFIX\///"`; do
  git branch $branch refs/remotes/$PREFIX/$branch
done
```

### Clean up branches and tags

git-svn makes all of Subversions tags into very-short branches in Git of the form `tags/name`. You'll want to convert all those branches into actual Git tags using:

```bash
git for-each-ref --format='%(refname)' refs/heads/tags |
 cut -d / -f 4 |
 while read ref
 do
   git tag "$ref" "refs/heads/tags/$ref";
   git branch -D "tags/$ref";
 done
```

### Clean history

Remove empty commits by rewriting the history

```bash
git filter-repo --strip-blobs-bigger-than 0M
```

Rename `trunk` branch to `main`

```bash
git branch -m trunk main
```

## References

Interesting additional links

* [Understanding git](http://de.slideshare.net/JeffKunkle/understanding-git)
* https://rtyley.github.io/bfg-repo-cleaner/
* git filter-branch -> git filter-repo
* git subtree split [https://developer.atlassian.com/blog/2015/05/the-power-of-git-subtree/](https://developer.atlassian.com/blog/2015/05/the-power-of-git-subtree/)
* [https://github.com/JohnAlbin/git-svn-migrate](https://github.com/JohnAlbin/git-svn-migrate)
* [https://de.atlassian.com/git/tutorials/migrating-convert/](https://de.atlassian.com/git/tutorials/migrating-convert/) has some crappy magic
* [http://www.sailmaker.co.uk/blog/2013/05/05/migrating-from-svn-to-git-preserving-branches-and-tags-3/](http://www.sailmaker.co.uk/blog/2013/05/05/migrating-from-svn-to-git-preserving-branches-and-tags-3/)
* [Non standard migration](http://www.codeproject.com/Articles/781740/Migrating-a-Non-standard-SVN-Repository-to-Git-usi)

