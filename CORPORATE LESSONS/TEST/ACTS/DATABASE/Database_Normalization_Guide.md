# Database Normalization Guide
## 0NF → 1NF → 2NF → 3NF

---

## 0NF — Raw Unnormalized Data

Imagine you just dumped everything into one table with no structure:

| employee_id | employee_name | department | skills | orders |
|---|---|---|---|---|
| 1 | Patrick | Engineering | PHP, Java, MySQL | O001-Laptop-50000, O002-Mouse-500 |
| 2 | Maria | HR | Excel, Word | O003-Desk-15000 |

**Problems:**
- `skills` has multiple values in one cell
- `orders` has multiple values in one cell
- No proper primary key structure
- Data is messy and hard to query

---

## 1NF — First Normal Form

> **Rule: Each cell must have only ONE value. No repeating groups.**

Split everything so each cell contains a single value:

| employee_id | employee_name | department | skill | order_id | order_item | order_amount |
|---|---|---|---|---|---|---|
| 1 | Patrick | Engineering | PHP | O001 | Laptop | 50000 |
| 1 | Patrick | Engineering | Java | O001 | Laptop | 50000 |
| 1 | Patrick | Engineering | MySQL | O002 | Mouse | 500 |
| 2 | Maria | HR | Excel | O003 | Desk | 15000 |
| 2 | Maria | HR | Word | O003 | Desk | 15000 |

✅ **Fixed:** No more multiple values in one cell

❌ **New Problem:**
- `employee_name` and `department` are repeated many times
- If Patrick moves to IT, you have to update multiple rows
- Very redundant

---

## 2NF — Second Normal Form

> **Rule: Every non-key column must depend on the WHOLE primary key, not just part of it.**

Right now the primary key is `(employee_id + order_id + skill)` — but `employee_name` and `department` only depend on `employee_id`, not the full key. So we split into separate tables:

**employees table:**
| employee_id | employee_name | department |
|---|---|---|
| 1 | Patrick | Engineering |
| 2 | Maria | HR |

**employee_skills table:**
| employee_id | skill |
|---|---|
| 1 | PHP |
| 1 | Java |
| 1 | MySQL |
| 2 | Excel |
| 2 | Word |

**orders table:**
| order_id | employee_id | order_item | order_amount |
|---|---|---|---|
| O001 | 1 | Laptop | 50000 |
| O002 | 1 | Mouse | 500 |
| O003 | 2 | Desk | 15000 |

✅ **Fixed:** No more partial dependencies — each table focuses on one thing

❌ **New Problem:**
- If two employees share the same department, department name gets repeated
- Adding a `department_head` column would depend on `department`, not `employee_id`

---

## 3NF — Third Normal Form

> **Rule: No column should depend on another non-key column.**

In the employees table, if we add `department_head`, it depends on `department` not on `employee_id`. That's a **transitive dependency**. Fix it by splitting departments out:

**employees table:**
| employee_id | employee_name | department_id |
|---|---|---|
| 1 | Patrick | D01 |
| 2 | Maria | D02 |

**departments table:**
| department_id | department_name | department_head |
|---|---|---|
| D01 | Engineering | Mr. Santos |
| D02 | HR | Ms. Reyes |

**employee_skills table:**
| employee_id | skill |
|---|---|
| 1 | PHP |
| 1 | Java |
| 1 | MySQL |
| 2 | Excel |
| 2 | Word |

**orders table:**
| order_id | employee_id | order_item | order_amount |
|---|---|---|---|
| O001 | 1 | Laptop | 50000 |
| O002 | 1 | Mouse | 500 |
| O003 | 2 | Desk | 15000 |

✅ **Fixed:** Every column depends only on its own table's primary key

---

## Summary

| Normal Form | Rule | What We Fixed |
|---|---|---|
| **0NF** | No structure | Raw messy data |
| **1NF** | One value per cell | Split multiple values into rows |
| **2NF** | Depend on whole key | Split partial dependencies into separate tables |
| **3NF** | No column depends on non-key column | Split transitive dependencies into their own table |

---

## Simple Way to Remember

> **1NF** — no multiple values in one cell
>
> **2NF** — every column needs the whole key
>
> **3NF** — every column depends only on the key, nothing else

Think of it as **cleaning up a messy spreadsheet step by step** until every table has one clear purpose and zero redundancy!
