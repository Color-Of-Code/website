---
published: true
path: "/funani/technology"
date: "2018-12-27"
title: "Funani Technology"
tags: ["funani", "technology", "TODO_cleanup"]
---

# Introduction

A set of standard tools has to be selected among a wide set of possibilities. What type of database to choose for storing and retrieving Metadata efficiently and scale with large amounts of data?

## Requirements

* Free and open source and running under Windows and Linux.
* Capable of handling small binary data (the big stuff is stored on the filesystem) but many features require small amounts of binary data to be stored in a database.
* Fast & scalable enough
* .NET interface

### Databases

#### SQL databases

* PostgreSQL
* MySQL

#### NoSQL databases

Various non RDBMS systems excluded are the Graph DBs that build a class on their own in my opinion.

* [Cassandra](Cassandra)
* [CouchDB](CouchDB)
* [HBase](HBase)
* [MongoDB](MongoDB)
* [Project Voldemort](Project Voldemort)
* [Scalaris](Scalaris)

#### Graph Databases

* [HyperGraphDB](HyperGraphDB)
* [InfoGrid](InfoGrid)
* [Neo4j](Neo4j)
* [Sesame](Sesame)
* [TinkerGraph](TinkerGraph)

[http://wiki.github.com/tinkerpop/gremlin Gremlin] is a kind of ORM for Graph DBs. [Gargamel](Gargamel) also seems of interest.

The NoSQL tools allow a great scalability and easy synchronisation (replication) that can be used also for continuous backup purposes.

A MongoDB and CakePHP solution is currently used for the proof of concept.

#### Interesting links

A collection of the most interesting links I found on the topic.

General

* [Amazing article about storing trees in SQL databases](http://techportal.ibuildings.com/2009/09/07/graphs-in-the-database-sql-meets-social-networks)

* [Choosing a non relational database](http://blog.boxedice.com/2009/07/25/choosing-a-non-relational-database-why-we-migrated-from-mysql-to-mongodb)

* [NoSQL if only it were that easy](http://bjclark.me/2009/08/04/nosql-if-only-it-was-that-easy)

* [25-alternative-open-source-databases-engines](http://www.stumbleupon.com/su/2VtZem/www.webresourcesdepot.com/25-alternative-open-source-databases-engines)

* [Comparison  Document Oriented Data Stores](http://jayant7k.blogspot.com/2009/08/document-oriented-data-stores.html)

* [Scaling websites](http://poorbuthappy.com/ease/archives/2007/04/29/3616/the-top-10-presentation-on-scaling-websites-twitter-flickr-bloglines-vox-and-more) (I really liked the 14 rules in the Yahoo presentation)

HBase Vs Cassandra

* [http://www.roadtofailure.com/2009/10/29/hbase-vs-cassandra-nosql-battle](http://www.roadtofailure.com/2009/10/29/hbase-vs-cassandra-nosql-battle)

HBase Vs CouchDB

* [http://www.larsgeorge.com/2009/03/hbase-vs-couchdb-in-berlin.html](http://www.larsgeorge.com/2009/03/hbase-vs-couchdb-in-berlin.html)

MongoDB Vs CouchDB

*  [http://www.mongodb.org/display/DOCS/Comparing+Mongo+DB+and+Couch+DB http://www.mongodb.org/display/DOCS/Comparing+Mongo+DB+and+Couch+DB]

*  [http://www.snailinaturtleneck.com/blog/2009/06/29/couchdb-vs-mongodb-benchmark http://www.snailinaturtleneck.com/blog/2009/06/29/couchdb-vs-mongodb-benchmark]

Graph Database

*  [http://blog.directededge.com/2009/02/27/on-building-a-stupidly-fast-graph-database On building a stupidly fast graph database]

Architecture of famous websites

* [LinkedIn](http://hurvitz.org/blog/2008/06/linkedin-architecture)
* [Facebook](http://perspectives.mvdirona.com/2009/02/07/FacebookCassandraArchitectureAndDesign.aspx)
* [MySpace case study](http://www.microsoft.com/casestudies/Case_Study_Detail.aspx?casestudyid=4000004532)

##### ORM

By using a NoSQL solution there is no need of an ORM.

[http://en.wikipedia.org/wiki/Object-Relational_mapping http://en.wikipedia.org/wiki/Object-Relational_mapping]

[http://en.wikipedia.org/wiki/List_of_object-relational_mapping_software#.NET](http://en.wikipedia.org/wiki/List_of_object-relational_mapping_software#.NET)

The only ones I know well are NHibernate and Castle ActiveRecord. Therefore I would tend to use them. But it may not be the best solution. I removed the non open source tools.

#### Microsoft

* ADO.NET Entity Framework, Microsoft's ORM (released with .NET 3.5 SP1)
* Language Integrated Query#LINQ_to_SQL|LINQ to SQL, Free, .Net framework component
* SubSonic, free ORM and code generation tool backed by Microsoft

#### My favorites

* NHibernate, open source
* * Castle ActiveRecord, ActiveRecord for .NET, open source
* * Fluent NHibernate, open source and free
* DataObjects.Net, open source, commercial 

#### Others

* Atlas (software)|Atlas,open source
* Business Logic Toolkit for .NET, open source
* Crystal Mapper, open source
* Developer Express, eXpress Persistent Objects (XPO)
* Euss, open source
* Habanero.NET|Habanero, Free open source Enterprise application framework with a Free Code Generation Tool
* iBATIS, Free open source
* Neo (object-relational toolset)|Neo, open source
* ObjectMapper .NET, GPL and commercial license
* Picasso (software)|Picasso, Open-Source ORM Framework & Code Generator (Relational & Xml), free with Commercial support available
* Telerik OpenAccess ORM|OpenAccess, free or commercial
* TierDeveloper, free ORM and code generation tool
* Sooda, open source; BSD license
* Subsonic (software)|Subsonic, open source
* Logic Data Access, open source
