---
published: true
path: "/programming/c-sharp/numeric-promotions"
date: "2019-01-01"
title: "C# numeric promotions"
tags: ["programming", "csharp", "numeric", "promotion", "TODO_cleanup"]
---

Promotion rules are in some situations quite tricky to understand. Here is the list of applied rules so the situations where an explicit cast is needed get clarified.

# From ECMA-334

## 14.2.6.1 Unary numeric promotions

Unary numeric promotion occurs for the operands of the predefined `+`, `--`, and `~` unary operators. Unary numeric promotion simply consists of converting operands of type `sbyte`, `byte`, `short`, `ushort`, or `char` to type `int`. Additionally, for the unary `--` operator, unary numeric promotion converts operands of type`uint` to type `long`.

## 14.2.6.2 Binary numeric promotions

Binary numeric promotion occurs for the operands of the predefined `+`, `--`, `*`, `/`, `%`, `&`, `|`, `^`, `==`, `!=`, `>`, `<`, `>=`, and `<=` binary operators. Binary numeric promotion implicitly converts both operands to a common type which, in case of the non-relational operators, also becomes the result type of the operation. Binary numeric promotion consists of applying the following rules, in the order they appear here:

* If either operand is of type `decimal`, the other operand is converted to type `decimal`, or a compile-time error occurs if the other operand is of type `float`or `double`.

* Otherwise, if either operand is of type `double`, the other operand is converted to type `double`.

* Otherwise, if either operand is of type `float`, the other operand is converted to type `float`.

* Otherwise, if either operand is of type `ulong`, the other operand is converted to type `ulong`, or a compile-time error occurs if the other operand is of type `sbyte`, `short`, `int`, or `long`.

* Otherwise, if either operand is of type `long`, the other operand is converted to type `long`.

* Otherwise, if either operand is of type `uint` and the other operand is of type `sbyte`, `short`, or `int`, both operands are converted to type `long`.

* Otherwise, if either operand is of type `uint`, the other operand is converted to type `uint`.

* Otherwise, both operands are converted to type `int`.

[Note: The first rule disallows any operations that mix the `decimal` type with the `double` and `float` types. The rule follows from the fact that there are no implicit conversions between the`decimal` type and the `double` and `float` types. end note]

[Note: Also note that it is not possible for an operand to be of type `ulong` when the other operand is of a signed integral type. The reason is that no integral type exists that can represent the full range of `ulong` as well as the signed integral types. end note]

In both of the above cases, a cast expression can be used to explicitly convert one operand to a type that is compatible with the other operand.
