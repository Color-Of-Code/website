---
published: true
path: "/programming/c-sharp/string-builder"
date: "2020-01-26"
title: "StringBuilder"
tags: ["programming", "csharp", "string", "builder"]
---

## C# and performance of string building

### Introduction

Strings are immutable in C#. That means that a string never gets modified by any operation. This implies that, when you call Replace for example the operation is never done in-place. Instead a new string containing the replaced parts is built and returned. It has a huge impact on performance if you manipulate big strings that are assembled from many small parts.

### Example

Let's assume you want to generate a document on the fly built depending on many internal variables. This string is returned by your method.

#### Wrong way of solving the problem

If you choose to create an initial string and concatenate the changes at each step, then your solution will be rather slow.

```csharp
string s = string.empty;
s = s + "New data ";         // the resulting s has to be newly allocated!
...
s = s + " some other data."; // new memory allocated here!
...
return s;
```

On each step a new string will be created (strings are immutable)

#### Better solution

Prefer in such case using the StringBuilder. It is much faster when it comes to handling a lot of small appends to a string. The StringBuilder pattern is well known in Java. Generally you need such a pattern each time the string is immutable to compensate the missing in-place modification

```csharp
var s = new StringBuilder();
s.Append("New data ");
...
s.Append(" some other data.");
...
return s.ToString();
```

### Rationale

That strings are immutable is not a drawback or design flaw. It is a design choice that provides an easier per-value comparison operator and better thread safety. If a string object is passed around, it is guaranteed to always hold the same value. A thread having a look at it later will still see the same value than a few minutes ago. This saves from heavy locking mechanisms at nearly no additional cost because even if the transformation were in-place, it still would have to check for reallocations of memory if the buffer is not big enough and in that case also allocate a new buffer.

### Conclusion

The `StringBuilder` is a handy class that you definitively should use when you build strings from many parts.
