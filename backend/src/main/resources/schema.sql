-- Create sequences
CREATE SEQUENCE IF NOT EXISTS cart_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS product_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS users_seq START WITH 1 INCREMENT BY 1;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    Id INTEGER PRIMARY KEY,
    "First Name" VARCHAR(255),
    "Last Name" VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    Role VARCHAR(50)
);

-- Create Product table
CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY,
    img VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    price DOUBLE PRECISION
);

-- Create Cart table
CREATE TABLE IF NOT EXISTS Cart (
    id INTEGER PRIMARY KEY,
    img VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    price DOUBLE PRECISION,
    quantity INTEGER,
    email VARCHAR(255) NOT NULL
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY,
    img VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    price DOUBLE PRECISION
);