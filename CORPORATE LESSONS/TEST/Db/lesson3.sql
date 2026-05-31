-- Active: 1780240975390@@127.0.0.1@3306@lesson3
-- create database and table for lesson 3

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2),
    department VARCHAR(50) DEFAULT 'UNASSIGNED',
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    employees (
        first_name,
        last_name,
        email,
        salary,
        department,
        hire_date
    )
VALUES (
        'Jeremy',
        'Peterson',
        'jeremy.peterson@example.com',
        55000.00,
        'Finance',
        '2023-03-10'
    ),
    (
        'Emily',
        'Johnson',
        'emily@example.com',
        62000.00,
        'Marketing',
        '2022-11-15'
    ),
    (
        'Michael',
        'Smith',
        'michael@example.com',
        75000.00,
        'Engineering',
        '2021-06-01'
    ),
    (
        'Sarah',
        'Davis',
        'saradav@example.com',
        48000.00,
        'HR',
        '2023-01-20'
    ),
    (
        'David',
        'Wilson',
        'david.wilson@example.com',
        52000.00,
        'Sales',
        '2022-08-12'
    );