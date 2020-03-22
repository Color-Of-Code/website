---
published: true
path: "/patterns/gof-visitor"
date: "2019-01-02"
title: "GoF: Visitor pattern"
tags: ["software", "pattern", "visitor", "GoF"]
---

## Visitor

### Goals

Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

This pattern usually makes use of a double dispatch mechanism to:

* avoid the visitor to have knowledge about the element structure for visiting it
* avoid the element to have knowledge about the operation the visitor performs

### UML

<a title="Giacomo Ritucci / CC BY-SA (http://creativecommons.org/licenses/by-sa/3.0/)" href="https://commons.wikimedia.org/wiki/File:Visitor_UML_class_diagram.svg"><img width="512" alt="Visitor UML class diagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Visitor_UML_class_diagram.svg/512px-Visitor_UML_class_diagram.svg.png"></a>

### C#
