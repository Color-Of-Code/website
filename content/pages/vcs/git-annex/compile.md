---
published: true
path: "/vcs/git/git-annex/compile"
date: "2019-01-02"
title: "Git-Annex: Compile"
tags: ["vcs", "git-annex", "git", "compile", "TODO_cleanup"]
---
# Building git annex 64 bit version under windows

## Prerequisites

*  cygwin 64 bit: gcc rsync git wget ssh gnupg
*  git for windows 64bit
*  Haskell 64 bit
*  NullSoftInstaller for building the setup

## Get the source


* clone git-annex (git://git-annex.branchable.com/) git-annex
* cd to git-annex
* patch the code to use git 64 bit

```patch
	Build/NullSoftInstaller.hs | 2 +-
	1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/Build/NullSoftInstaller.hs b/Build/NullSoftInstaller.hs
index 7af6bab..25282e1 100644
--- a/Build/NullSoftInstaller.hs
+++ b/Build/NullSoftInstaller.hs
@@ -88,7 +88,7 @@ uninstaller :: FilePath
	uninstaller = "git-annex-uninstall.exe"
	
	gitInstallDir :: Exp FilePath
-gitInstallDir = fromString "$PROGRAMFILES\\Git"
+gitInstallDir = fromString "$PROGRAMFILES64\\Git"
	
	-- This intentionally has a different name than git-annex or
	-- git-annex-webapp, since it is itself treated as an executable file.
```

## Get the source dependencies


*  eventually set http_proxy=http://proxy....
*  cabal update --verbose=3
*  cabal install --only-dependencies

Set path to cygwin, git

*  cabal configure
*  cabal build
*  del Build/EvilLinker
*  ghc --make Build/EvilLinker -fno-warn-tabs
*  Build/EvilLinker

*  git-annex.exe test

Tests pass only if run as admin (as of my testing)....


*  https://git-annex.branchable.com/forum/Windows_installation_notes/
*  https://qa.nest-initiative.org/view/msysGit/job/msysgit-git-annex-assistant-test/

Sample Build-log that is OK

```
	Started by remote host 66.228.36.95
	Building remotely on windows-7-pro-x86_64 (windows) in workspace c:\jenkins\workspace\msysgit-git-annex-assistant-test
	 > c:/cygwin/bin/git.exe rev-parse --is-inside-work-tree # timeout=10
	Fetching changes from the remote Git repository
	 > c:/cygwin/bin/git.exe config remote.origin.url git://git-annex.branchable.com/git-annex # timeout=10
	Fetching upstream changes from git://git-annex.branchable.com/git-annex
	 > c:/cygwin/bin/git.exe --version # timeout=10
	 > c:/cygwin/bin/git.exe -c core.askpass=true fetch --tags --progress git://git-annex.branchable.com/git-annex +refs/heads/*:refs/remotes/origin/*
	 > c:/cygwin/bin/git.exe rev-parse "refs/remotes/origin/master^{commit}" # timeout=10
	 > c:/cygwin/bin/git.exe rev-parse "refs/remotes/origin/origin/master^{commit}" # timeout=10
	Checking out Revision 8db87ecab1c22a741bd80d05a9cd8cb9d3ce09af (refs/remotes/origin/master)
	 > c:/cygwin/bin/git.exe config core.sparsecheckout # timeout=10
	 > c:/cygwin/bin/git.exe checkout -f 8db87ecab1c22a741bd80d05a9cd8cb9d3ce09af
	 > c:/cygwin/bin/git.exe rev-list f2b6ebd5020aee99395562208f873bd2baf62f2b # timeout=10
	[msysgit-git-annex-assistant-test] $ c:/msysgit/bin/sh.exe C:\Users\jenkins\AppData\Local\Temp\hudson6736807688745304014.sh
	+ set -e
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin'
	+ UPGRADE_LOCATION=http://downloads.kitenet.net/git-annex/windows/current/git-annex-installer.exe
	+ export UPGRADE_LOCATION
	+ rm -f git-annex-installer.exe
	+ cabal update
	Downloading the latest package list from hackage.haskell.org
	Note: there is a new version of cabal-install available.
	To upgrade, run: cabal install cabal-install
	+ cabal install --only-dependencies
	Resolving dependencies...
	All the requested packages are already installed:
	Use --reinstall if you want to reinstall anyway.
	+ '[' -e last-incremental-failed ']'
	+ touch last-incremental-failed
	+ withcyg cabal configure
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ cabal configure
	Resolving dependencies...
	  checking version... 5.20150922-g8db87ec
	  checking UPGRADE_LOCATION... http://downloads.kitenet.net/git-annex/windows/current/git-annex-installer.exe
	  checking git... yes
	  checking git version... 1.9.5.msysgit.1
	  checking cp -a... yes
	  checking cp -p... yes
	  checking cp --preserve=timestamps... no
	  checking cp --reflink=auto... no
	  checking xargs -0... yes
	  checking rsync... yes
	  checking curl... yes
	  checking wget... yes
	  checking wget supports -q --show-progress... no
	  checking bup... no
	  checking nice... yes
	  checking ionice... no
	  checking nocache... no
	  checking gpg... gpg
	  checking lsof... not available
	  checking git-remote-gcrypt... not available
	  checking ssh connection caching... yes
	  checking sha1... sha1sum
	  checking sha256... sha256sum
	  checking sha512... sha512sum
	  checking sha224... sha224sum
	  checking sha384... sha384sum
	Configuring git-annex-5.20150916...
	+ withcyg cabal build
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ cabal build
	Building git-annex-5.20150916...
	Preprocessing executable 'git-annex' for git-annex-5.20150916...
	
	BuildFlags.hs:66:2:  warning: #warning Building without XMPP.
	[143 of 504] Compiling Build.SysConfig  ( Build\SysConfig.hs, dist\build\git-annex\git-annex-tmp\Build\SysConfig.o )
	[210 of 504] Compiling Annex.Url        ( Annex\Url.hs, dist\build\git-annex\git-annex-tmp\Annex\Url.o ) [Build.SysConfig changed]
	[212 of 504] Compiling Annex.Content    ( Annex\Content.hs, dist\build\git-annex\git-annex-tmp\Annex\Content.o ) [Annex.Url changed]
	[217 of 504] Compiling Remote.BitTorrent ( Remote\BitTorrent.hs, dist\build\git-annex\git-annex-tmp\Remote\BitTorrent.o ) [Annex.Url changed]
	[229 of 504] Compiling Remote.S3        ( Remote\S3.hs, dist\build\git-annex\git-annex-tmp\Remote\S3.o ) [Annex.Url changed]
	[232 of 504] Compiling Remote.Web       ( Remote\Web.hs, dist\build\git-annex\git-annex-tmp\Remote\Web.o ) [Annex.Url changed]
	[271 of 504] Compiling Database.Fsck    ( Database\Fsck.hs, dist\build\git-annex\git-annex-tmp\Database\Fsck.o ) [TH]
	Loading package ghc-prim ... linking ... done.
	Loading package integer-gmp ... linking ... done.
	Loading package base ... linking ... done.
	Loading package array-0.5.0.0 ... linking ... done.
	Loading package stm-2.4.2 ... linking ... done.
	Loading package async-2.0.1.5 ... linking ... done.
	Loading package deepseq-1.3.0.2 ... linking ... done.
	Loading package bytestring-0.10.4.0 ... linking ... done.
	Loading package containers-0.5.5.1 ... linking ... done.
	Loading package text-1.1.0.0 ... linking ... done.
	Loading package hashable-1.2.2.0 ... linking ... done.
	Loading package scientific-0.3.3.0 ... linking ... done.
	Loading package attoparsec-0.11.3.4 ... linking ... done.
	Loading package base64-bytestring-1.0.0.1 ... linking ... done.
	Loading package blaze-builder-0.3.3.2 ... linking ... done.
	Loading package byteable-0.1.1 ... linking ... done.
	Loading package transformers-0.3.0.0 ... linking ... done.
	Loading package mtl-2.1.3.1 ... linking ... done.
	Loading package exceptions-0.6.1 ... linking ... done.
	Loading package transformers-base-0.4.3 ... linking ... done.
	Loading package monad-control-0.3.3.0 ... linking ... done.
	Loading package lifted-base-0.2.3.0 ... linking ... done.
	Loading package mmorph-1.0.3 ... linking ... done.
	Loading package resourcet-1.1.2.3 ... linking ... done.
	Loading package nats-0.2 ... linking ... done.
	Loading package unordered-containers-0.2.4.0 ... linking ... done.
	Loading package semigroups-0.15.2 ... linking ... done.
	Loading package void-0.6.1 ... linking ... done.
	Loading package conduit-1.1.7 ... linking ... done.
	Loading package Win32-2.3.0.2 ... linking ... done.
	Loading package filepath-1.3.0.2 ... linking ... done.
	Loading package old-locale-1.0.0.6 ... linking ... done.
	Loading package time-1.4.2 ... linking ... done.
	Loading package directory-1.2.1.0 ... linking ... done.
	Loading package parsec-3.1.5 ... linking ... done.
	Loading package network-2.4.2.3 ... linking ... done.
	Loading package primitive-0.5.2.1 ... linking ... done.
	Loading package process-1.2.0.0 ... linking ... done.
	Loading package random-1.0.1.1 ... linking ... done.
	Loading package zlib-0.5.4.1 ... linking ... done.
	Loading package streaming-commons-0.1.4.2 ... linking ... done.
	Loading package conduit-extra-1.1.3.1 ... linking ... done.
	Loading package cryptohash-0.11.6 ... linking ... done.
	Loading package cryptohash-conduit-0.1.1 ... linking ... done.
	Loading package css-text-0.1.2.1 ... linking ... done.
	Loading package data-default-class-0.0.1 ... linking ... done.
	Loading package data-default-instances-base-0.0.1 ... linking ... done.
	Loading package data-default-instances-containers-0.0.1 ... linking ... done.
	Loading package dlist-0.7.1 ... linking ... done.
	Loading package data-default-instances-dlist-0.0.1 ... linking ... done.
	Loading package data-default-instances-old-locale-0.0.1 ... linking ... done.
	Loading package data-default-0.5.3 ... linking ... done.
	Loading package pretty-1.1.1.1 ... linking ... done.
	Loading package template-haskell ... linking ... done.
	Loading package file-embed-0.0.7 ... linking ... done.
	Loading package utf8-string-0.3.8 ... linking ... done.
	Loading package language-javascript-0.5.13 ... linking ... done.
	Loading package hjsmin-0.1.4.7 ... linking ... done.
	Loading package case-insensitive-1.1.0.3 ... linking ... done.
	Loading package http-types-0.8.5 ... linking ... done.
	Loading package mime-types-0.1.0.4 ... linking ... done.
	Loading package old-time-1.1.0.2 ... linking ... done.
	Loading package syb-0.4.1 ... linking ... done.
	Loading package vector-0.10.9.1 ... linking ... done.
	Loading package aeson-0.7.0.6 ... linking ... done.
	Loading package blaze-markup-0.6.1.0 ... linking ... done.
	Loading package blaze-html-0.7.0.2 ... linking ... done.
	Loading package system-filepath-0.4.12 ... linking ... done.
	Loading package system-fileio-0.3.14 ... linking ... done.
	Loading package shakespeare-2.0.1.1 ... linking ... done.
	Loading package shakespeare-css-1.1.0 ... linking ... done.
	Loading package unix-compat-0.4.1.3 ... linking ... done.
	Loading package vault-0.3.0.3 ... linking ... done.
	Loading package wai-3.0.1.1 ... linking ... done.
	Loading package http-date-0.0.4 ... linking ... done.
	Loading package ansi-terminal-0.6.1.1 ... linking ... done.
	Loading package ansi-wl-pprint-0.6.7.1 ... linking ... done.
	Loading package transformers-compat-0.3.3.4 ... linking ... done.
	Loading package optparse-applicative-0.11.0.2 ... linking ... done.
	Loading package auto-update-0.1.1.1 ... linking ... done.
	Loading package fast-logger-2.2.0 ... linking ... done.
	Loading package stringsearch-0.3.6.5 ... linking ... done.
	Loading package byteorder-1.0.4 ... linking ... done.
	Loading package easy-file-0.2.0 ... linking ... done.
	Loading package wai-logger-2.2.1 ... linking ... done.
	Loading package word8-0.1.1 ... linking ... done.
	Loading package wai-extra-3.0.2 ... linking ... done.
	Loading package simple-sendfile-0.2.15 ... linking ... done.
	Loading package warp-3.0.0.8 ... linking ... done.
	Loading package wai-app-static-3.0.0.6 ... linking ... done.
	Loading package attoparsec-conduit-1.1.0 ... linking ... done.
	Loading package cereal-0.4.0.1 ... linking ... done.
	Loading package securemem-0.1.3 ... linking ... done.
	Loading package crypto-cipher-types-0.0.9 ... linking ... done.
	Loading package cipher-aes-0.2.8 ... linking ... done.
	Loading package crypto-random-0.0.7 ... linking ... done.
	Loading package cprng-aes-0.5.2 ... linking ... done.
	Loading package entropy-0.3.2 ... linking ... done.
	Loading package tagged-0.7.2 ... linking ... done.
	Loading package crypto-api-0.13 ... linking ... done.
	Loading package skein-1.0.9 ... linking ... done.
	Loading package clientsession-0.9.0.3 ... linking ... done.
	Loading package cookie-0.4.1.3 ... linking ... done.
	Loading package hamlet-1.2.0 ... linking ... done.
	Loading package monad-loops-0.4.2.1 ... linking ... done.
	Loading package stm-chans-3.0.0.2 ... linking ... done.
	Loading package monad-logger-0.3.7.1 ... linking ... done.
	Loading package path-pieces-0.1.4 ... linking ... done.
	Loading package safe-0.3.8 ... linking ... done.
	Loading package shakespeare-i18n-1.1.0 ... linking ... done.
	Loading package shakespeare-js-1.3.0 ... linking ... done.
	Loading package yesod-routes-1.2.0.7 ... linking ... done.
	Loading package yesod-core-1.2.19 ... linking ... done.
	Loading package yesod-static-1.2.4 ... linking ... done.
	Loading package yesod-default-1.2.0 ... linking ... done.
	Loading package network-conduit-1.1.0 ... linking ... done.
	Loading package yaml-0.8.8.4 ... linking ... done.
	Loading package publicsuffixlist-0.1 ... linking ... done.
	Loading package http-client-0.3.6.1 ... linking ... done.
	Loading package socks-0.5.4 ... linking ... done.
	Loading package asn1-types-0.2.3 ... linking ... done.
	Loading package asn1-encoding-0.8.1.3 ... linking ... done.
	Loading package cipher-des-0.0.6 ... linking ... done.
	Loading package cipher-rc4-0.1.4 ... linking ... done.
	Loading package crypto-numbers-0.2.3 ... linking ... done.
	Loading package crypto-pubkey-types-0.4.2.2 ... linking ... done.
	Loading package crypto-pubkey-0.2.4 ... linking ... done.
	Loading package asn1-parse-0.8.1 ... linking ... done.
	Loading package pem-0.2.2 ... linking ... done.
	Loading package x509-1.4.11 ... linking ... done.
	Loading package x509-store-1.4.4 ... linking ... done.
	Loading package x509-validation-1.5.0 ... linking ... done.
	Loading package tls-1.2.8 ... linking ... done.
	Loading package x509-system-1.4.5 ... linking ... done.
	Loading package connection-0.2.3 ... linking ... done.
	Loading package http-client-tls-0.2.2 ... linking ... done.
	Loading package http-conduit-2.1.4 ... linking ... done.
	Loading package blaze-builder-conduit-1.1.0 ... linking ... done.
	Loading package xml-types-0.3.4 ... linking ... done.
	Loading package xml-conduit-1.2.1 ... linking ... done.
	Loading package tagstream-conduit-0.5.5.1 ... linking ... done.
	Loading package authenticate-1.3.2.9 ... linking ... done.
	Loading package base16-bytestring-0.1.1.6 ... linking ... done.
	Loading package binary-0.7.1.0 ... linking ... done.
	Loading package email-validate-2.0.1 ... linking ... done.
	Loading package mime-mail-0.4.5.2 ... linking ... done.
	Loading package resource-pool-0.2.3.0 ... linking ... done.
	Loading package silently-1.2.4.1 ... linking ... done.
	Loading package persistent-1.3.3 ... linking ... done.
	Loading package persistent-template-1.3.2.2 ... linking ... done.
	Loading package tagsoup-0.13.2 ... linking ... done.
	Loading package xss-sanitize-0.3.5.2 ... linking ... done.
	Loading package yesod-persistent-1.2.3 ... linking ... done.
	Loading package yesod-form-1.3.15 ... linking ... done.
	Loading package yesod-auth-1.3.4 ... linking ... done.
	Loading package yesod-1.2.6.1 ... linking ... done.
	Loading package warp-tls-3.0.0 ... linking ... done.
	Loading package network-info-0.2.0.5 ... linking ... done.
	Loading package uuid-1.3.3 ... linking ... done.
	Loading package bencode-0.5 ... linking ... done.
	Loading package torrent-10000.0.0 ... linking ... done.
	Loading package contravariant-1.1 ... linking ... done.
	Loading package distributive-0.4.4 ... linking ... done.
	Loading package comonad-4.2.2 ... linking ... done.
	Loading package fingertree-0.1.0.0 ... linking ... done.
	Loading package semigroupoids-4.2 ... linking ... done.
	Loading package bifunctors-4.1.1.1 ... linking ... done.
	Loading package prelude-extras-0.4 ... linking ... done.
	Loading package profunctors-4.2.0.1 ... linking ... done.
	Loading package free-4.9 ... linking ... done.
	Loading package keys-3.10.1 ... linking ... done.
	Loading package pointed-4.1 ... linking ... done.
	Loading package reducers-3.10.2.1 ... linking ... done.
	Loading package split-0.2.2 ... linking ... done.
	Loading package regex-base-0.93.2 ... linking ... done.
	Loading package regex-tdfa-rc-1.1.8.3 ... linking ... done.
	Loading package unbounded-delays-0.1.0.8 ... linking ... done.
	Loading package tasty-0.10.0.3 ... linking ... done.
	Loading package tasty-rerun-1.1.4 ... linking ... done.
	Loading package QuickCheck-2.6 ... linking ... done.
	Loading package tasty-quickcheck-0.8 ... linking ... done.
	Loading package tasty-hunit-0.9.2 ... linking ... done.
	Loading package setenv-0.1.1.1 ... linking ... done.
	Loading package sandi-0.3.3 ... linking ... done.
	Loading package regex-tdfa-1.2.0 ... linking ... done.
	Loading package persistent-sqlite-1.3.0.5 ... linking ... done.
	Loading package network-multicast-0.0.11 ... linking ... done.
	Loading package json-0.7 ... linking ... done.
	Loading package xml-1.3.13 ... linking ... done.
	Loading package feed-0.3.9.2 ... linking ... done.
	Loading package esqueleto-1.4.4 ... linking ... done.
	Loading package edit-distance-0.2.1.2 ... linking ... done.
	Loading package appar-0.1.4 ... linking ... done.
	Loading package iproute-1.3.1 ... linking ... done.
	Loading package dns-1.4.3 ... linking ... done.
	Loading package memory-0.7 ... linking ... done.
	Loading package cryptonite-0.6 ... linking ... done.
	Loading package bloomfilter-2.0.0.0 ... linking ... done.
	Loading package aws-0.10.5 ... linking ... done.
	Loading package Win32-notify-0.3 ... linking ... done.
	Loading package Win32-extras-0.2.0.1 ... linking ... done.
	Loading package SafeSemaphore-0.10.1 ... linking ... done.
	Loading package HUnit-1.2.5.2 ... linking ... done.
	Loading package hslogger-1.2.4 ... linking ... done.
	Loading package regex-posix-0.95.2 ... linking ... done.
	Loading package regex-compat-0.95.1 ... linking ... done.
	Loading package MissingH-1.2.1.0 ... linking ... done.
	Loading package IfElse-0.85 ... linking ... done.
	Loading package MonadRandom-0.1.13 ... linking ... done.
	Loading package either-4.3.0.1 ... linking ... done.
	Loading package errors-1.4.7 ... linking ... done.
	Loading package parallel-3.2.0.4 ... linking ... done.
	Loading package reflection-1.5.1 ... linking ... done.
	Loading package lens-4.3.3 ... linking ... done.
	Loading package xml-hamlet-0.4.0.9 ... linking ... done.
	Loading package DAV-1.0 ... linking ... done.
	[276 of 504] Compiling Remote.External  ( Remote\External.hs, dist\build\git-annex\git-annex-tmp\Remote\External.o ) [Annex.Url changed]
	[297 of 504] Compiling Remote.Git       ( Remote\Git.hs, dist\build\git-annex\git-annex-tmp\Remote\Git.o ) [Annex.Url changed]
	
	Remote\Git.hs:621:10: Warning:
	    Defined but not used: `remotewanthardlink'
	[375 of 504] Compiling Command.AddUrl   ( Command\AddUrl.hs, dist\build\git-annex\git-annex-tmp\Command\AddUrl.o ) [Annex.Url changed]
	[376 of 504] Compiling Command.ImportFeed ( Command\ImportFeed.hs, dist\build\git-annex\git-annex-tmp\Command\ImportFeed.o ) [Annex.Url changed]
	[386 of 504] Compiling Command.Version  ( Command\Version.hs, dist\build\git-annex\git-annex-tmp\Command\Version.o ) [Build.SysConfig changed]
	[435 of 504] Compiling Assistant.WebApp.Types ( Assistant\WebApp\Types.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Types.o ) [Build.SysConfig changed]
	[436 of 504] Compiling Assistant.WebApp ( Assistant\WebApp.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp.o ) [TH]
	[438 of 504] Compiling Assistant.WebApp.Notifications ( Assistant\WebApp\Notifications.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Notifications.o ) [TH]
	[439 of 504] Compiling Assistant.WebApp.SideBar ( Assistant\WebApp\SideBar.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\SideBar.o ) [TH]
	[457 of 504] Compiling Assistant.WebApp.Page ( Assistant\WebApp\Page.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Page.o ) [TH]
	[458 of 504] Compiling Assistant.WebApp.OtherRepos ( Assistant\WebApp\OtherRepos.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\OtherRepos.o ) [TH]
	[463 of 504] Compiling Assistant.WebApp.Form ( Assistant\WebApp\Form.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Form.o ) [TH]
	[465 of 504] Compiling Assistant.WebApp.RepoList ( Assistant\WebApp\RepoList.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\RepoList.o ) [TH]
	[466 of 504] Compiling Assistant.WebApp.DashBoard ( Assistant\WebApp\DashBoard.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\DashBoard.o ) [TH]
	[467 of 504] Compiling Assistant.WebApp.Configurators ( Assistant\WebApp\Configurators.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators.o ) [TH]
	[468 of 504] Compiling Assistant.WebApp.Configurators.XMPP ( Assistant\WebApp\Configurators\XMPP.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\XMPP.o ) [TH]
	[469 of 504] Compiling Assistant.WebApp.Configurators.Preferences ( Assistant\WebApp\Configurators\Preferences.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Preferences.o ) [TH]
	[470 of 504] Compiling Assistant.WebApp.Configurators.Unused ( Assistant\WebApp\Configurators\Unused.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Unused.o ) [TH]
	[471 of 504] Compiling Assistant.WebApp.Configurators.Delete ( Assistant\WebApp\Configurators\Delete.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Delete.o ) [TH]
	[472 of 504] Compiling Assistant.WebApp.Configurators.Fsck ( Assistant\WebApp\Configurators\Fsck.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Fsck.o ) [TH]
	[473 of 504] Compiling Assistant.WebApp.Documentation ( Assistant\WebApp\Documentation.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Documentation.o ) [Build.SysConfig changed]
	[474 of 504] Compiling Assistant.WebApp.Control ( Assistant\WebApp\Control.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Control.o ) [TH]
	[475 of 504] Compiling Assistant.WebApp.Repair ( Assistant\WebApp\Repair.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Repair.o ) [TH]
	[479 of 504] Compiling Assistant.WebApp.Configurators.AWS ( Assistant\WebApp\Configurators\AWS.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\AWS.o ) [TH]
	[480 of 504] Compiling Assistant.WebApp.Configurators.IA ( Assistant\WebApp\Configurators\IA.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\IA.o ) [Annex.Url changed]
	[481 of 504] Compiling Assistant.WebApp.Configurators.WebDAV ( Assistant\WebApp\Configurators\WebDAV.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\WebDAV.o ) [TH]
	[482 of 504] Compiling Assistant.WebApp.Gpg ( Assistant\WebApp\Gpg.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Gpg.o ) [TH]
	[483 of 504] Compiling Assistant.WebApp.Configurators.Local ( Assistant\WebApp\Configurators\Local.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Local.o ) [TH]
	[484 of 504] Compiling Assistant.WebApp.Configurators.Ssh ( Assistant\WebApp\Configurators\Ssh.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Ssh.o ) [TH]
	[485 of 504] Compiling Assistant.WebApp.Configurators.Edit ( Assistant\WebApp\Configurators\Edit.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Edit.o ) [TH]
	[487 of 504] Compiling Assistant.WebApp.Configurators.Pairing ( Assistant\WebApp\Configurators\Pairing.hs, dist\build\git-annex\git-annex-tmp\Assistant\WebApp\Configurators\Pairing.o ) [TH]
	[489 of 504] Compiling Assistant.Upgrade ( Assistant\Upgrade.hs, dist\build\git-annex\git-annex-tmp\Assistant\Upgrade.o ) [Annex.Url changed]
	[491 of 504] Compiling Assistant.Threads.WebApp ( Assistant\Threads\WebApp.hs, dist\build\git-annex\git-annex-tmp\Assistant\Threads\WebApp.o ) [Assistant.WebApp.Documentation changed]
	[492 of 504] Compiling Assistant.Threads.Upgrader ( Assistant\Threads\Upgrader.hs, dist\build\git-annex\git-annex-tmp\Assistant\Threads\Upgrader.o ) [Assistant.Upgrade changed]
	[493 of 504] Compiling Assistant.Threads.UpgradeWatcher ( Assistant\Threads\UpgradeWatcher.hs, dist\build\git-annex\git-annex-tmp\Assistant\Threads\UpgradeWatcher.o ) [Build.SysConfig changed]
	[494 of 504] Compiling Assistant        ( Assistant.hs, dist\build\git-annex\git-annex-tmp\Assistant.o ) [Assistant.Threads.WebApp changed]
	[495 of 504] Compiling Command.Watch    ( Command\Watch.hs, dist\build\git-annex\git-annex-tmp\Command\Watch.o ) [Assistant changed]
	[496 of 504] Compiling Command.Assistant ( Command\Assistant.hs, dist\build\git-annex\git-annex-tmp\Command\Assistant.o ) [Command.Watch changed]
	[497 of 504] Compiling Command.WebApp   ( Command\WebApp.hs, dist\build\git-annex\git-annex-tmp\Command\WebApp.o ) [Assistant changed]
	[501 of 504] Compiling CmdLine.GitAnnex ( CmdLine\GitAnnex.hs, dist\build\git-annex\git-annex-tmp\CmdLine\GitAnnex.o ) [Command.Assistant changed]
	[503 of 504] Compiling Test             ( Test.hs, dist\build\git-annex\git-annex-tmp\Test.o ) [CmdLine.GitAnnex changed]
	[504 of 504] Compiling Main             ( git-annex.hs, dist\build\git-annex\git-annex-tmp\Main.o ) [CmdLine.GitAnnex changed]
	
	BuildFlags.hs:66:2:  warning: #warning Building without XMPP.
	Linking dist\build\git-annex\git-annex.exe ...
	ghc.exe: could not execute: C:\haskell\2014.2.0.0\lib/../mingw/bin/gcc.exe
	+ rm -f Build/EvilLinker.exe
	+ ghc --make Build/EvilLinker -fno-warn-tabs
	Linking Build\EvilLinker.exe ...
	+ Build/EvilLinker
	cabal ["build","--ghc-options=-v -keep-tmp-files"]
	cabal finished False
	C:\haskell\2014.2.0.0\lib/../mingw/bin/gcc.exe ["@gcc.opt","-v"]
	C:\haskell\2014.2.0.0\lib/../mingw/bin/gcc.exe finished False
	C:/haskell/2014.2.0.0/mingw/bin/../libexec/gcc/mingw32/4.5.2/collect2.exe ["@collect2.opt","-v"]
	C:/haskell/2014.2.0.0/mingw/bin/../libexec/gcc/mingw32/4.5.2/collect2.exe finished False
	C:/haskell/2014.2.0.0/mingw/bin/ld.exe ["@ld.opt"]
	C:/haskell/2014.2.0.0/mingw/bin/ld.exe finished True
	+ '[' '!' -e rsync.exe ']'
	++ sha1sum rsync.exe
	standalone/windows/build.sh: line 65: sha1sum: command not found
	+ '[' '' '!=' 85cb7a4d16d274fcf8069b39042965ad26abd6aa ']'
	+ rm -f rsync.exe
	+ withcyg wget https://downloads.kitenet.net/git-annex/windows/assets/rsync.exe
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ wget https://downloads.kitenet.net/git-annex/windows/assets/rsync.exe
	--2015-09-23 00:38:32--  https://downloads.kitenet.net/git-annex/windows/assets/rsync.exe
	Resolving downloads.kitenet.net (downloads.kitenet.net)... 66.228.36.95, 2600:3c03::f03c:91ff:fe73:b0d2
	Connecting to downloads.kitenet.net (downloads.kitenet.net)|66.228.36.95|:443... connected.
	HTTP request sent, awaiting response... 200 OK
	Length: 388947 (380K) [application/x-msdos-program]
	Saving to: 'rsync.exe'
	
	     0K .......... .......... .......... .......... .......... 13%  247K 1s
	    50K .......... .......... .......... .......... .......... 26%  500K 1s
	   100K .......... .......... .......... .......... .......... 39% 20.9M 0s
	   150K .......... .......... .......... .......... .......... 52%  496K 0s
	   200K .......... .......... .......... .......... .......... 65%  500K 0s
	   250K .......... .......... .......... .......... .......... 78%  493K 0s
	   300K .......... .......... .......... .......... .......... 92%  497K 0s
	   350K .......... .......... .........                       100% 19.3M=0.7s
	
	2015-09-23 00:38:33 (536 KB/s) - 'rsync.exe' saved [388947/388947]
	
	+ withcyg chmod +x rsync.exe
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ chmod +x rsync.exe
	+ '[' '!' -e wget.exe ']'
	++ sha1sum wget.exe
	standalone/windows/build.sh: line 70: sha1sum: command not found
	+ '[' '' '!=' 044380729200d5762965b10123a4f134806b01cf ']'
	+ rm -f wget.exe
	+ withcyg wget https://downloads.kitenet.net/git-annex/windows/assets/wget.exe
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ wget https://downloads.kitenet.net/git-annex/windows/assets/wget.exe
	--2015-09-23 00:38:33--  https://downloads.kitenet.net/git-annex/windows/assets/wget.exe
	Resolving downloads.kitenet.net (downloads.kitenet.net)... 66.228.36.95, 2600:3c03::f03c:91ff:fe73:b0d2
	Connecting to downloads.kitenet.net (downloads.kitenet.net)|66.228.36.95|:443... connected.
	HTTP request sent, awaiting response... 200 OK
	Length: 484236 (473K) [application/x-msdos-program]
	Saving to: 'wget.exe'
	
	     0K .......... .......... .......... .......... .......... 10%  247K 2s
	    50K .......... .......... .......... .......... .......... 21%  494K 1s
	   100K .......... .......... .......... .......... .......... 31% 26.5M 1s
	   150K .......... .......... .......... .......... .......... 42%  488K 1s
	   200K .......... .......... .......... .......... .......... 52%  495K 0s
	   250K .......... .......... .......... .......... .......... 63%  492K 0s
	   300K .......... .......... .......... .......... .......... 74%  497K 0s
	   350K .......... .......... .......... .......... .......... 84% 22.6M 0s
	   400K .......... .......... .......... .......... .......... 95%  494K 0s
	   450K .......... .......... ..                              100% 38.3M=0.8s
	
	2015-09-23 00:38:35 (580 KB/s) - 'wget.exe' saved [484236/484236]
	
	+ withcyg chmod +x wget.exe
	+ PATH='/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ chmod +x wget.exe
	+ cabal install nsis
	Resolving dependencies...
	All the requested packages are already installed:
	nsis-0.3
	Use --reinstall if you want to reinstall anyway.
	+ ghc -fforce-recomp --make Build/NullSoftInstaller.hs -fno-warn-tabs
	[ 1 of 22] Compiling Utility.PartialPrelude ( Utility\PartialPrelude.hs, Utility\PartialPrelude.o )
	[ 2 of 22] Compiling Utility.FileSize ( Utility\FileSize.hs, Utility\FileSize.o )
	[ 3 of 22] Compiling Utility.PosixFiles ( Utility\PosixFiles.hs, Utility\PosixFiles.o )
	[ 4 of 22] Compiling Utility.Applicative ( Utility\Applicative.hs, Utility\Applicative.o )
	[ 5 of 22] Compiling Utility.Monad    ( Utility\Monad.hs, Utility\Monad.o )
	[ 6 of 22] Compiling Utility.Data     ( Utility\Data.hs, Utility\Data.o )
	[ 7 of 22] Compiling Build.SysConfig  ( Build\SysConfig.hs, Build\SysConfig.o )
	[ 8 of 22] Compiling Build.BundledPrograms ( Build\BundledPrograms.hs, Build\BundledPrograms.o )
	[ 9 of 22] Compiling Utility.Exception ( Utility\Exception.hs, Utility\Exception.o )
	[10 of 22] Compiling Utility.FileSystemEncoding ( Utility\FileSystemEncoding.hs, Utility\FileSystemEncoding.o )
	[11 of 22] Compiling Utility.Misc     ( Utility\Misc.hs, Utility\Misc.o )
	[12 of 22] Compiling Utility.Env      ( Utility\Env.hs, Utility\Env.o )
	[13 of 22] Compiling Utility.UserInfo ( Utility\UserInfo.hs, Utility\UserInfo.o )
	[14 of 22] Compiling Utility.Process  ( Utility\Process.hs, Utility\Process.o )
	[15 of 22] Compiling Utility.Network  ( Utility\Network.hs, Utility\Network.o )
	[16 of 22] Compiling Utility.SafeCommand ( Utility\SafeCommand.hs, Utility\SafeCommand.o )
	[17 of 22] Compiling Utility.Path     ( Utility\Path.hs, Utility\Path.o )
	[18 of 22] Compiling Utility.Tmp      ( Utility\Tmp.hs, Utility\Tmp.o )
	[19 of 22] Compiling Utility.Directory ( Utility\Directory.hs, Utility\Directory.o )
	[20 of 22] Compiling Common           ( Common.hs, Common.o )
	[21 of 22] Compiling Utility.CopyFile ( Utility\CopyFile.hs, Utility\CopyFile.o )
	[22 of 22] Compiling Main             ( Build\NullSoftInstaller.hs, Build\NullSoftInstaller.o )
	Linking Build\NullSoftInstaller.exe ...
	+ PATH='.:/c/cygwin/bin:/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin'
	+ Build/NullSoftInstaller.exe
	MakeNSIS v2.46 - Copyright 1995-2009 Contributors
	See the file COPYING for license details.
	Credits can be found in the Users Manual.
	
	Processing config: 
	Processing plugin dlls: "c:\Program Files (x86)\NSIS\Plugins\*.dll"
	 - AdvSplash::show
	 - Banner::destroy
	 - Banner::getWindow
	 - Banner::show
	 - BgImage::AddImage
	 - BgImage::AddText
	 - BgImage::Clear
	 - BgImage::Destroy
	 - BgImage::Redraw
	 - BgImage::SetBg
	 - BgImage::SetReturn
	 - BgImage::Sound
	 - Dialer::AttemptConnect
	 - Dialer::AutodialHangup
	 - Dialer::AutodialOnline
	 - Dialer::AutodialUnattended
	 - Dialer::GetConnectedState
	 - InstallOptions::dialog
	 - InstallOptions::initDialog
	 - InstallOptions::show
	 - LangDLL::LangDialog
	 - Math::Script
	 - NSISdl::download
	 - NSISdl::download_quiet
	 - Splash::show
	 - StartMenu::Init
	 - StartMenu::Select
	 - StartMenu::Show
	 - System::Alloc
	 - System::Call
	 - System::Copy
	 - System::Free
	 - System::Get
	 - System::Int64Op
	 - System::Store
	 - TypeLib::GetLibVersion
	 - TypeLib::Register
	 - TypeLib::UnRegister
	 - UserInfo::GetAccountType
	 - UserInfo::GetName
	 - UserInfo::GetOriginalAccountType
	 - VPatch::GetFileCRC32
	 - VPatch::GetFileMD5
	 - VPatch::vpatchfile
	 - nsDialogs::Create
	 - nsDialogs::CreateControl
	 - nsDialogs::CreateItem
	 - nsDialogs::CreateTimer
	 - nsDialogs::GetUserData
	 - nsDialogs::KillTimer
	 - nsDialogs::OnBack
	 - nsDialogs::OnChange
	 - nsDialogs::OnClick
	 - nsDialogs::OnNotify
	 - nsDialogs::SelectFileDialog
	 - nsDialogs::SelectFolderDialog
	 - nsDialogs::SetRTL
	 - nsDialogs::SetUserData
	 - nsDialogs::Show
	 - nsExec::Exec
	 - nsExec::ExecToLog
	 - nsExec::ExecToStack
	
	!define: "MUI_INSERT_NSISCONF"=""
	
	Changing directory to: "c:\jenkins\workspace\msysgit-git-annex-assistant-test\git-annex"
	
	Processing script file: "git-annex.nsi"
	!include: "c:\Program Files (x86)\NSIS\Include\MUI2.nsh"
	!include: "c:\Program Files (x86)\NSIS\Contrib\Modern UI 2\MUI2.nsh"
	NSIS Modern User Interface version 2.0 - Copyright 2002-2009 Joost Verburg (c:\Program Files (x86)\NSIS\Contrib\Modern UI 2\MUI2.nsh:8)
	!define: "MUI_INCLUDED"=""
	!define: "MUI_SYSVERSION"="2.0"
	!define: "MUI_VERBOSE"="3"
	!include: closed: "c:\Program Files (x86)\NSIS\Contrib\Modern UI 2\MUI2.nsh"
	!include: closed: "c:\Program Files (x86)\NSIS\Include\MUI2.nsh"
	Name: "git-annex"
	OutFile: "git-annex-installer.exe"
	InstallDir: "$PROGRAMFILES\Git"
	!insertmacro: MUI_PAGE_DIRECTORY
	!insertmacro: end of MUI_PAGE_DIRECTORY
	!insertmacro: MUI_PAGE_LICENSE
	!insertmacro: end of MUI_PAGEDECLARATION_LICENSE
	!insertmacro: end of MUI_PAGE_LICENSE
	!insertmacro: MUI_PAGE_INSTFILES
	!insertmacro: end of MUI_PAGE_INSTFILES
	!insertmacro: MUI_LANGUAGE
	!insertmacro: end of MUI_LANGUAGE
	Section: "cmd" ->(_sec10)
	Delete: /REBOOTOK "$INSTDIR\cmd\git-annex.exe"
	Delete: /REBOOTOK "$INSTDIR\cmd\rsync.exe"
	Delete: /REBOOTOK "$INSTDIR\cmd\wget.exe"
	SetOutPath: "$INSTDIR\usr\bin"
	File: "git-annex.exe" [compress] 18602230/72948099 bytes
	File: "rsync.exe" [compress] 183986/388947 bytes
	File: "wget.exe" [compress] 212831/484236 bytes
	SetOutPath: "$INSTDIR\cmd"
	File: "git-annex.cmd" [compress] 12 bytes
	SectionEnd
	Section: "meta" ->(_sec11)
	SetOutPath: "$INSTDIR\mingw32\share\doc\git-doc"
	File: "git-annex.html" [compress] 130/191 bytes
	SetOutPath: "$INSTDIR"
	File: "git-annex-licenses.txt" [compress] 56121/232368 bytes
	SetOutPath: "$INSTDIR\cmd"
	File: "git-annex-webapp.vbs" [compress] 120/143 bytes
	File: "git-annex-autostart.vbs" [compress] 127/158 bytes
	WriteUninstaller: "git-annex-uninstall.exe"
	SectionEnd
	Section: "Uninstall" ->(_sec12)
	Delete: /REBOOTOK "$SMPROGRAMS\Git Annex (Webapp).lnk"
	Delete: /REBOOTOK "$SMSTARTUP\git-annex-autostart.lnk"
	Delete: /REBOOTOK "$INSTDIR\usr\bin\git-annex.exe"
	Delete: /REBOOTOK "$INSTDIR\usr\bin\rsync.exe"
	Delete: /REBOOTOK "$INSTDIR\usr\bin\wget.exe"
	Delete: /REBOOTOK "$INSTDIR\cmd\git-annex.cmd"
	Delete: /REBOOTOK "$INSTDIR\cmd\git-annex-webapp.vbs"
	Delete: /REBOOTOK "$INSTDIR\cmd\git-annex-autostart.vbs"
	Delete: /REBOOTOK "$INSTDIR\mingw32\share\doc\git-doc\git-annex.html"
	Delete: /REBOOTOK "$INSTDIR\git-annex-licenses.txt"
	Delete: /REBOOTOK "$INSTDIR\git-annex-uninstall.exe"
	SectionEnd
	Function: ".onInit"
	IfFileExists: "$PROGRAMFILES\Git" ? _lbl3 : 0
	MessageBox: 48: "You need git installed to use git-annex. Looking at $PROGRAMFILES\Git , it seems to not be installed, or may be installed in another location. You can install git from http://git-scm.com/" (on IDOK goto 0)
	CreateDirectory: "$SMPROGRAMS"
	CreateShortCut: "$SMPROGRAMS\Git Annex (Webapp).lnk"->"wscript.exe" "$INSTDIR\cmd\git-annex-webapp.vbs" "$INSTDIR\cmd" icon:$INSTDIR\usr\bin\git-annex.exe,2, showmode=0x1, hotkey=0x0, comment=Git Annex (Webapp)
	Delete: /REBOOTOK "$SMPROGRAMS\git-annex.lnk"
	CreateShortCut: "$SMSTARTUP\git-annex-autostart.lnk"->"wscript.exe" "$INSTDIR\cmd\git-annex-autostart.vbs" "$INSTDIR\cmd" icon:$INSTDIR\usr\bin\git-annex.exe,2, showmode=0x1, hotkey=0x0, comment=git-annex autostart
	FunctionEnd
	
	Processed 1 file, writing output:
	Processing pages... Done!
	Removing unused resources... Done!
	Generating language tables... Done!
	Generating uninstaller... Done!
	
	Output: "c:\jenkins\workspace\msysgit-git-annex-assistant-test\git-annex\git-annex-installer.exe"
	Install: 4 pages (256 bytes), 2 sections (2096 bytes), 87 instructions (2436 bytes), 127 strings (234659 bytes), 1 language table (278 bytes).
	Uninstall: 2 pages (128 bytes), 
	1 section (1048 bytes), 12 instructions (336 bytes), 54 strings (933 bytes), 1 language table (194 bytes).
	
	Using zlib compression.
	
	EXE header size:               48640 / 35840 bytes
	Install code:                  58541 / 240101 bytes
	Install data:               19055589 / 74054194 bytes
	Uninstall code+data:           10410 / 14770 bytes
	CRC (0x980150FB):                  4 / 4 bytes
	
	Total size:                 19173184 / 74344909 bytes (25.7%)
	+ rm -f last-incremental-failed
	+ rm -f dist/build-version
	+ ghc --make Build/BuildVersion.hs
	Linking Build\BuildVersion.exe ...
	+ Build/BuildVersion
	++ pwd
	+ PATH='/c/jenkins/workspace/msysgit-git-annex-assistant-test/git-annex/dist/build/git-annex/:/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin'
	+ export PATH
	+ mkdir -p c:/WINDOWS/Temp/git-annex-test/
	+ cd c:/WINDOWS/Temp/git-annex-test/
	+ withcyg git-annex.exe test
	+ PATH='/c/jenkins/workspace/msysgit-git-annex-assistant-test/git-annex/dist/build/git-annex/:/c/Program Files (x86)/NSIS:/c/msysgit/cmd:/c/msysgit/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0/:/c/haskell/2014.2.0.0/lib/extralibs/bin:/c/haskell/2014.2.0.0/bin:/c/haskell/2014.2.0.0/mingw/bin:/c/cygwin/bin'
	+ git-annex.exe test
	Tests
	  QuickCheck
	    prop_idempotent_deencode_git:                   OK (0.24s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_deencode:                       OK (0.14s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_fileKey:                        OK (0.05s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_key_encode:                     OK (0.05s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_key_decode:                     OK (0.02s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_shellEscape:                    OK (0.03s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_shellEscape_multiword:          OK (1.18s)
	      +++ OK, passed 1000 tests.
	    prop_idempotent_configEscape:                   OK (0.04s)
	      +++ OK, passed 1000 tests.
	    prop_parse_show_Config:                         OK (0.08s)
	      +++ OK, passed 1000 tests.
	    prop_upFrom_basics:                             OK (0.04s)
	      +++ OK, passed 1000 tests.
	    prop_relPathDirToFile_basics:                   OK (0.04s)
	      +++ OK, passed 1000 tests.
	    prop_relPathDirToFile_regressionTest:           OK
	      +++ OK, passed 1000 tests.
	    prop_cost_sane:                                 OK
	      +++ OK, passed 1000 tests.
	    prop_matcher_sane:                              OK
	      +++ OK, passed 1000 tests.
	    prop_HmacSha1WithCipher_sane:                   OK
	      +++ OK, passed 1000 tests.
	    prop_TimeStamp_sane:                            OK
	      +++ OK, passed 1000 tests.
	    prop_addMapLog_sane:                            OK
	      +++ OK, passed 1000 tests.
	    prop_verifiable_sane:                           OK (0.14s)
	      +++ OK, passed 1000 tests.
	    prop_segment_regressionTest:                    OK
	      +++ OK, passed 1000 tests.
	    prop_read_write_transferinfo:                   OK (0.06s)
	      +++ OK, passed 1000 tests.
	    prop_read_show_inodecache:                      OK (0.02s)
	      +++ OK, passed 1000 tests.
	    prop_parse_show_log:                            OK (1.54s)
	      +++ OK, passed 1000 tests.
	    prop_read_show_TrustLevel:                      OK
	      +++ OK, passed 1000 tests.
	    prop_parse_show_TrustLog:                       OK
	      +++ OK, passed 1000 tests.
	    prop_hashes_stable:                             OK
	      +++ OK, passed 1000 tests.
	    prop_mac_stable:                                OK
	      +++ OK, passed 1000 tests.
	    prop_schedule_roundtrips:                       OK (0.02s)
	      +++ OK, passed 1000 tests.
	    prop_past_sane:                                 OK
	      +++ OK, passed 1000 tests.
	    prop_duration_roundtrips:                       OK (0.01s)
	      +++ OK, passed 1000 tests.
	    prop_metadata_sane:                             OK (4.20s)
	      +++ OK, passed 1000 tests.
	    prop_metadata_serialize:                        OK (3.69s)
	      +++ OK, passed 1000 tests.
	    prop_branchView_legal:                          OK (7.66s)
	      +++ OK, passed 1000 tests.
	    prop_view_roundtrips:                           OK (1.25s)
	      +++ OK, passed 1000 tests.
	    prop_viewedFile_rountrips:                      OK (0.04s)
	      +++ OK, passed 1000 tests.
	    prop_b64_roundtrips:                            OK (0.01s)
	      +++ OK, passed 1000 tests.
	    propI_nsitta nTdeasrtdsG
	ro u pisn_ipta:r se:                      OK
	      +++ OK, passed 1000 tests.
	  Unit Tests 
	    add sha1dup:                                      Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (0.70s)
	  add:  fatal: This operation must be run in a work tree
	OK (1.17s)
	
	All 2 tests passed (1.88s)
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.60s)
	    add extras:                                       Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.92s)
	    shared clone:                                     Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	Just "true\n"
	OK (1.16s)
	    log:                                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	+ 2015-09-23 00:39:22 foo | a3f87605-34fc-4df0-9b6d-41c68421378a -- test repo [origin]
	OK (1.38s)
	    import:                                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.48s)
	    reinject:                                         Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (3.38s)
	    unannex (no copy):                                Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.62s)
	    unannex (with copy):                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.82s)
	    drop (no remote):                                 Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (2.46s)
	    drop (with remote):                               Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (2.83s)
	    drop (untrusted remote):                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (4.33s)
	    get:                                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (2.39s)
	    move:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (4.15s)
	    copy:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.72s)
	    lock:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.54s)
	    edit (no pre-commit):                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.34s)
	    edit (pre-commit):                                Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.38s)
	    partial commit:                                   Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.65s)
	    fix:                                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.45s)
	    direct:                                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.33s)
	    trust:                                            Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.70s)
	    fsck (basics):                                    Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Only 1 of 2 trustworthy copies exist of foo
	  Back it up with git-annex copy.
	  Only 1 of 2 trustworthy copies exist of sha1foo
	  Back it up with git-annex copy.
	OK (6.01s)
	    fsck (bare):                                      Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	OK (3.00s)
	    fsck (local untrusted):                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Only these untrusted locations may have copies of foo
	  	a3f87605-34fc-4df0-9b6d-41c68421378a -- test repo [origin]
	   	f2efaa84-2646-4c9f-bb99-593d4f50a077 -- .t\tmprepo5 [here]
	  Back it up to trusted locations with git-annex copy.
	  Only these untrusted locations may have copies of sha1foo
	  	a3f87605-34fc-4df0-9b6d-41c68421378a -- test repo [origin]
	  Back it up to trusted locations with git-annex copy.
	OK (2.72s)
	    fsck (remote untrusted):                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Only 1 of 2 trustworthy copies exist of foo
	  Back it up with git-annex copy.
	  The following untrusted locations may also have copies: 
	  	a3f87605-34fc-4df0-9b6d-41c68421378a -- test repo [origin]
	  Only 1 of 2 trustworthy copies exist of sha1foo
	  Back it up with git-annex copy.
	  The following untrusted locations may also have copies: 
	  	a3f87605-34fc-4df0-9b6d-41c68421378a -- test repo [origin]
	OK (2.66s)
	    fsck --from remote:                               Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.78s)
	    migrate:                                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.29s)
	    migrate (via gitattributes):                      Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.29s)
	    unused:                                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.35s)
	    describe:                                         Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.38s)
	    find:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	foo
	foo
	sha1foo
	sha1foo
	dir/subfile
	OK (3.86s)
	    merge:                                            Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.33s)
	    info:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  bloomfilter capacity too large to represent; falling back to sane value
	{"command":"info","repository mode":"direct","trusted repositories":[],"semitrusted repositories":[{"uuid":"00000000-0000-0000-0000-000000000001","description":"web","here":false},{"uuid":"00000000-0000-0000-0000-000000000002","description":"bittorrent","here":false},{"uuid":"92260d3c-4645-4555-9d3a-db27e4a2d5b2","description":".t\\tmprepo6","here":true},{"uuid":"a3f87605-34fc-4df0-9b6d-41c68421378a","description":"test repo [origin]","here":false}],"untrusted repositories":[],"transfers in progress":[],"available local disk space":"18.9 gigabytes (+1 megabyte reserved)","local annex keys":0,"local annex size":"0 bytes","annexed files in working tree":2,"size of annexed files in working tree":"45 bytes"  bloomfilter capacity too large to represent; falling back to sane value
	,"bloom filter size":"32 mebibytes (0% full)","backend usage":[["SHA1",1],["SHA256E",1]],"success":true}
	OK (1.27s)
	    version:                                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	git-annex version: 5.20150922-g8db87ec
	build flags: Assistant Webapp Webapp-secure Pairing Testsuite S3 WebDAV DNS Feeds Quvi TDFA TorrentParser Database
	key/value backends: SHA256E SHA256 SHA512E SHA512 SHA224E SHA224 SHA384E SHA384 SHA3_256E SHA3_256 SHA3_512E SHA3_512 SHA3_224E SHA3_224 SHA3_384E SHA3_384 SKEIN256E SKEIN256 SKEIN512E SKEIN512 SHA1E SHA1 MD5E MD5 WORM URL
	remote types: git gcrypt S3 bup directory rsync web bittorrent webdav tahoe glacier ddar hook external
	local repository version: 5
	supported repository version: 5
	upgrade supported from repository versions: 2 3 4
	OK (0.90s)
	    sync:                                             Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	To c:/WINDOWS/Temp/git-annex-test/.t\repo

	 * [new branch]      git-annex -> synced/git-annex
	OK (2.07s)
	    union merge regression:                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	To ../../.t\tmprepo7

	 * [new branch]      git-annex -> synced/git-annex
	 * [new branch]      annex/direct/master -> synced/master
	To ../../.t\tmprepo6

	 * [new branch]      git-annex -> synced/git-annex
	 * [new branch]      annex/direct/master -> synced/master
	From ../../.t\tmprepo8

	 * [new branch]      annex/direct/master -> r3/annex/direct/master
	 * [new branch]      git-annex  -> r3/git-annex
	 * [new branch]      master     -> r3/master
	 * [new branch]      synced/master -> r3/synced/master
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/git-annex -> r1/synced/git-annex
	 * [new branch]      synced/master -> r1/synced/master
	From ../../.t\tmprepo8

	 * [new branch]      annex/direct/master -> r3/annex/direct/master
	 * [new branch]      git-annex  -> r3/git-annex
	 * [new branch]      master     -> r3/master
	 * [new branch]      synced/master -> r3/synced/master
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/git-annex -> r2/synced/git-annex
	 * [new branch]      synced/master -> r2/synced/master
	From ../../.t\tmprepo8
	   1d92bda..5cd4935  git-annex  -> r3/git-annex
	From ../../.t\tmprepo7
	   1d92bda..984d05a  git-annex  -> r2/git-annex
	To ../../.t\tmprepo8

	 * [new branch]      git-annex -> synced/git-annex
	To ../../.t\tmprepo7
	   1d92bda..af855ef  git-annex -> synced/git-annex
	OK (11.43s)
	    conflict resolution:                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/master -> r2/synced/master
	Auto-merging conflictor
	CONFLICT (add/add): Merge conflict in conflictor
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	Already up-to-date.
	To ../../.t\tmprepo7
	   8d9b644..9c0eae7  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 8d9b644..9c0eae7
	Fast-forward
	 conflictor => conflictor.variant-75dc | 0
	 conflictor.variant-a507               | 1 +
	 2 files changed, 1 insertion(+)
	 rename conflictor => conflictor.variant-75dc (100%)
	 create mode 120000 conflictor.variant-a507
	error: duplicate parent 9c0eae7fdc6c8ac7a5cc2a1d24089203504fabc3 ignored
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	To ../../.t\tmprepo6
	   9c0eae7..22f03a4  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 9c0eae7..22f03a4
	Fast-forward
	error: duplicate parent 22f03a49919ba1f764b7aa9db3d21ad91c064b1e ignored
	From ../../.t\tmprepo7
	   8d9b644..22f03a4  annex/direct/master -> r2/annex/direct/master
	   9c0eae7..22f03a4  master     -> r2/master
	   9c0eae7..22f03a4  synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   22f03a4..64a2508  annex/direct/master -> synced/master
	conflictor.variant-a507
	conflictor.variant-75dc
	conflictor.variant-a507
	conflictor.variant-75dc
	OK (13.06s)
	    conflict resolution movein regression:            Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	To ../../.t\tmprepo7

	 * [new branch]      git-annex -> synced/git-annex
	 * [new branch]      annex/direct/master -> synced/master
	Auto-merging foo
	CONFLICT (content): Merge conflict in foo
	Automatic merge failed; fix conflicts and then commit the result.
	foo: needs merge
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	To ../../.t\tmprepo6
	   7756f31..3c19bec  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 7756f31..3c19bec
	Fast-forward
	 foo => foo.variant-0b0e | 0
	 foo.variant-bc25        | 1 +
	 2 files changed, 1 insertion(+)
	 rename foo => foo.variant-0b0e (100%)
	 create mode 120000 foo.variant-bc25
	error: duplicate parent 3c19bec6648b84e5a48f94e11d189b106cefb608 ignored
	From ../../.t\tmprepo7
	   3625832..3c19bec  annex/direct/master -> r2/annex/direct/master
	   d555149..e8a7779  git-annex  -> r2/git-annex
	   7756f31..3c19bec  master     -> r2/master
	   7756f31..3c19bec  synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   d555149..e8a7779  git-annex -> synced/git-annex
	   3c19bec..72533e6  annex/direct/master -> synced/master
	OK (13.22s)
	    conflict resolution (mixed directory and file):   Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/master -> r2/synced/master
	Adding conflictor/subfile
	CONFLICT (file/directory): There is a directory with name conflictor in refs/remotes/r2/annex/direct/master. Adding conflictor as conflictor~HEAD
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	Already up-to-date.
	To ../../.t\tmprepo7
	   68c98cb..a7d7ed2  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 68c98cb..a7d7ed2
	Fast-forward
	 conflictor.variant-cc12 | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor.variant-cc12
	error: duplicate parent a7d7ed2364588414684edf8cdabc19dacf51a531 ignored
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	To ../../.t\tmprepo6
	   a7d7ed2..04beb2d  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	conflictor/subfile
	conflictor.variant-cc12
	conflictor/subfile
	conflictor.variant-cc12
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	Adding conflictor/subfile
	CONFLICT (directory/file): There is a directory with name conflictor in HEAD. Adding conflictor as conflictor~refs_remotes_r1_annex_direct_master
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	Already up-to-date.
	To ../../.t\tmprepo6
	   63ee310..70d0a71  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 63ee310..70d0a71
	Fast-forward
	 conflictor => conflictor.variant-cc12 | 0
	 conflictor/subfile                    | 1 +
	 2 files changed, 1 insertion(+)
	 rename conflictor => conflictor.variant-cc12 (100%)
	 create mode 120000 conflictor/subfile
	error: duplicate parent 70d0a71b0c17e118898f325e23f51544086ed2d0 ignored
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   70d0a71..f83c169  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	conflictor/subfile
	conflictor.variant-cc12
	conflictor/subfile
	conflictor.variant-cc12
	OK (19.65s)
	    conflict resolution symlink bit:                  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	To c:/WINDOWS/Temp/git-annex-test/.t\repo
	   792875f..d232adf  git-annex -> synced/git-annex
	   3625832..30c4354  annex/direct/master -> synced/master
	conflictor
	From c:/WINDOWS/Temp/git-annex-test/.t\repo
	   792875f..d232adf  git-annex  -> origin/git-annex
	   3625832..30c4354  master     -> origin/master
	   792875f..d232adf  synced/git-annex -> origin/synced/git-annex
	   3625832..30c4354  synced/master -> origin/synced/master
	Adding conflictor/subfile
	CONFLICT (directory/file): There is a directory with name conflictor in HEAD. Adding conflictor as conflictor~refs_remotes_origin_synced_master
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	To c:/WINDOWS/Temp/git-annex-test/.t\repo
	   d232adf..f9989c0  git-annex -> synced/git-annex
	   30c4354..3f5915b  annex/direct/master -> synced/master
	conflictor/subfile
	From c:/WINDOWS/Temp/git-annex-test/.t\repo
	   792875f..f9989c0  git-annex  -> origin/git-annex
	   3625832..3f5915b  master     -> origin/master
	   792875f..f9989c0  synced/git-annex -> origin/synced/git-annex
	   3625832..3f5915b  synced/master -> origin/synced/master
	Adding conflictor/subfile
	CONFLICT (file/directory): There is a directory with name conflictor in refs/remotes/origin/synced/master. Adding conflictor as conflictor~HEAD
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	To c:/WINDOWS/Temp/git-annex-test/.t\repo
	   f9989c0..105ce76  git-annex -> synced/git-annex
	   3f5915b..a2d447e  annex/direct/master -> synced/master
	conflictor/subfile
	OK (10.25s)
	    conflict resolution (uncommitted local file):     Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	Updating 3625832..bf5c844
	Fast-forward
	 conflictor | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor
	error: duplicate parent bf5c84479371ffe1d182c8eb60edcdfda2a610d0 ignored
	Already up-to-date.
	To ../../.t\tmprepo6
	   bf5c844..24bc935  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	Updating 3625832..1ef3690
	Fast-forward
	 conflictor/file | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor/file
	error: duplicate parent 1ef36903d987fe00ab35bb589ed8a23efe8be184 ignored
	Already up-to-date.
	To ../../.t\tmprepo6
	   1ef3690..6ef9141  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	OK (9.85s)
	    conflict resolution (removed file):               Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	Updating 3625832..91d6c4b
	Fast-forward
	 conflictor | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor
	error: duplicate parent 91d6c4b5073a063724ae80e4625c62f9b855da46 ignored
	Already up-to-date.
	To ../../.t\tmprepo6
	   91d6c4b..ce13cc6  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Already up-to-date!
	Merge made by the 'recursive' strategy.
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   ce13cc6..7a76209  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	CONFLICT (modify/delete): conflictor deleted in refs/heads/synced/master and modified in HEAD. Version HEAD of conflictor left in tree.
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	From ../../.t\tmprepo6
	   91d6c4b..7a76209  annex/direct/master -> r1/annex/direct/master
	   3492af2..3ccdd29  git-annex  -> r1/git-annex
	   ce13cc6..7a76209  master     -> r1/master
	   ce13cc6..7a76209  synced/master -> r1/synced/master
	To ../../.t\tmprepo6
	   3492af2..3ccdd29  git-annex -> synced/git-annex
	   7a76209..d18af4c  annex/direct/master -> synced/master
	Updating 7a76209..d18af4c
	Fast-forward
	 conflictor.variant-0cbf | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor.variant-0cbf
	error: duplicate parent d18af4c5a04b77fb33d05c35ac0517a9931e3f87 ignored
	From ../../.t\tmprepo7
	   ce13cc6..d18af4c  annex/direct/master -> r2/annex/direct/master
	   3ccdd29..c132227  git-annex  -> r2/git-annex
	   7a76209..d18af4c  master     -> r2/master
	   7a76209..d18af4c  synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   3ccdd29..c132227  git-annex -> synced/git-annex
	   d18af4c..15d3d42  annex/direct/master -> synced/master
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	From ../../.t\tmprepo6

	 * [new branch]      annex/direct/master -> r1/annex/direct/master
	 * [new branch]      git-annex  -> r1/git-annex
	 * [new branch]      master     -> r1/master
	 * [new branch]      synced/master -> r1/synced/master
	Updating 3625832..2afb4ed
	Fast-forward
	 conflictor | 1 +
	 1 file changed, 1 insertion(+)
	 create mode 120000 conflictor
	error: duplicate parent 2afb4ed339484dfe29171c1dfdf5722f3a9c2637 ignored
	Already up-to-date.
	To ../../.t\tmprepo6
	   2afb4ed..94291d1  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	To ../../.t\tmprepo6
	   2edfcd0..5c119aa  git-annex -> synced/git-annex
	   94291d1..7450f9b  annex/direct/master -> synced/master
	CONFLICT (modify/delete): conflictor deleted in HEAD and modified in refs/heads/synced/master. Version refs/heads/synced/master of conflictor left in tree.
	Automatic merge failed; fix conflicts and then commit the result.
	conflictor: needs merge
	From ../../.t\tmprepo7

	 * [new branch]      annex/direct/master -> r2/annex/direct/master
	 * [new branch]      git-annex  -> r2/git-annex
	 * [new branch]      master     -> r2/master
	 * [new branch]      synced/master -> r2/synced/master
	To ../../.t\tmprepo7
	   7450f9b..ec6c1f3  annex/direct/master -> synced/master

	 * [new branch]      git-annex -> synced/git-annex
	Updating 7450f9b..ec6c1f3
	Fast-forward
	 conflictor => conflictor.variant-0cbf | 0
	 1 file changed, 0 insertions(+), 0 deletions(-)
	 rename conflictor => conflictor.variant-0cbf (100%)
	error: duplicate parent ec6c1f3715f786da117cbd8f41223d50ad79fed0 ignored
	From ../../.t\tmprepo6
	   2afb4ed..ec6c1f3  annex/direct/master -> r1/annex/direct/master
	   5c119aa..5deda48  git-annex  -> r1/git-annex
	   7450f9b..ec6c1f3  master     -> r1/master
	   7450f9b..ec6c1f3  synced/master -> r1/synced/master
	To ../../.t\tmprepo6
	   5c119aa..5deda48  git-annex -> synced/git-annex
	   ec6c1f3..e9665b7  annex/direct/master -> synced/master
	OK (22.47s)
	    conflict resolution (nonannexed file):            Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (9.00s)
	    conflict resolution (nonannexed symlink):         Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (8.68s)
	    map:                                              Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.54s)
	    uninit:                                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.87s)
	    uninit (in git-annex branch):                     Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	  Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	not supported in direct mode; skipping
	OK (1.44s)
	    upgrade:                                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.16s)
	    whereis:                                          Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (2.87s)
	    hook remote:                                      Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.45s)
	    directory remote:                                 Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (3.61s)
	    rsync remote:                                     Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (4.90s)
	    bup remote:                                       Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (1.17s)
	    crypto:                                     gpg  t e s ting not implemented on Windows
	OK
	    preferred content:                                Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (5.90s)
	    add subdirs:                                      Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	Merge made by the 'recursive' strategy.
	 conflictor.variant-cc12 | 1 +
	 conflictor/subfile      | 1 +
	 2 files changed, 2 insertions(+)
	 create mode 120000 conflictor.variant-cc12
	 create mode 120000 conflictor/subfile
	To c:/WINDOWS/Temp/git-annex-test/.t\repo
	   105ce76..1ca0eb6  git-annex -> synced/git-annex
	   a2d447e..b36279e  annex/direct/master -> synced/master
	"cp": cannot create regular file `..\\.git\\annex\\misctmp\\tmp1116': No such file or directory
	OK (2.81s)
	    addurl:                                           Detected a filesystem without fifo support.
	  Disabling ssh connection caching.
	  Detected a crippled filesystem.
	  Enabling direct mode.
	OK (2.19s)
	
	All 93 tests passed (254.97s)
	+ rm -rf .t
	+ c:/cygwin/bin/rsync git-annex-installer.exe winautobuild@downloads.kitenet.net::winautobuild
	+ c:/cygwin/bin/rsync dist/build-version winautobuild@downloads.kitenet.net::winautobuild
	Archiving artifacts
	IRC notifier plugin: Sending notification to: #git-annex
	Finished: SUCCESS
```
