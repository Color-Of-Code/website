---
published: true
path: "/programming/c-sharp/string-format"
date: "2018-12-27"
title: "C# String formatting"
tags: ["programming", "csharp", "format", "string", "TODO_cleanup"]
---

# C# String formatting

**Formatting is bound to a type**, so depending on which type of object you pass to String.Format, you have different format specifiers.

The index specifies the position of the parameter that shall be used for that format specifier. It can be repeated!

When implementing custom formatting, try to stick to this behavior for being consistent with the default implementation.

* Generic, alignment is applied after type formatting, so can be used for all types
  * `{index[,alignment][:format]}`

* For numerical values (; separator):
  * `{index[,alignment]:format >= 0;format < 0}`
  * `{index[,alignment]:format > 0;format < 0;format = 0}`

## Pitfalls and gotchas

Pitfalls for specific types are illustrated at the bottom of the type specific parts. Generally speaking, the biggest gotcha is that you should **use the invariant culture if you want to have culture independent output**. This matters a lot for serialization, because ToString() might yield different results depending on the culture of the current thread.

## String

Alignment is the only formatting you can apply to a string but it works for all types. [Object := **Text** (String)]

| Description | Format    | US culture   | DE culture   |
| ----------- | --------- | ------------ | ------------ |
| left align  | `{0,-10}` | `Text......` | `Text......` |
| right align | `{0,10}`  | `......Text` | `......Text` |
| normal      | `{0}`     | `Text`       | `Text`       |

**Gotcha 1:** `{` must be escaped if you want to output it!
Outputting `if (...) {` yields a `System.FormatException`. The correct way is to use `if (...) {{`.

## Generic numeric values (conventions)

* 0    zero placeholder
* #    digit placeholder
* .    decimal point
* ,    thousand separator
* %    multiplies by 100, adds % sign
* ‰    multiplies by 100, adds ‰ sign ('\u2030')
* e    exponent placeholder

## Integer types

Integer patterns [Object := **1234** (Int32)]

| Description      | Format        | US culture | DE culture |
| ---------------- | ------------- | ---------- | ---------- |
| default          | `{0}`         | 1234       | 1234       |
| zero placeholder | `{0:0,000.0}` | 1,234.0    | 1.234,0    |
| digit placeholder | `{0:(#) #-##}` | (1) 2-34  | (1) 2-34  |
| decimal | `{0:D}` | 1234  | 1234  |
| decimal 6 digits (leading zeroes) | `{0:D6}` | 001234  | 001234 |
| hexadecimal (lowercase) | `{0:x}` |  4d2  | 4d2  |
| hexadecimal (lowercase) 4 digits (leading zeroes) | `{0:x4}` | 04d2 | 04d2  |
| hexadecimal (uppercase) | `{0:X}` | 4D2  | 4D2  |
| hexadecimal (uppercase) 5 digits (leading zeroes) | `{0:X5}` | 004D2 | 004D2  |

**Gotcha 1:** `#` is a placeholder, not detecting fractional part!
 | `
{0:#.##}
`|`
1234
`|`
1234
`|
 | -> correct: use digit placeholders (if you want 2 fractional digits) | ` |
 | -------------------------------------------------------------------- | --- |
{0:0.00}
`|`
1234.00
`|`
1234,00
`|
 | **Gotcha 2:** with '#' digits are filled in from right to left! | ` |
 | --------------------------------------------------------------- | --- |
{0:#-##-##}
`|`
-12-34
`|`
-12-34
`|
 | **Gotcha 3:** ',' only specifies thousand separator shall be used but not where! | ` |
 | -------------------------------------------------------------------------------- | --- |
{0:0,0}
`|`
1,234
`|`
1.234
`|

## Floating point types

Double, Float used for scientific notation or currency output.

TO BE DONE (visit us again later, ...)

## Enumerated types

	g, G    display the enum as text if Flags attribute or single value
	f, F    display the enum as text (finds a matching sum), if fails falls back to integer
	d, D    decimal value display (no leading zeroes)
	x, X    hexadecimal value display with at least 8 digits


TO BE DONE: examples of output with Flags, ... (give us a visit later again, ...)

## Date/Time - Generic Patterns

DateTime patterns [Object := **2009-10-24T13:47:32.0534529** (DateTime)]

