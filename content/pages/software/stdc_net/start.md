---
published: true
path: "/software/stdc-net/start"
date: "2019-03-13"
title: "Stdc.NET"
tags: ["software", "product", "stdc", ".NET", "parser", "lexer", "code", "migration"]
---

# Stdc - Helps porting C code to .NET

## Rationale

Porting C code to .NET doesn't sound like being fun. And it is mostly for sure not funny... The mind breaking rewriting of `printf` formatting code to String.Format formats can cost a bunch of time and is error prone. The same difficulties arise with `scanf`, really tedious to port such code. Signal handling is another topic where one can loose quite some hours. Stdc is a pure .NET library enabling a quick port of existing C code by emulating most of the C syntax in a very similar way, to not say in an identical manner. The code can be then refactored step by step further by removing the C functions. The Stdc library enables a quick first shot so you have at least a running executable to work with.

Note that the Stdc library is written in pure .NET no call to native functions is made (no "cheating" with P/Invoke, to call the native C runtime methods is performed). This can be important for portability between .NET on Linux (MONO) and Windows for example. A ported program should then run without recompilation under MONO and Microsoft .NET.

## Who cares about Stdc?

If you ...

* have to quickly port a large portion of code and defer a clean .NET implementation to later on
* are not used to the .NET framework and want to mimic the C API in .NET
* wonder how to port some parts of the code but want a working result right now

Even a tool to convert (in a sloppy mode) C files to C# files to start porting with is already available, thought it is still under heavy development.

Availability: See https://github.com/Color-Of-Code/stdc.NET

## Examples

### Hello world

**C code**:

```c
    #include <stdio.h>

    void main(void) {
        printf("Hello World!\n");
    }
```

**C# code**:

```csharp
namespace Example {      // a namespace to contain the code
    using stdc;          // instead of #include ...

    public class HelloWorld { // in C# methods must be in a class
        public static void main () {
            C.printf("Hello World!\n");
        }
    }
}
```

The main difference is that the code must be embedded in a class and a namespace. The functions turn consequently into `public static` methods (equivalent in .NET to C functions). In further examples we will omit this necessary code parts to keep the focus on the real code changes. `#include`s are replaced with a `using` statement and the C functions are part of a static class with called C. Therefore `C.printf` is used instead of a bare `printf` statement without C. as prefix. This first example is simplistic but it is there just to get a feeling for the basic principles in porting C to .NET.

There could be an alternative implementation using extensions or a base class so that prefixing the calls with `C.` becomes unneeded.

### Printing powers of 2 - printf()

**C code**:

```c
    #include <stdio.h>

    #define N 16

    void main(void) {
        int n;           /* The current exponent */
        int val = 1;     /* The current power of 2  */

        printf ("\t  n  \t    2^n\n");
        printf ("\t================\n");
        for (n=0; n<=N; n++) {
            printf ("\t%3d \t %6d\n", n, val);
            val = 2*val;
        }
    }
```

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    private const int N = 16;

    public static void main () {
        int n;              // The current exponent
        int val = 1;    // The current power of 2

        C.printf ("\t  n  \t    2^n\n");
        C.printf ("\t================\n");
        for (n=0; n<=N; n++) {
            C.printf ("\t%3d \t %6d\n", n, val);
            val = 2 * val;
        }
    }
```

Note that absolutely no change was needed to the formatting strings.||

### Generating a file - FILE, fopen(), fclose(), putc()

**C code**:

```c
    #include <stdio.h>

    void main () {
        FILE * pFile;
        char c;

        pFile = fopen ("alphabet.txt", "wt");
        for (c = 'A' ; c <= 'Z' ; c++) {
            putc (c , pFile);
        }
        fclose (pFile);
    }
```

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    public static void main () {
        C.FILE pFile;
        char c;

        pFile = C.fopen ("alphabet.txt", "wt");
        for (c = 'A'; c <= 'Z'; c++) {
            C.putc (c, pFile);
        }
        C.fclose (pFile);
    }
```

The `fopen`, `fclose` can be used exactly like in C, only the pointer symbol `*` disappears.

### A small guessing game - rand(), scanf()

**C code**:

```c
    #include <stdio.h>
    #include <stdlib.h>
    #include <time.h>

    void main () {
        int iSecret, iGuess;

        srand ( time(NULL) );
        iSecret = rand() % 10 + 1;

        do {
            printf ("Guess the number (1 to 10): ");
            scanf ("%d",&iGuess);
            if (iSecret<iGuess)
                puts ("The secret number is lower");
            else if (iSecret>iGuess)
                puts ("The secret number is higher");
        } while (iSecret!=iGuess);

        puts ("Congratulations!");
    }
```

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    public static void main () {
        int iSecret;
        int iGuess;

        C.srand (C.time (C.NULL));
        iSecret = C.rand () % 10 + 1;

        do {
            C.printf ("Guess the number (1 to 10): ");
            C.scanf ("%d", out iGuess);
            if (iSecret < iGuess)
                C.puts ("The secret number is lower");
            else if (iSecret > iGuess)
                C.puts ("The secret number is higher");
        } while (iSecret != iGuess);

        C.puts ("Congratulations!");
    }
