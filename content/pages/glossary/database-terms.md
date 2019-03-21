---
published: true
path: "/glossary/database-terms"
date: "2019-01-08"
title: "Database Terms"
tags: ["glossary", "database", "terms", "normalized"]
---

# Database terms

## Definitions / Rules

- Entity <--> Database Table
  - Naming convention: singular, uppercase
- Instance of an entity <--> Database Row (or Tuple or Record)
- Attribute <--> Database Column (or Field).
  - Naming convention: singular, lowercase
- Relationship = Link between two entities, represents a business rule and can be expressed as a verb phrase.
- Primary key = an attribute that uniquely identify each instance of an entity.

## Relationship

- "one-to-many" relationship: one instance of the parent entity relates to many instances of the child entity.
- "many-to-many" relationship: many instances of one entity relate to many instances of the other entity.
  - Need to be resolved (to avoid data redundancy): create an intermediate entity known as a cross-reference (or XREF) entity. The XREF entity is made up of the primary keys from both of the two original entities. Both of the two original entities become parent entities of the XREF entity. Thus, the "many-to-many" relationship becomes resolved as two "one-to-many" relationships.
- Relationships are either "**identifying**" or "**non-identifying**". Identifying relationships exist when the primary key of the parent entity is included in the primary key of the child entity. On the other hand, a non-identifying relationship exists when the primary key of the parent entity is included in the child entity but not as part of the child entity's primary key. In addition, non-identifying relationships may be further classified as being either "**mandatory**" or "**non-mandatory**". A mandatory non-identifying relationship exists when the value in the child table cannot be null. On the other hand, a non-mandatory non-identifying relationship exists when the value in the child table can be null.

## Keys

- Primary key = an attribute that uniquely identifies each instance of an entity.
  - cannot be null
  - immutable: cannot be changed
  - shall contain no semantic meaning
  - shall not be re-used/recycled
  - Note: efficiency (INT vs CHAR)
- Super key = Combination of attributes leading to a primary key
- Foreign key = primary key of a parent entity in a child entity (reference)
- Surrogate key
- Candidate key

## Referential integrity

A foreign key requires that values must be present in the parent entity before like values may be inserted in the child entity.

## Cardinality

- Cardinality of the relationship between the child entity and the parent entity. The cardinality of a relationship may be determined by asking the following question: "How many instances of the child entity relate to each instance of the parent entity?"
- There are four types of cardinality:
  - One to zero or more (common cardinality)
  - One to one or more (P cardinality)
  - One to zero or one (Z cardinality)
  - One to exactly N (N cardinality).

## Normalization

- minimize data redundancy
- minimize data restructuring
- minimize I/O by reducing transaction sizes
- enforce referential integrity

## Normal Form

- First normal form (1NF): very basic rules:
  - Eliminate duplicate [columns](http://databases.about.com/library/glossary/bldef-column.htm) from the same table.
  - Create separate tables for each group of related data and identify each [row](http://databases.about.com/library/glossary/bldef-row.htm) with a unique column or set of columns (the [primary key](http://databases.about.com/library/glossary/bldef-primarykey.htm)).
- Second normal form (2NF): remove duplicate data:
  - Meet all the requirements of 1NF.
  - Remove subsets of data that apply to multiple rows of a table and place them in separate tables.
  - Create relationships between these new tables and their predecessors through the use of [foreign keys](http://databases.about.com/library/glossary/bldef-foreignkey.htm).
- Third normal form (3NF):
  - Meet all the requirements of the second normal form.
  - Remove columns that are not [dependent](http://databases.about.com/od/specificproducts/a/Database-Dependency.htm) upon the primary key.
- Boyce-Codd NormalForm (BCNF or 3.5NF):
  - Meet all the requirements of the 3NF.
  - Every determinant must be a [candidate key.](http://databases.about.com/cs/specificproducts/g/candidate.htm)
- Fourth NormalForm (4NF):
  - Meet all the requirements of the 3NF.
  - Relationships have no [multi-valued dependencies](http://databases.about.com/od/specificproducts/g/multivalued-dependency.htm).
- Fifth normal form (5NF), Project-join normal form (PJ/NF) designed to reduce redundancy in relational databases recording multi-valued facts by isolating [semantically](http://en.wikipedia.org/wiki/Semantically) related multiple relationships.
  - Meet all the requirements of the 4NF.
  - Every [join dependency](http://en.wikipedia.org/wiki/Join_dependency) is implied by the [candidate keys](http://en.wikipedia.org/wiki/Candidate_key).
Null & 3VL (Three value Logic)
