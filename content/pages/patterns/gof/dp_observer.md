---
published: true
path: "/patterns/gof-observer"
date: "2019-01-02"
title: "GoF: Observer pattern"
tags: ["software", "pattern", "observer", "TODO_cleanup"]
---
# Observer

## Goal

A subject object, maintains a list of its dependents, called observers, and notifies them automatically of any state changes.

## UML

{{http://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/500px-Observer.svg.png|Observer pattern}}
}

## C#

2 alternatives ([More information here](http://msdn.microsoft.com/en-us/library/ee817669.aspx#observerpattern_topic3b)):

1. Using interfaces like `IObserver` and `IObservable` and make interface calls
2. Use an event in the subject and delegates. Observers register on this event.

The second option is completely integrated in the .NET CLR.
