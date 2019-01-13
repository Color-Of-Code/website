---
published: true
path: "/programming/dxl/syntax"
date: "2019-01-07"
title: "DOORS DXL"
tags: ["programming", "doors", "dxl"]
---

# DOORS DXL

## Tips

Deactivation of (dangerous) the auto-declaration feature (put it for example in `startup.dxl`)

```c
XFLAGS_ &= ~AutoDeclare_
```

## Pitfalls

### Beware of functions with string parameter

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

### Memory footprint (string table)

Avoid string concatenation, like:

```c
"stra" " strb"
```

it adds entries to the global string table which keeps increasing in size. There is no way to free entries from the global string table. Only closing a DOORS session will end up in freeing the memory.


