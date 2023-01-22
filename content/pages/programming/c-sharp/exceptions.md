---
published: true
path: "/programming/c-sharp/exception-handling"
date: "2023-01-14"
title: "C# Exception handling"
tags: ["programming", "csharp", "exception", "handling"]
---

# C# Exception Handling

## Can I ignore exceptions?

No. Exceptions are thrown by the .NET framework in many places, FileNotFoundException, FormatException on conversions, ...
A ThreadInterruptedException may occur at any time. On function calls you might cause a StackOverflowException, on memory allocation
you might get an OutOfMemoryException. If you want or not, you will have to deal with exceptions.

## Exceptions vs Return values

Exceptions are better than return values because they allow to decouple the normal code from the exceptional failure scenarios.
They also allow to handle the exception anywhere on the stack. Return values would require to pass around the value or test for
it after each call. In practice it happens often enough that return codes are just ignored. You cannot ignore exceptions. Return
values won't help you to release resources in case of exceptions, you just leave handles open or could even leak unmanaged resources!

## Keywords: try catch finally throw using

A try block contains the regular code

A catch block is there to handle a specific exception

A finally block gets always called and if often used to dispose resources and other cleanup

A throw allow to trigger an exception or rethrow one (if used inside a catch block)

A using directive

```csharp
using (ResourceType resource = expression)
```

is syntactic sugar for:

```csharp
// C# 3.0
ResourceType resource = expression;
try {
    statement;
}
finally {
    if (resource != null) ((IDisposable)resource).Dispose();
        // or if resource is a value type
        //((IDisposable)resource).Dispose();
}
```

```csharp
// C# 4.0 adds an expansion if resource is a dynamic
ResourceType resource = expression;
IDisposable d = (IDisposable)resource;
try {
    statement;
}
finally {
    if (d != null) d.Dispose();
}
```

NOTE: do not confuse `using` with [`static using` statements for imports](https://learn.microsoft.com/en-us/archive/msdn-magazine/2014/may/csharp-a-csharp-6-0-language-preview#static-using-statements)

## How to rethrow

There is an problem with this code:

```csharp
try {
    // Some code
}
catch (SomeException ex) {
    throw ex;
}
```

The code above destroys the whole callstack information by throwing the exception. You loose the origin of the exception, a very valuable information.

The following code rethrows the exception correctly.

```csharp
    try {
        // Some code
    }
    catch (SomeException ex) {
        throw;
    }
```

In some situations, if you need to add a reinterpretation layer to the exception, never forget to use the constructor taking the original exception as an inner exception. This way you keep trace of all information in a hierachical way.

```csharp
    try {
        // Some code
    }
    catch (SomeException ex) {
        throw new ReinterpretedException("message", ex);
    }
```

## Do's and don'ts while implementing code dealing with exceptions

- Never catch an exception if you really intend to handle it

- Never throw exceptions of the base Exception class

- Never use exceptions instead as a replacement for control flow (performance impact)

- Always catch specific exceptions never items of the base Exception class unless you rethrow

- Know the difference between throw; and throw ex;

## How to implement own exceptions

Mark exceptions as [Serializable]. The exceptions are likely be used accross application domains.

The name of your exception class shall end with "Exception" (naming convention)

Implement at least the four constructors:

```csharp
    [Serializable]
    public class CustomException : Exception {
        public CustomException()
            : base() { }

        public CustomException(string message)
            : base(message) { }

        public CustomException(string message, Exception innerException)
            : base(message, innerException) { }

        protected CustomException(SerializationInfo info, StreamingContext context)
            : base(info, context) { }
    }
```

## Guarantees for exception handling

- *No guarantee*: No care taken to treat exceptions appropriately
- *Basic guarantee*: Ensure class invariants are not broken and no resources are leaked
- *Strong guarantee*: Basic guarantee + either an method modifies an object successfully or not at all.