| Description                  | Format  | US culture                            | DE culture                         |
| ---------------------------- | ------- | ------------------------------------- | ---------------------------------- |
| default                      | `{0}`   | 10/24/2009 1:47:32 PM                 | 24.10.2009 13:47:32                |
| short date                   | `{0:d}` | 10/24/2009                            | 24.10.2009                         |
| long date                    | `{0:D}` | Saturday, October 24, 2009            | Samstag, 24. Oktober 2009          |
| short time                   | `{0:t}` | 1:47 PM                               | 13:47                              |
| long time                    | `{0:T}` | 1:47:32 PM                            | 13:47:32                           |
| full date & time             | `{0:f}` | Saturday, October 24, 2009 1:47 PM    | Samstag, 24. Oktober 2009 13:47    |
| full date & time (long)      | `{0:F}` | Saturday, October 24, 2009 1:47:32 PM | Samstag, 24. Oktober 2009 13:47:32 |
| default date & time          | `{0:g}` | 10/24/2009 1:47 PM                    | 24.10.2009 13:47                   |
| default date & time (long)   | `{0:G}` | 10/24/2009 1:47:32 PM                 | 24.10.2009 13:47:32                |
| month day pattern            | `{0:M}` | October 24                            | 24 Oktober                         |
| year month pattern           | `{0:y}` | October, 2009                         | Oktober 2009                       |
| RFC1123 date string          | `{0:r}` | Sat, 24 Oct 2009 13:47:32 GMT         | Sat, 24 Oct 2009 13:47:32 GMT      |
| Round-trip date/time pattern | `{0:o}` | 2009-10-24T13:47:32.0534529           | 2009-10-24T13:47:32.0534529        |
| sortable date string         | `{0:s}` | 2009-10-24T13:47:32                   | 2009-10-24T13:47:32                |
| universal sortable           | `{0:u}` | 2009-10-24 13:47:32Z                  | 2009-10-24 13:47:32Z               |

**Gotcha 1:** 'U' is broken! | `     |
{0:U}
`|Saturday, October 24, 2009 11:47:32 AM|Samstag, 24. Oktober 2009 11:47:32|

## Date/Time - Custom Patterns

DateTime custom patterns [Object := **2009-10-24T13:47:32.0534529** (DateTime)]

 | Description | Format | US culture | DE culture |
 | ----------- | ------ | ---------- | ---------- |
 | day (01-31) | `    |
{0:dd}
`|24|24|
 | day name (short) | ` |
 | ---------------- | --- |
{0:ddd}
`|Sat|Sa|
 | full day name | ` |
 | ------------- | --- |
{0:dddd}
`|Saturday|Samstag|
 | month (01-12) | ` |
 | ------------- | --- |
{0:MM}
`|10|10|
 | month name (short) | ` |
 | ------------------ | --- |
{0:MMM}
`|Oct|Okt|
 | full month name | ` |
 | --------------- | --- |
{0:MMMM}
`|October|Oktober|
 | 2 digits year | ` |
 | ------------- | --- |
{0:yy}
`|09|09|
 | 4 digits year | ` |
 | ------------- | --- |
{0:yyyy}
`|2009|2009|
 | Era AD/BC | ` |
 | --------- | --- |
{0:gg}
`|A.D.|n. Chr.|
 | 2 digit hour (00-11) | ` |
 | -------------------- | --- |
{0:hh}
`|01|01|
 | 2 digit hour (00-23) | ` |
 | -------------------- | --- |
{0:HH}
`|13|13|
 | AM/PM | ` |
 | ----- | --- |
{0:tt}
`|PM| |
 | Timezone offset, 2 digits | ` |
 | ------------------------- | --- |
{0:zz}
`|+02|+02|
 | Full timezone offset | ` |
 | -------------------- | --- |
{0:zzz}
`|+02:00|+02:00|
 | minutes (00-59) | ` |
 | --------------- | --- |
{0:mm}
`|47|47|
 | seconds (00-59) | ` |
 | --------------- | --- |
{0:ss}
`|32|32|
 | 1/100 seconds (00-99) | ` |
 | --------------------- | --- |
{0:ff}
`|05|05|
 | milliseconds (000-999) | ` |
 | ---------------------- | --- |
{0:fff}
`|053|053|
 | microseconds | ` |
 | ------------ | --- |
{0:ffffff}
`|053452|053452|
 |                                 |        |  |  | 
 |                                 |        |  |  | 
 | **Gotcha 1:** 'mm' are minutes! | `
{0:dd/mm/yyyy}
`|24/47/2009|24.47.2009|
 | -> correct: 'MM' | ` |
 | ---------------- | --- |
{0:dd/MM/yyyy}
`|24/10/2009|24.10.2009|
 | **Gotcha 2:** '/' is locale dependent | ` |
 | ------------------------------------- | --- |
{0:dd/MM/yyyy}
`|24/10/2009|24.10.2009|
 | -> correct: use apostrophe ' | ` |
 | ---------------------------- | --- |
{0:dd'/'MM'/'yyyy}
`|24/10/2009|24/10/2009|
