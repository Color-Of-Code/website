---
published: true
path: "/patterns/gof-visitor"
date: "2019-01-02"
title: "GoF: Visitor pattern"
tags: ["software", "pattern", "visitor", "TODO_cleanup"]
---
# Visitor

## Goals

Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

This pattern usually makes use of a double dispatch mechanism to:

* avoid the visitor to have knowledge about the element structure for visiting it
* avoid the element to have knowledge about the operation the visitor performs

## UML

{{http://upload.wikimedia.org/wikipedia/en/thumb/7/7f/VisitorClassDiagram.svg/500px-VisitorClassDiagram.svg.png?500x445}}

## C#
