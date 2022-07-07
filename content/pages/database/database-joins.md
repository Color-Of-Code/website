---
published: true
path: "/glossary/database-joins"
date: "2022-07-01"
title: "Database Joins"
tags: ["glossary", "database", "join", "inner", "outer"]
---

## Joins

### (INNER) JOIN

The INNER JOIN keyword selects all rows from both the tables as long as the condition satisfies. This keyword will create the result-set by combining all rows from both the tables where the condition satisfies i.e value of the common field will be same.

Syntax:

```sql
SELECT table1.column1,table1.column2,table2.column1,....
FROM table1
INNER JOIN table2
ON table1.matching_column = table2.matching_column;
```

NOTE: JOIN is by default an INNER JOIN.

### LEFT (OUTER) JOIN

This join returns all the rows of the table on the left side of the join and matching rows for the table on the right side of join. The rows for which there is no matching row on right side, the result-set will contain `NULL` values.

Syntax:

```sql
SELECT table1.column1,table1.column2,table2.column1,....
FROM table1
LEFT OUTER JOIN table2
ON table1.matching_column = table2.matching_column;
```

### RIGHT (OUTER) JOIN

`RIGHT JOIN` is similar to `LEFT JOIN`. This join returns all the rows of the table on the right side of the join and matching rows for the table on the left side of join. The rows for which there is no matching row on left side, the result-set will contain `NULL` values.

Syntax:

```sql
SELECT table1.column1,table1.column2,table2.column1,....
FROM table1
RIGHT OUTER JOIN table2
ON table1.matching_column = table2.matching_column;
```

### FULL (OUTER) JOIN

`FULL JOIN` creates the result-set by combining result of both `LEFT JOIN` and `RIGHT JOIN`. The result-set will contain all the rows from both the tables. The rows for which there is no matching, the result-set will contain `NULL` values.

Syntax:

```sql
SELECT table1.column1,table1.column2,table2.column1,....
FROM table1
FULL OUTER JOIN table2
ON table1.matching_column = table2.matching_column;
```

### CROSS JOIN

A cross join creates the result-set by combining every row from two tables. All row combinations are included in the result; this is commonly called cross product join (referring to a cartesian product).

Syntax:

```sql
SELECT table1.column1,table1.column2,table2.column1,....
FROM   table1 CROSS JOIN table2
```

A common use for a cross join is to create obtain all combinations of items, such as colors and sizes or create reports.

## MySQL specialties

In MySQL you should use `LEFT OUTER JOIN` or `RIGHT OUTER JOIN`. There is no just `OUTER JOIN`.

If you need `FULL OUTER JOIN` in MySQL you can use `UNION` of `LEFT JOIN` and `RIGHT JOIN`

MySQL also known about a `STRAIGHT_JOIN` which can be used to influence the order of operation inside the server (performance optimization)

`NATURAL` can be used as a shortcut to avoid specifying all `USING` clauses if all matching column names have to be used

```text
The NATURAL [LEFT] JOIN of two tables is defined to be semantically equivalent to
an INNER JOIN or a LEFT JOIN with a USING clause that names all columns that exist in both tables.
```
