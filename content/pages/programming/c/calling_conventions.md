---
published: true
path: "/programming/c/calling-convention"
date: "2019-01-02"
title: "Calling Conventions"
tags: ["programming", "calling convention"]
---

## Calling Conventions

A calling convention defines how data exchange is handled during a function call between a caller and callee.

* How/where parameters are stored and in which order
* Who is responsible of cleaning up the storage area for the parameters
* How/where the return result of the call is stored

These are only the most common ones that you are likely to face when having trouble with interoperability (using a C/C++ dll from .NET for example). Note that there are differences among languages and compilers for the type definition. When interoperating think of the right sizes for the parameters and the right marshalling/unmarshalling if needed. When done badly mismatching conventions result in crashes mostly due to stack corruption. If your program crashes and has weird behavior after a call to another DLL function, this is likely the problem you have!

## cdecl

* Arguments are passed from right to left, and placed on the stack.
* Stack cleanup is performed by the caller.

| +   |  -  |
| --- | --- |
| can be used for variable argument function calls | additional code at each call site |

## stdcall

* Arguments are passed from right to left, and placed on the stack.
* Stack cleanup is performed by the called function.

| +   |  -  |
| --- | --- |
| smaller binary size | cannot be used for variable argument function calls |

## fastcall

* Some arguments are placed into registers. The rest of them are pushed on the stack from right to left.
* Arguments are popped from the stack by the called function.

| +   |  -  |
| --- | --- |
| fast calls  | not portable |

## thiscall

* Arguments are passed from right to left, and placed on the stack. this is placed into a register.
* Stack cleanup is performed by the called function.

| +   |  -  |
| --- | --- |
| used for OOP languages in C++ | - |

## Compiler specification

How to tell the compiler what calling convention is used is highly compiler dependent. Look at the documentation of your compiler for that. Here is a table for the compilers I am using, feel free to help me enlarging the list.

| Compiler/Language | cdecl                        | stdcall                        | fastcall                        | thiscall                        |
| ----------------- | ---------------------------- | ------------------------------ | ------------------------------- | ------------------------------- |
| gcc               | `__attribute__((__cdecl__))` | `__attribute__((__stdcall__))` | `__attribute__((__fastcall__))` | `__attribute__((__thiscall__))` |
| MSVC              | `__cdecl`                    | `__stdcall`                    | `__fastcall`                    | `__thiscall`                    |

.NET (C#, F#, VB, ..)

```csharp
Attribute: DllImport(..., CallingConvention=CallingConvention.Cdecl)
Attribute: DllImport(..., CallingConvention=CallingConvention.StdCall)
Attribute: DllImport(..., CallingConvention=CallingConvention.FastCall)
Attribute: DllImport(..., CallingConvention=CallingConvention.ThisCall)
```

NOTE: FastCall is defined but not supported by the .NET environment.

## Interoperability and name decoration

Name decoration or name mangling is unfortunately highly compiler dependent. The exported function names are decorated. Modifications to the original symbol (function, namespace, ...) name are introduced. Name decoration or mangling schemes vary a lot. You want to know more? Check this wikipedia link.

To check what the real (undecorated) names are you can:

* under windows, use Dll Export Viewer.
* under linux, use nm without the `--demangle` option

Mangling schemes by example for different languages and compilers.

## Special notes

When using the ellipsis operator (variable number of arguments) in C/C++, the calling convention is cdecl no matter what you specify. This is because only the caller knows for sure how many arguments are passed to the stack.

To avoid C++ name mangling when using a C++ compiler use `extern "C"`.
