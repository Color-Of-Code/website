---
published: true
path: "/database/mysql-queries"
date: "2019-03-25"
title: "MySQL queries"
tags: ["mysql", "database", "queries"]
---

# MySQL

## Report table sizes

Replace `$DB_NAME` with appropriate value.

```sql
SELECT
    table_name AS `Table`,
    round(((data_length + index_length) / 1024 / 1024), 2) `Size in MiB`
FROM information_schema.TABLES
WHERE table_schema = "$DB_NAME"
ORDER BY (data_length + index_length) DESC;
```

## Find columns

Replace `$DB_NAME`, `$COLUMN_NAMEi` with appropriate values.

```sql
SELECT DISTINCT TABLE_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE COLUMN_NAME IN ('$COLUMN_NAME1', '$COLUMN_NAME2')
        AND TABLE_SCHEMA='$DB_NAME';
```