```

In the C# port, the `scanf` implementation is making use of generics to handle different types accordingly.

### Quick Sort an array of ints, step by step refactoring - qsort()

**C code**:

```c
    #include <stdio.h>
    #include <stdlib.h>

    int values[] = { 40, 10, 100, 90, 20, 25 };

    int compare (const void * a, const void * b) {
        return ( *(int*)a - *(int*)b );
    }

    void main () {
        int n;
        qsort (values, 6, sizeof(int), compare);
        for (n=0; n<6; n++)
            printf ("%d ",values[n]);
    }
```

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    public static int[] values = new int[] { 40, 10, 100, 90, 20, 25 };

    public static int compare (int a, int b) {
        return a - b;
    }

    public static void main () {
        int n;
        C.qsort (values, 6, sizeof (int), compare);
        for (n = 0; n < 6; n++)
            C.printf ("%d ", values[n]);
    }
```

Second step, refactoring, getting rid of the C-like syntax and use .NET strengths. We transformed the `for` loop into a `foreach` loop, making the use of the magic number '6' superfluous.

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    public static int[] values = new int[] { 40, 10, 100, 90, 20, 25 };

    public static int compare (int a, int b) {
        return a - b;
    }

    public static void main () {
        C.qsort (values, compare);
        foreach (int v in values)
            C.printf ("%d ", v);
    }
```

Third step: get rid of all C functions and replace them with their .NET equivalents.

**C# code**:

```csharp
    using stdc; // ... code to embed in class/namespace omitted

    public static int[] values = new int[] { 40, 10, 100, 90, 20, 25 };

    public static int compare (int a, int b) {
        return a - b;
    }

    public static void main () {
        Array.Sort (values, compare);
        foreach (int v in values)
            Console.Write ("{0} ", v);
    }
```

*Did you notice:* From the first step on, the C# compare method didn't need any casts unlike the C version. Thanks to the use of generics, the code readability is greaty improved. This also shows the basic steps in refactoring the C code. Stdc just helps you to keep a testable running version between successive steps of refactoring.

## Remarks

In order to provide the advanced emulation functionality (like signals and `atexit` support, `argc`, `argv` emulation), the library needs to control the code to be run. There is a trampoline from the .NET Main method to the ported main C function.

This should be used like this:

```csharp
namespace examples {
    using stdc;
    class Program {
        static void Main (string[] args)
        {
            // use one of these
            C.RunVMain (args, CProgram.main); // if the main is returning nothing (void)
            C.RunIMain (args, CProgram.main); // if the main is returning an int
        }
    }
}
```

The signature of the main function is one of:

```csharp
- int main(int argc, string[] argv)
- int main()
- void main(int argc, string[] argv)
- void main()
```

The .NET arguments do not contain the program name unlike in C where argv[0] contains the name of the executable. To enable to reuse code from C that expects this behaviour, you must use the C.RunI/VMain() function. The RunMain() function also provides an environment where the signal() and raise() C functions can be used.

### Further examples

### Using atexit - atexit()

**C code**:

```c
    #include <stdio.h>
    #include <stdlib.h>

    void atexit_handler1 (void) {
        puts ("handler 1");
    }

    void atexit_handler2 (void) {
        puts ("handler 1");
    }

    void main () {
        atexit (atexit_handler1);
        atexit (atexit_handler2);
        puts ("atexit handlers should be " +
            "called in reverse order 2 and then 1!");
    }
```

**C# code**:

```csharp
namespace example {
    using stdc;

    public class Program {

        public static void atexit_handler1() {
            C.puts("handler 1");
        }
        public static void atexit_handler2() {
            C.puts("handler 2");
        }

        public static void main () {
            C.atexit(atexit_handler1);
            C.atexit(atexit_handler2);
            C.puts("atexit handlers should be " +
                "called in reverse order 2 and then 1!");
        }

        static void Main (string[] args) {
            C.RunVMain (args, main); // trampoline
        }
    }
}
```

**C# code**:

The full code is provided for this example, to demonstrate how to let the `RunMain()` method call the ported `main()` function. `RunMain()` calls `main()` after initializing an environment where the signals can work properly. The behavior expected from C regarding the order in which the handlers are called is implemented correctly: the handlers are called in reverse order or registration.

## Links

* [Source code](https://github.com/Color-Of-Code/stdc.NET)
* [Issue tracker](https://github.com/Color-Of-Code/stdc.NET/issues)
