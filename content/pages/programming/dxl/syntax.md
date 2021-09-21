---
published: true
path: "/programming/dxl/syntax"
date: "2021-09-16"
title: "DOORS DXL"
tags: ["programming", "doors", "dxl"]
---

## DOORS DXL

### Tips

Deactivation of (dangerous) the auto-declaration feature (put it for example in `startup.dxl`)

```c
XFLAGS_ &= ~AutoDeclare_
```

### Documentation

* https://www.ibm.com/docs/en/ermd/9.7.2?topic=function-extending-doors-dxl
* https://www.ibm.com/docs/en/SSYQBZ_9.7.2/com.ibm.doors.requirements.doc/topics/dxl_reference_manual.pdf

### Pitfalls

#### Beware of functions with string parameter

Functions that have only one string as parameter **IGNORE** the parenthesis. This often leads to unwanted and unexpected side effects.

A famous example of this behavior:

```c
string sA = "upper"
string sB = "lower"
print upper(sA) " " sB
```

yields unexpectedly:

```
"UPPER LOWER"
```

instead of what was intended:

```
"UPPER lower"
```

workaround, use parenthesis:

```c
print (upper(sA)) " " sB
```

#### Memory footprint (string table)

Avoid string concatenation, like:

```c
"stra" " strb"
```

Memory de-allocation is not automatic for the dynamic types Skip, Array, Buffer, DB, OleAutoArgs, IPC and Stat. Repeated use of these types can consume memory and reduce performance of DOORS. You must explicitly de-allocate memory used by these variables. This means that you should have a `delete()` or `destroy()` function call for every `create()` function call in your program.

**NOTE:** There is no function for de-allocating memory used by string variables. Every new string declared or constructed in DXL is added to the “string table”. The memory used by the string table is not released until the DOORS session is terminated.

Memory being consumed by the string table is a particular problem in scripts such as Layout DXL that are run many times.

Source and more details: http://www.smartdxl.com/content/?p=481

Additional hints from that page:

* undocumented `string tempStringOf(Buffer)`
* string space is released if the DXL is executed within an eval_() command
