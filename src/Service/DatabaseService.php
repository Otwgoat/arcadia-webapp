<?php

namespace App\Service;

use PDO;

class DatabaseService
{
    private $pdo;
    private $hostname;
    private $username;
    private $password;

    public function __construct(string $databaseUrl)
    {
        $dbparts = parse_url($databaseUrl);
        $this->hostname = $dbparts['host'];
        $this->username = $dbparts['user'];
        $this->password = $dbparts['pass'];

        $this->connect();
    }

    public function connect($databaseName = null)
    {
        $dsn = "mysql:host=$this->hostname";
        if ($databaseName !== null) {
            $dsn .= ";dbname=$databaseName";
        }

        $this->pdo = new PDO($dsn, $this->username, $this->password);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getPdo(): PDO
    {
        return $this->pdo;
    }

    public function createDatabase($name)
    {
        $this->connect(); // Connect without database name to execute creation
        $sql = "CREATE DATABASE IF NOT EXISTS $name";
        $this->pdo->exec($sql);
    }

    public function createAdmin($firstName, $lastName, $email, $password)
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $this->connect('dbarcadia');
        $sql = "INSERT INTO user (firstName, lastName, email, password, role, type) VALUES (:firstName, :lastName, :email, :password, :role, :type)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':lastName', $lastName);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $passwordHash);
        $stmt->bindValue(':role', json_encode(['ROLE_ADMIN']));
        $stmt->bindValue(':type', 'Admin');

        $stmt->execute();
    }
}
