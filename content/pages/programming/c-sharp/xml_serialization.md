---
published: true
path: "/programming/c-sharp/xml-serialization"
date: "2018-12-27"
title: "XML serialization"
tags: ["programming", "csharp", "xml", "serialization", "TODO_cleanup"]
---

# XML serialization

## Assembly (reference)

```csharp
System.Xml
```

## Using directive

```csharp
using System.Xml.Serialization;
```

## Code: Creation of the serializer

The following code generates a serialization assembly on the fly (on first execution). This assembly is then used to read and write objects of the specified type.

```csharp
XmlSerializer s = new XmlSerializer( typeof( MyType ) );
```

## Code: Serialization

```csharp
using (TextWriter writer = new StreamWriter( "data.xml" )) {
    s.Serialize( writer, myObject );
}
```

With settings

```csharp
XmlWriterSettings settings = new XmlWriterSettings();
settings.Indent = true;
...
using (XmlWriter writer = XmlWriter.Create( "data.xml", Settings )) {
    s.Serialize( writer, myObject );
}
```

## Code: Deserialization

```csharp
using (TextReader reader = new StreamReader( "data.xml" )) {
    myObject = (MyType)s.Deserialize( reader );
}
```

## Omit namespace declarations

How to avoid the sometimes unwanted namespace declarations (xmlns:xsi, xmlns:xsd)

```csharp
XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
ns.Add("","");
using (XmlWriter writer = new XmlWriter( "data.xml" )) {
    s.Serialize( writer, myObject, ns );
}
```

## Useful method for XML streaming/filtering

This methods makes one step in copying the content from the reader to the writer. This makes writing of code to filter contents or inject nodes into XML easier.

```csharp
static void WriteShallowNode (XmlReader reader, XmlWriter writer)
{
	switch (reader.NodeType) {
	case XmlNodeType.Element:
		writer.WriteStartElement (reader.Prefix, reader.LocalName, reader.NamespaceURI);
		writer.WriteAttributes (reader, true);
		if (reader.IsEmptyElement) {
			writer.WriteEndElement ();
		}
		break;
	case XmlNodeType.Text:
		writer.WriteString (reader.Value);
		break;
	case XmlNodeType.Whitespace:
	case XmlNodeType.SignificantWhitespace:
		writer.WriteWhitespace (reader.Value);
		break;
	case XmlNodeType.CDATA:
		writer.WriteCData (reader.Value);
		break;
	case XmlNodeType.EntityReference:
		writer.WriteEntityRef (reader.Name);
		break;
	case XmlNodeType.XmlDeclaration:
	case XmlNodeType.ProcessingInstruction:
		writer.WriteProcessingInstruction (reader.Name, reader.Value);
		break;
	case XmlNodeType.DocumentType:
		writer.WriteDocType (reader.Name, reader.GetAttribute ("PUBLIC"), reader.GetAttribute ("SYSTEM"), reader.Value);
		break;
	case XmlNodeType.Comment:
		writer.WriteComment (reader.Value);
		break;
	case XmlNodeType.EndElement:
		writer.WriteFullEndElement ();
		break;
	}
}
```
