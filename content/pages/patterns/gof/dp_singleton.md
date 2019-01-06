---
published: true
path: "/patterns/gof-singleton"
date: "2019-01-02"
title: "GoF: Singleton pattern"
tags: ["software", "pattern", "singleton", "TODO_cleanup"]
---

## Goal

Restrict instanciation of a class to one object.

## UML

{{http://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Singleton_UML_class_diagram.svg/200px-Singleton_UML_class_diagram.svg.png|UML Diagram}}

## C#

Having a sealed class and private constructor are essential to forbid indirect creation of objects of this class. The actual creation of the object is deferred to the first call to the Instance property. For a complete analysis and also some alternatives with full lazy creation, have a look [here](http://www.yoda.arachsys.com/csharp/singleton.html) (you will see the things are actually not as simple as they look like)

```csharp
public sealed class $classname$
{
	private static readonly $classname$ _instance = new $classname$;
	static $classname$() { }  // lazy instantiation

	private $classname$() { }
	public static $classname$ Instance
	{
			get { return instance; }
	}
}
```

## Pitfalls

* IMPLEMENTATION: In a multi-threaded environment there are some pitfalls resulting from race conditions. A naive implementation can lead to bad behavior. Although the pattern seems trivial, it is actually quite complex to implement correctly especially in languages like C++. The implementation provided here is thread-safe.

* USE: Copious use of the singleton pattern where inappropriate in your design is known as the singletonitis anti-pattern. This is as bad as using global variables and unnecessarily limits the re-use of the code. So use the singleton pattern with care only where the concept you implement is really global (like system settings for example)

## Links

Whereas the singleton patterns seems easy and fine to use, there are a lot of aspects speaking against its usage such as testability, tight coupling, ... As all things in life nothing is completely black or white, have a look at these links and try out to find what is the best in your case:

* Why singletons are Evil: [http://blogs.msdn.com/b/scottdensmore/archive/2004/05/25/140827.aspx](http://blogs.msdn.com/b/scottdensmore/archive/2004/05/25/140827.aspx)

* Simpleton pattern: [http://www.c2.com/cgi/wiki?SimpletonPattern](http://www.c2.com/cgi/wiki?SimpletonPattern), [http://www.c2.com/cgi/wiki?SimpletonPatternDiscussion](http://www.c2.com/cgi/wiki?SimpletonPatternDiscussion)
