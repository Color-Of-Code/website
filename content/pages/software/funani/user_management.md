---
published: true
path: "/funani/user-management"
date: "2019-01-01"
title: "Funani: User Management"
tags: ["funani", "user", "management", "TODO_cleanup"]
---
# User Management

## Rationale

Users must be declared and registered on the system to be able to access and record data on the system. Anonymous access can be granted to some extent with the exception of persisting all features and settings related to specific users (like recording rating of data, ...)

## Introduction

One special user that is always defined is the administrator or root user. This user owns all rights.

A user session begins once an user has authenticated himself to the server. It ends on explicit logout or when the server did not receive any command during a predetermined amount of time.

After successful authentication, the client receives a session token that must be given to the server for each transaction. If the token is not valid anymore, a login dialog shall appear to the client.

## Table of users

All users known by the system are stored in a single table. The table contains the id of the user, his login name and his password as a checksum.

The core user table contains only the data needed for authentication and confirmation beside a display name:


* user id
* user login name
* user password (SHA1)
* user real name
* user email address
* last login timestamp
* created timestamp
* modified timestamp

## Table of groups

Groups are listed by name and have associated rights. The rights are handled using the Acl feature of cakephp (acos and aros).


*  group id

*  group name

*  created timestamp

*  modified timestamp

A user belongs to a group and a group has many users. This simplified handling compared to a many to many relationship.

##  Authentication 

The core authentication module from cakephp is used. The passwords are hashed values with a salt value what makes guessing without knowing the salt value difficult, even if the hashed password are robbed in some way.

The server compares this value to his locally computed checksum value. If they match, the client receives a token for identifying himself. The server never stores the clear text password.

Cakephp's authentication module is a widely and well tested component.

##  ACL 

Access control lists (ACL) are handled using the Acl component of cakephp. This is a robust and well tested component, so no need to reinvent the wheel here.
