---
published: true
path: "/programming/c-sharp/extending-classes"
date: "2020-02-11"
title: "C# Extending classes"
tags: ["programming", "csharp", "class", "extension", "derivation"]
---

## Possible ways to extend a class

*Meaning providing additional methods to a class*

### Extension methods

> "Extension methods enable you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type. Extension methods are a special kind of static method, but they are called as if they were instance methods on the extended type."

From [http://msdn.microsoft.com/en-us/library/bb383977.aspx](http://msdn.microsoft.com/en-us/library/bb383977.aspx)

### Subclass/Derivation

> "Inheritance enables you to create new classes that reuse, extend, and modify the behavior that is defined in other classes. The class whose members are inherited is called the base class, and the class that inherits those members is called the derived class."

From [http://msdn.microsoft.com/en-us/library/ms173149.aspx](http://msdn.microsoft.com/en-us/library/ms173149.aspx)

**NOTE**: A derived class shall always implement an "is-a" relationship. If you cannot say that the derived class is a special case of the base class, then better drop the idea of deriving it from this base class.

### Static class methods

> "Static classes and class members are used to create data and functions that can be accessed without creating an instance of the class. Static class members can be used to separate data and behavior that is independent of any object identity: the data and functions do not change regardless of what happens to the object."

From [http://msdn.microsoft.com/en-us/library/79b3xss3.aspx](http://msdn.microsoft.com/en-us/library/79b3xss3.aspx)

## Properties

### Extension methods

- extending closed source 3rd party
- extension of iEnumerable for LINQ
- keeps the original class code clean
- good readability
- pitfall: if a method with the same name as the extension gets added to the extended class then this method is called instead of the extension without the compiler warning about it.

### Subclass/Derivation

- impossible if class is sealed
- must implement an "is-a" relationship

### Static class methods

- functionally exactly the same as an extension method (only a syntactical difference)
