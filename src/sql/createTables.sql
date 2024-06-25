-- Active: 1680726112524@@127.0.0.1@3306@dbarcadia
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role JSON NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    type ENUM(
        'Employé',
        'Vétérinaire',
        'Admin'
    )
);

CREATE TABLE IF NOT EXISTS habitat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS animal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    race VARCHAR(255) NOT NULL,
    birthDate DATE NULL,
    description TEXT NULL,
    gender ENUM("male", "female"),
    habitatId INT,
    FOREIGN KEY (habitatId) REFERENCES habitat (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS veterinaryReport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    animalState ENUM(
        'Parfaite santé',
        'Bonne santé',
        'Santé préoccupante',
        'Mauvaise santé'
    ),
    foodProvided VARCHAR(255) NOT NULL,
    foodAmountGrams DECIMAL(10, 2) NOT NULL,
    animalStateDetails TEXT,
    animalId INT NOT NULL,
    veterinaryId INT,
    veterinaryName VARCHAR(255),
    FOREIGN KEY (animalId) REFERENCES animal (id) ON DELETE CASCADE,
    FOREIGN KEY (veterinaryId) REFERENCES user (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS feedingReport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME NOT NULL,
    foodType VARCHAR(255) NOT NULL,
    foodAmountGrams DECIMAL(10, 2) NOT NULL,
    animalId INT NOT NULL,
    employeeId INT,
    employeeFirstName VARCHAR(255),
    FOREIGN KEY (animalId) REFERENCES animal (id) ON DELETE CASCADE,
    FOREIGN KEY (employeeId) REFERENCES user (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS habitatReport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    report TEXT NOT NULL,
    habitatId INT NOT NULL,
    veterinaryId INT,
    FOREIGN KEY (habitatId) REFERENCES habitat (id) ON DELETE CASCADE,
    FOREIGN KEY (veterinaryId) REFERENCES user (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE
);