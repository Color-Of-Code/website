---
published: true
path: "/patterns/gof-observer"
date: "2019-01-02"
title: "GoF: Observer pattern"
tags: ["software", "pattern", "observer", "GoF"]
---
## Observer

### Goal

A subject object, maintains a list of its dependents, called observers, and notifies them automatically of any state changes.

### UML

<a title="Vanderjoe / CC BY-SA (https://creativecommons.org/licenses/by-sa/4.0)" href="https://commons.wikimedia.org/wiki/File:W3sDesign_Observer_Design_Pattern_UML.jpg"><img width="512" alt="W3sDesign Observer Design Pattern UML" src="https://upload.wikimedia.org/wikipedia/commons/0/01/W3sDesign_Observer_Design_Pattern_UML.jpg"></a>

### C#

2 alternatives ([More information here](http://msdn.microsoft.com/en-us/library/ee817669.aspx#observerpattern_topic3b)):

1. Using interfaces like `IObserver` and `IObservable` and make interface calls
2. Use an event in the subject and delegates. Observers register on this event.

The second option is completely integrated in the .NET CLR.
