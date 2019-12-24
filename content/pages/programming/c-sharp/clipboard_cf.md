---
published: true
path: "/programming/c-sharp/clipboard-format"
date: "2018-12-28"
title: "C# Clipboard Custom Format"
tags: ["programming", "csharp", "format", "clipboard"]
---

## Clipboard custom format

### CF_HTML HTML Clipboard format

Code to convert a standard valid HTML string into CF_HTML, the clipboard representation of HTML

```csharp
public static string ConvertToHtmlFragment (string fragment)
{
  const String MARKER_BLOCK =
    "Version:1.0\r\n" +
    "StartHTML:{0,8}\r\n" +
    "EndHTML:{1,8}\r\n" +
    "StartFragment:{2,8}\r\n" +
    "EndFragment:{3,8}\r\n" +
    "StartSelection:{2,8}\r\n" +
    "EndSelection:{3,8}\r\n" +
    "{4}";
  int prefixLength = String.Format (MARKER_BLOCK, 0, 0, 0, 0, "").Length;
  const String DEFAULT_HTML_BODY =
    "`<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">`" +
    "`<HTML>``<HEAD>``</HEAD>``<BODY>``<!--StartFragment-->`{0}`<!--EndFragment-->``</BODY>``</HTML>`";
  string html = String.Format (DEFAULT_HTML_BODY, fragment);
  int startFragment = prefixLength + html.IndexOf (fragment);
  int endFragment = startFragment + fragment.Length;
  return String.Format (MARKER_BLOCK, prefixLength, prefixLength + html.Length, startFragment, endFragment, html);
}
```
