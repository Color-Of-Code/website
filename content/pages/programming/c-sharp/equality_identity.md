---
published: true
path: "/programming/c-sharp/equality-identity"
date: "2020-10-05"
title: "C# equality vs identity"
tags: ["programming", "csharp", "equality", "identity"]
---

# C# Equality vs Identity

## Reference

[Microsoft: Guidelines for Overriding Equals() and Operator ==](http://msdn.microsoft.com/en-us/library/ms173147.aspx)

## Pay attention

* Equality means the objects have the **same value**, but are not necessarily the same instance
* Identity means the objects point to the one and **same object**: reference equality

## Different equality functions

* operator `==()`
* `Equals()` or static `Object.Equals()` use for **equality** checks
* `ReferenceEquals()`, use for **identity** checks

Signatures:

```csharp
public virtual bool Equals(Object obj);
public static  bool Equals(Object objA, Object objB);
public static  bool ReferenceEquals(Object objA, Object objB);
public static  bool operator ==(T objA, T objB);
```

> They might all yield different results! Follow these rules for consistent behaviour.

## Golden rules

* If you want to know if two objects refer to the same instance **USE ONLY** `ReferenceEquals`
* Only override **operator `==()`** for immutable types, then you also have to override **operator `!=()`**
* Otherwise prefer the static `Object.Equals` solution as it handles derivation and null pointers
* Override `Equals()` if you implement `IComparable`

## Implementing Equals

Let's say T is the type you are implementing Equals for and `t1`, `t2`, `t3` objects, Equals shall ensure that

* `t1.Equals(t1) == true`
* `t1.Equals(t2) == t2.Equals(t1)`
* `t1.Equals(null) == false`
* if `t1.Equals(t2)` and `t2.Equals(t3)` then `t1.Equals(t3)`
* `Equals` shall not throw exceptions

Recommendations:

* Also override `GetHashCode()`
* Beside `Equals(Object obj)`, implement `Equals(YourType obj)` for better performance
* Call base class `Equals()` before going on with own member comparison

## Implementing operator `==()`

* Gotcha: Do not use `==` inside the `==` operator implementation!
* Only implement for immutable types (data contained in the instance cannot be changed)
* Also implement operator `!=()`
* Also provide the **SAME** functionality inside the implementation of `Equals`.

## Main differences

* The operator `==()`
  * Means reference equality in general (except for value types)
  * Two instances are always different by default (you need to override operator `==()` )
  * Is **statically bound**! Take care about **which** `==()` is called if you have derived classes!

* The `Equals()` method
  * Is dynamically resolved (virtual chain)
  * Might yield asymmetric results (`x.Equals(y)` different from `y.Equals(x)`)
  * For `struct`s a member comparison is made by default
  * throws an exception if the left side is null (that's why the static variant is better)

## Conclusion

Once you clearly separate value types from object types in your mind you got it. That's all quite logical and easy in the end, but always remember that the base types are immutable by default. This means for example that once a string got created, it remains the same for its lifetime. A concatenation triggers the creation of a new string and never modifies the original object. The same occurs with the famous `DateTime.AddDays()` gotcha. `AddDays()` returns a new DateTime, does not modify the object it is called (the method name is quite misleading).
