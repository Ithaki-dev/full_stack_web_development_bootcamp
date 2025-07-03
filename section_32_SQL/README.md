# 🗂️ SQL Basics: CRUD Operations & Table Relationships

## 📘 Overview

Today I learned the fundamental operations and concepts for working with **relational databases** using SQL. These include:

- How to perform **CRUD** operations
- Creating and structuring **tables**
- Defining **primary** and **foreign keys**
- Connecting related data using **INNER JOIN**
- Managing and updating real-world data with SQL commands

---

## 🔁 CRUD Explained

**CRUD** stands for:

| Operation | SQL Command | Description                        |
|-----------|-------------|------------------------------------|
| Create    | `INSERT`    | Add new data to a table            |
| Read      | `SELECT`    | Retrieve data from one or more tables |
| Update    | `UPDATE`    | Modify existing data               |
| Delete    | `DELETE`    | Remove data from a table           |

---

## 🧱 Practical Tables Created

Below are the tables we created in practice, along with sample data and queries:

### 🧑 `customers` Table

```sql
-- Create table
CREATE TABLE customers (
  id INT,
  first_name STRING,
  last_name STRING,
  address STRING,
  PRIMARY KEY (id)
);

-- Insert data
INSERT INTO customers VALUES (1, 'John', 'Doe', '32 Cherry Blvd');
INSERT INTO customers VALUES (2, 'Angela', 'Yu', '12 Sunset Drive');

-- Select data
SELECT * FROM customers WHERE first_name = 'John';

-- Create table
CREATE TABLE products (
    id INT NOT NULL,
    name STRING,
    price MONEY,
    PRIMARY KEY (id)
);

-- Insert data
INSERT INTO products VALUES (1, 'Pen', 1.20);
INSERT INTO products (id, name) VALUES (2, 'Pencil');

-- Update and manage data
UPDATE products SET price=0.8 WHERE id = 2;
ALTER TABLE products ADD stock INT;
UPDATE products SET stock=32 WHERE id = 1;
UPDATE products SET stock=12 WHERE id = 2;

-- Delete and reinsert a row
DELETE FROM products WHERE id = 2;
INSERT INTO products VALUES (2, 'Pencil', 0.8, 12);

-- Select data
SELECT * FROM products;

-- Create table with foreign keys
CREATE TABLE orders (
  id INT NOT NULL,
  order_number INT,
  customer_id INT,
  product_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert data
INSERT INTO orders VALUES (1, 4362, 2, 1);


-- Join orders with customers
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;

-- Join orders with products
SELECT orders.order_number, products.name, products.price, products.stock
FROM orders
INNER JOIN products ON product_id = products.id;


