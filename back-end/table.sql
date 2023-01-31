-- Active: 1665169565463@@127.0.0.1@3306@myapp

CREATE TABLE
    users (
        id int PRIMARY key AUTO_INCREMENT,
        name varchar (250),
        contactNumber varchar (20),
        email varchar (50),
        password VARCHAR (250),
        status VARCHAR (20),
        role varchar (20),
        unique (email)
    );

insert into
    users (
        name,
        contactNumber,
        email,
        password,
        status,
        role
    )
values (
        'admin',
        '123656566',
        'admin@gmail.com',
        'admin',
        'true',
        'admin'
    );

CREATE TABLE
    category (
        id int not null AUTO_INCREMENT,
        name varchar (250) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE TABLE
    product (
        id int not null AUTO_INCREMENT,
        name varchar (250) NOT NULL,
        categoryId INTEGER not null,
        description VARCHAR (255),
        price INTEGER,
        status VARCHAR(20),
        PRIMARY KEY(id)
    );

CREATE Table
    bill (
        id int NOT NULL AUTO_INCREMENT,
        uuid VARCHAR (200) NOT NULL,
        name VARCHAR (250) NOT NULL,
        email VARCHAR (250) NOT NULL,
        contactNumber VARCHAR (20),
        paymentMethod VARCHAR (50) NOT NULL,
        total int not null,
        productDetails JSON DEFAULT NULL,
        createdBy VARCHAR (255) NOT NULL,
        PRIMARY KEY(id)
    );