---
published: true
path: "/programming/c-sharp/stopwatch"
date: "2018-12-30"
title: "Stopwatch"
tags: ["programming", "csharp", "stopwatch"]
---

## C# Stopwatch

### Assembly (reference)

```csharp
System
```

### Using directive

```csharp
using System.Diagostics;
```

### Code

```csharp
var watch = new Stopwatch();
// ...
watch.Start();
// ... execute the first task to be timed
watch.Stop();

watch.Restart(); // reset and starts again (.NET 4.0)
// ... execute the next task to be timed
watch.Stop();

// results
Console.WriteLine("Elapsed: {0}",         watch.Elapsed);
Console.WriteLine("In milliseconds: {0}", watch.ElapsedMilliseconds);
Console.WriteLine("In timer ticks: {0}",  watch.ElapsedTicks);
```

### Note

```csharp
var watch = new Stopwatch();
watch.Start();
```

is equivalent to

```csharp
var watch = Stopwatch.StartNew();
```
