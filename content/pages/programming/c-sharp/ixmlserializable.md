---
published: true
path: "/programming/c-sharp/ixmlserializable"
date: "2018-12-27"
title: "IXmlSerializable"
tags: ["programming", "csharp", "xml", "serialization", "TODO_cleanup"]
---

# IXmlSerializable

## Introduction

Yeah, I know, this is yet another article about XML serialization... After having seen several issues in code using or demonstrating XML serialization on CodeProject (and having struggled with these issues myself!), I thought telling the community about the findings would be a good deed. After having seen the interest of people, I added some more examples in the form of source code.

There are many confusing things regarding the implementation of the `IXmlSerializable` interface. Even MSDN (at the time of this writing: 21.10.2009) adds confusion by publishing sample code for cases that are too simple and even these ones are wrongly implemented (See `ReadXml` and `WriteXml` from [here](http://msdn.microsoft.com/en-us/library/system.xml.serialization.ixmlserializable_members.aspx) as a starter, they work but are really wrong, you will maybe believe me after reading the full article). Many questions arise that took me a while to find a response to. That's the reason of being of this article.

## Background

`IXmlSerializable` is composed of three methods:


* `GetSchema`
* `ReadXml`
* `WriteXml`

The serializer created from the XML serialization attributes first has a look at if the type to be serialized implements this interface. If it is not implemented, then the `public` members and properties are analyzed and considered (or not thanks `XmlIgnoreAttribute`) for serialization.

[This](http://www.codeproject.com/KB/dotnet/CustomSerializationPart2.aspx) is a good starter. The article is clear and nicely written and introduces the main differences between attribute based serialization and implementing `IXmlSerializable`.

After having read this article, by getting back to the other articles mentioned above, I hope you will be able to see the implementation mistakes made therein. The code works well as long as the classes do not get extended and as long as you do not mix serialization procedures. I made it all wrong too from the beginning until I dug into the problems...

This article is more or less written like a FAQ to serve as a quick reference. It should answer the most important questions one might have (or should have, hehe) asked himself regarding the implementation of `IXmlSerializable`. If you have more questions, please don't hesitate to contact me. I use C# as programming language. I did my best to avoid mentioning the language too much, actually this information is good for all .NET targeted languages.

## Sample

To better support explanations, I introduce an example that contains many of the pitfalls that one may encounter during XML serialization. We want to serialize and deserialize animals stored as a collection in a farm. More interesting than foos and bars or?

Following aspects are present:

 1.  Empty element in XML
 2.  Collection interface to be serialized
 3.  The collection contains elements of different types derived from a base class

### Classes

```csharp
	public abstract class Animal
	{
	  public Animal() { }
	  public String Name { get; set; }
	  public DateTime Birthday { get; set; }
	}
	public class Dog : Animal
	{
	  public Dog() { }
	}
	public class Cat : Animal
	{
	  public Cat() { }
	}
	public class Mouse : Animal
	{
	  public Mouse() { }
	}
	public class Farm
	{
	  public Farm() { Animals = new List`<Animal>`(); }
	  public IList`<Animal>` Animals { get; private set; }
	}
```

### XML Snippet

```xml
	<Farm>
	  <Dog Name="Rex">
	    <Birthday>`2009-10-22`</Birthday>
	  </Dog>
	
	  <Cat Name="Tom">
	    <Birthday>`1940-06-15`</Birthday>
	  </Cat>
	  <Mouse Name="Jerry" />
	</Farm>
```

## Shall GetSchema() Really Always Return Null?

YES! `GetSchema()` shall ALWAYS return `null`. This is sufficient in most cases. If you really need to provide a Schema, then use [XmlSchemaProviderAttribute](http://msdn.microsoft.com/en-us/library/system.xml.serialization.xmlschemaproviderattribute.aspx). `GetSchema()` might still be used by some legacy code or internally by .NET types, but you should not use it. It is safe and good to return `null`. People telling you it could be important to implement it are liars! :-)

## How to Implement WriteXml?

That's the easy part, rather straight forward:

 1.  Write out all attributes
 2.  Write out all elements and sub objects

BUT don't write the wrapper element! That's the job of the calling code.

For our example, it means that the `Dog` class shall write the attribute "`Name`", then its element "`Birthday`". The `Dog` class shall however NOT write the "`Dog`" start element or its end element.

This code shows how to correctly handle all animals during `WriteXml`:

```csharp
	public void WriteXml(System.Xml.XmlWriter writer)
	{
	  writer.WriteAttributeString("Name", Name);
	  if (Birthday != DateTime.MinValue)
	    writer.WriteElementString("Birthday",
	      Birthday.ToString("yyyy-MM-dd"));
	}
```

## How to Implement ReadXml?

`ReadXml` shall read the attributes first and then consume the wrapper element by calling `ReadStartElement()`. Consuming the end tag of the wrapper shall also be done inside `ReadXml` by calling `ReadEndElement()`. This sounds rather counter intuitive because `WriteXml` shall not write the wrapper element! But it becomes clearer if you consider reading attributes: attributes can only be read before consuming the start element they are defined for and you need to know the element name from outside the class to create a class of the correct type. **NOTE**: Take care of empty elements! (See below.)

For our example, it means that the `Dog` class shall move to the content and read the attribute "`Name`". Then it shall read the start element ("`Dog`" element is consumed but do not specify it namely). Read the elements inside the class like "`Birthday`" and finally consume the end element. This omits the correct handling of the case when the element is empty (no birthday specified like for Jerry for simplicity).

This code shows how to correctly handle all animals during `ReadXml`:

```csharp
	public void ReadXml(System.Xml.XmlReader reader)
	{
	  reader.MoveToContent();
	  Name = reader.GetAttribute("Name");
	  Boolean isEmptyElement = reader.IsEmptyElement; // (1)
	  reader.ReadStartElement();
	  if (!isEmptyElement) // (1)
	  {
	    Birthday = DateTime.ParseExact(reader.
	      ReadElementString("Birthday"), "yyyy-MM-dd", null);
	    reader.ReadEndElement();
	  }
	}
```

## Are There Any Gotchas for the Implementations?

Quite a few actually:

 1. Take care of the current Culture while using `ToString()` inside `WriteXml` & reading back in `ReadXml`.
 2. Do not write the wrapper element in `WriteXml` but read it inside `ReadXml`!
 3. Handle empty elements correctly during deserialization.

Gotcha number 1 triggers in the case of dates, floating point values, .. that are written differently depending on the culture. In English speaking countries, it would probably display something like 10/22/2009 for Rex´s birthday. If you save that file like that and open it on another machine with a different locale, you'll get into trouble. I prefer always to specify a fixed format with the Date Time format specification for example. (A short C# Format specification Cheat Sheet I use is located [here](http://color-of-code.de/index.php?option=com_content&amp;view=article&amp;id=58:c-format-strings&amp;catid=38:programming&amp;Itemid=66).)

Gotcha number 2 triggers if you mix both attribute driven serialization with `IXmlSerializable` implementation for some classes.

Gotcha number 3 triggers if elements are empty or omitted (such a surprise!).

## Why are ReadXml and WriteXml Behaving Asymmetrically?

The implementation choice is good and justified because:

 1.  The caller code must foresee what is the element name to create a new object of the appropriate type to be filled in during deserialization.
 2.  You must be able to handle attributes in `ReadXml`, so the wrapping tag must not be consumed yet.
 3.  You must be able to define the name of the wrapping tag from outside to allow the same type to be serialized into different container tags.

The second point is similar to saying that the rubbish does not need to know into which bin it gets into. It must only know how to describe itself and to sort itself you after you see the bin. The only counter-intuitive item is that in the case of `ReadXml` the rubbish opens the bin itself! But it doesn't need to know how the bin called: no argument is used for the name in `ReadStartElement()`.

## How to Handle Empty Elements?

I must say I did not find any elegant way of handling the deserialization of empty elements. No matter what I tried, I always had to perform an additional test. I found no method in the API that could help me. A suggestion to Microsoft would be to add a Boolean return value to `ReadStartElement()` that returns `false` if the element is empty. If you have an empty element, you can detect it before reading it. If you have one, then DO NOT call `ReadEndElement()`.

For our example, it means that the `Dog` class shall move to the content and read the attribute "`Name`". BUT now comes the little difference. Store the result of `IsEmptyElement` into a boolean variable. Then read the start element ("`Dog`" element is consumed but do not specify it namely). Only if the boolean is not `true`, read the elements inside the class like "`Birthday`" and consume the end element. I really mean it, do NOT read the end element if the boolean is `true`. You could erroneously consume the next closing tag like in the case of the "`Mouse`" where you would also consume "`</Animals>`".

## What are the Limitations of the XML Serialization Attributes?


*  Mixed mode is not supported: all text attributes get merged into a single part and you lose positional information during deserialization.

*  Serialization of interfaces is not possible, there is no declaration allowing to choose a concrete implementation for the interface.

*  Requirements on the objects have to be met (`public` fields and properties, default constructor, ... see [this link](http://msdn.microsoft.com/en-us/library/182eeyhh%28VS.85%29.aspx)).

*  Many .NET data structures cannot be serialized (only `ICollection` and `IEnumerable` implementations, not `Dictionary` for example).

*  Dynamic behaviour is not possible, it is type oriented and you cannot change the serialization depending on dynamic constraints. What if, for example, you are not interested in deserializing everything in some cases? Then `IXmlSerializable` saves you.

## How to Realize the Same with XML Attributes?

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.ComponentModel;
using System.Text;
using System.Xml.Serialization;

namespace XmlWithAttributes
{
		public class Animal
		{
				public Animal() { }

				[XmlAttribute]
				public String Name { get; set; }

				[DefaultValue(typeof(DateTime), "0001-01-01T00:00:00")]
				public DateTime Birthday { get; set; }
		}
		public class Dog : Animal
		{
				public Dog() { }
		}
		public class Cat : Animal
		{
				public Cat() { }
		}
		public class Mouse : Animal
		{
				public Mouse() { }
		}
		public class Farm
		{
				public Farm() { Animals = new List`<Animal>`(); }

				[XmlElement("Dog", typeof(Dog))]
				[XmlElement("Cat", typeof(Cat))]
				[XmlElement("Mouse", typeof(Mouse))]
				public List`<Animal>` Animals { get; set; }
		}
}
```

The generated XML looks like this:

```xml
<?xml version="1.0"?>
<Farm xmlns:xsi=http://www.w3.org/2001/XMLSchema-instance 
	xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<Dog Name="Rex">
		<Birthday>`2009-10-22T00:00:00`</Birthday>

	</Dog>
	<Cat Name="Tom">
		<Birthday>`1940-06-15T00:00:00`</Birthday>
	</Cat>
	<Mouse Name="Jerry" />

</Farm>
```

There are some limitations though. The animals need to be stored inside a `List`, `IList` won't work, interfaces cannot be serialized. All types must be `public`. The date format cannot be modified by attribute declaration. To overcome these limitations, the use of an implementation of `IXmlSerializable` is an easy way to go.

A mixed attribute and `IXmlSerializable` implementation looks like this:

```csharp
public class Animal : IXmlSerializable
{
	public Animal() { }
	public String Name { get; set; }
	public DateTime Birthday { get; set; }

	public System.Xml.Schema.XmlSchema GetSchema() { return null; }

	public void ReadXml(System.Xml.XmlReader reader)
	{
		reader.MoveToContent();
		Name = reader.GetAttribute("Name");
		Boolean isEmptyElement = reader.IsEmptyElement; // (1)
		reader.ReadStartElement();
		if (!isEmptyElement) // (1)
		{
			Birthday = DateTime.ParseExact(reader.
				ReadElementString("Birthday"), "yyyy-MM-dd", null);
			reader.ReadEndElement();
		}
	}

	public void WriteXml(System.Xml.XmlWriter writer)
	{
		writer.WriteAttributeString("Name", Name);
		if (Birthday != DateTime.MinValue)
			writer.WriteElementString("Birthday",
				Birthday.ToString("yyyy-MM-dd"));
	}
}
public class Dog : Animal
{
	public Dog() { }
}
public class Cat : Animal
{
	public Cat() { }
}
public class Mouse : Animal
{
	public Mouse() { }
}
public class Farm
{
	public Farm() { Animals = new List`<Animal>`(); }

	[XmlElement("Dog", typeof(Dog))]
	[XmlElement("Cat", typeof(Cat))]
	[XmlElement("Mouse", typeof(Mouse))]
	public List`<Animal>` Animals { get; set; }
}
```

The `ReadXml()` method is here tricky to implement. If you followed the guidelines correctly, the code should be similar to what is written above. If you omit the handling of an empty element (lines commented with "(1)"), deserializing the sample XML breaks on parsing "Jerry". The `WriteXml()` method is simple and ok, in this example it is difficult to do it in another way. But one could be tempted by writing the surrounding element in there if it were a simpler case. Here you see why it would not work in general.

The implementation overcomes the date/time issue but still has the list as a concrete class, and all members must still be `public` in the `Farm`. Note that we could already make the setters `private` (`Name`, `Birthday`) in the `Animal` class.

## Can one mix attribute based and IXmlSerializable serialization?

Yes! Using the Attribute serialization along with classes implementing IXmlSerializable is straight forward. The XmlSerializer generated code uses IXmlSerializable if implemented, otherwise Attribute based serialization. Even if you want to use attribute based serialization code from within ReadXml or WriteXml, it is as easy as usual. Just take the XmlReader / XmlWriter as the stream instead of creating a new FileStream of course!

Here an example for rewriting the Read/WriteXml from the Animal class. As DateTime is a value type, you cannot steer very well how the enclosing tag is called. With your own classes and serialization attributes, this is no problem.

```csharp
public void ReadXml(System.Xml.XmlReader reader)
{
	reader.MoveToContent();
	Name = reader.GetAttribute("Name");
	Boolean isEmptyElement = reader.IsEmptyElement;
	reader.ReadStartElement();
	if (!isEmptyElement)
	{
			XmlSerializer s = new XmlSerializer(typeof(DateTime));
			Birthday = (DateTime)s.Deserialize(reader);
			reader.ReadEndElement();
	}
}

public void WriteXml(System.Xml.XmlWriter writer)
{
	writer.WriteAttributeString("Name", Name);
	if (Birthday != DateTime.MinValue)
	{
			XmlSerializer s = new XmlSerializer(typeof(DateTime));
			s.Serialize(writer, Birthday);
	}
}
```

## How to Deserialize XML Fragments?

I had to solve this to read so-called streamed XML. Not sure if it is really standard but I had to perform such a task for some projects where, let's explain it in a generic way, a source streams objects in XML all the time without a surrounding main tag. That means that actually the document would be invalid. There is a way to handle the fragments easily without having to embed them into an artificial tag. I have to dig out the code I once wrote or retry to get it right again...

[This article](https://www.codeproject.com/KB/cpp/XmlChunk.aspx) also gives some ideas about solving this.

Feel free to ask questions and add comments, your feedback is precious to me. :-).

## History

* 2009-11-30 Added information about mixing attribute serialization and `IXmlSerializable`
* 2009-10-24 Added code samples and more details
* 2009-10-22 First version released

## External publication

On code project [https://www.codeproject.com/KB/XML/ImplementIXmlSerializable.aspx](https://www.codeproject.com/KB/XML/ImplementIXmlSerializable.aspx)
