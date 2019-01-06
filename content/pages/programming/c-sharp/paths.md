---
published: true
path: "/programming/c-sharp/path-handling"
date: "2018-12-28"
title: "C# Path Handling"
tags: ["programming", "csharp", "path", "handling", "TODO_cleanup"]
---

# Absolute and relative path manipulation

## Assembly (reference)

```csharp
System
```

## Using directive

```csharp
using System.IO;
```

## Code to convert to an absolute path

Converts path to an absolute path relatively to the basePath. The code also works properly if the path is already absolute. If the basePath is not provided and the path is relative, the original relative path is returned. This behaviour can be easily modified.

```csharp
public static String ToAbsolutePath(String basePath, String path) {
	if (String.IsNullOrEmpty(path))
		return null;
	if (String.IsNullOrEmpty(basePath))
		return path;

	Uri path2 = new Uri(path, UriKind.RelativeOrAbsolute);
	if (path2.IsAbsoluteUri)
		return path;
	Uri basePath = new Uri(basePath + "/", UriKind.Absolute);
	Uri absPath = new Uri(basePath, path);
	return absPath.LocalPath;
}
```


## Code to convert to a relative path

Similarly this code converts path to a path relative to basePath, if possible. Note the Uri.UnescapeDataString call to avoid issues with spaces or special characters in paths.

```csharp
public static String ToRelativePath(String basePath, String path) {
	if (String.IsNullOrEmpty(path))
		return null;
	if (String.IsNullOrEmpty(basePath))
		return path;

	Uri uri1 = new Uri(path, UriKind.RelativeOrAbsolute);
	if (uri1.IsAbsoluteUri)
	{
		Uri uri2 = new Uri(basePath + "/", UriKind.Absolute);
		Uri relativeUri = uri2.MakeRelativeUri(uri1);
		return Uri.UnescapeDataString(relativeUri.ToString()).Replace('/', Path.DirectorySeparatorChar);
	}
	// else it is already a relative path
	return path;
}
```
