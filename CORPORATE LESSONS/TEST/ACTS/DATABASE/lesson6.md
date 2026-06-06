# LESSON 6.1 ACTIVITIES
**LESSON 6.1 ACT 1**
- the first table violates the 1NF because of having multiple data in a single cell under the `Skill` column.
FIX: 

| EmpID | EmpName | Skills |
|-------|---------|--------|
|   1   | Patrick |   PHP  |
|   1   | Patrick |  Java  |
|   1   | Patrick |   SQL  |

**LESSON 6.1 ACT 2**
CustomerTable:
| CusID | CusName | OrderID|
|-------|---------|--------|
|   C1  | Patrick |   PHP  |

OrderTable:
| CusID | Product | Price  |
|-------|---------|--------|
|   C1  | Laptop  |  1000  |

**LESSON 6.1 ACT 3**

```sql
CREATE TABLE bookstore(
    bookId INT PRIMARY KEY,
    bookTitle VARCHAR(100) NOT NULL,
    bookAuthor VARCHAR(100) NOT NULL,
    bookGenre VARCHAR(50) NOT NULL
);

CREATE TABLE customers(
    custId INT PRIMARY KEY,
    cusEmail VARCHAR(100) NOT NULL
);

CREATE TABLE orders(
    orderID INT PRIMARY KEY,
    orderDate DATE
);
```

# LESSON 6.2 ACTIVITIES

