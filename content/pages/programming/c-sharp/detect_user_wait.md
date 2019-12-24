---
published: true
path: "/programming/c-sharp/detect-waiting-for-user-input"
date: "2019-12-21"
title: "C# Detect if a process needs user input"
tags: ["programming", "csharp", "user", "input", "blocked"]
---

## C# Detect application wants user input

### Problem description

Some time ago,[I asked a question on stackoverflow.com.](https://stackoverflow.com/questions/1404658/find-out-programmatically-if-a-process-is-demanding-user-input) How to programmatically (C#) determine, if ANOTHER external application (native, java, .NET or whatever...) is currently demanding user input? Could this be done fully in Managed code? What would be the implementation of

```csharp
static Boolean IsDemandingUserInput(String processName)
```

By **demanding user input** I mean, when an application asks the user to enter some data or quit an error message (Modal dialog) and is not able to perform its normal tasks anymore. A drawing application that is waiting for the user to draw something is not meant here. The question seems to interest a lot of people but so far I got no answer that satisfied my needs, despite some great and competent people there.

As the problems I want to solve are more of practical and not theoretical nature, I started to implement a solution. This one at least detects many of the situations inside a running application I want to be informed about.

### Solution (partial)

I worked out a solution that seems to work, please notify me in case of problems with this code so I also gain benefit of improvements. It works for Excel as far as I tested. The only issue I dislike is that I had to use unmanaged calls. It also handles the case when an application is based on a dialog like for MFC, derived from CDialog. Unfortunately I could not find a pure managed solution. Do you have better ideas?

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Threading;
using System.Diagnostics;

namespace Util
{
  public class ModalChecker
  {
    public static Boolean IsWaitingForUserInput(String processName)
    {
      Process[] processes = Process.GetProcessesByName(processName);
      if (processes.Length == 0)
        throw new Exception("No process found matching the search criteria");
      if (processes.Length > 1)
        throw new Exception("More than one process found matching the search criteria");
      // for thread safety
      ModalChecker checker = new ModalChecker(processes[0]);
      return checker.WaitingForUserInput;
    }

    #region Native Windows Stuff
    private const int WS_EX_DLGMODALFRAME = 0x00000001;
    private const int GWL_EXSTYLE = (-20);
    private delegate int EnumWindowsProc(IntPtr hWnd, int lParam);
    [DllImport("user32")]
    private extern static int EnumWindows(EnumWindowsProc lpEnumFunc, int lParam);
    [DllImport("user32", CharSet = CharSet.Auto)]
    private extern static uint GetWindowLong(IntPtr hWnd, int nIndex);
    [DllImport("user32")]
    private extern static uint GetWindowThreadProcessId(IntPtr hWnd, out IntPtr lpdwProcessId);
    #endregion

    // The process we want the info from
    private Process _process;
    private Boolean _waiting;

    private ModalChecker(Process process)
    {
      _process = process;
      _waiting = false; //default
    }

    private Boolean WaitingForUserInput
    {
      get
      {
        EnumWindows(new EnumWindowsProc(this.WindowEnum), 0);
        return _waiting;
      }
    }

    private int WindowEnum(IntPtr hWnd, int lParam)
    {
      if (hWnd == _process.MainWindowHandle)
        return 1;
      IntPtr processId;
      GetWindowThreadProcessId(hWnd, out processId);
      if (processId.ToInt32() != _process.Id)
        return 1;
      uint style = GetWindowLong(hWnd, GWL_EXSTYLE);
      if ((style & WS_EX_DLGMODALFRAME) != 0)
      {
        _waiting = true;
        return 0; // stop searching further
      }
      return 1;
    }
  }
}
```

### References

* Comments and questions please to me: [jaap.dehaan@color-of-code.de](jaap.dehaan@color-of-code.de)
* The problem as question on [Stack Overflow](https://stackoverflow.com/questions/1404658/find-out-programmatically-if-a-process-is-demanding-user-input)
