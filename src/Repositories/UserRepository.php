<?php

namespace App\Repositories;

use App\Service\DatabaseService;

class UserRepository
{
    private $databaseService;
    private $databaseName;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
        $this->databaseName = getenv('DATABASE_NAME');
    }
    public function getUsers()
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM user';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM user WHERE email = :email';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }


    public function getUserById($id)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM user WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function addUser($email, $passwordHash, $firstName, $lastName, $type)
    {
        $this->databaseService->connect($this->databaseName);
        $existingUser = $this->getUserByEmail($email);
        if ($existingUser) {
            throw new \Exception('Un utilisateur avec cet e-mail existe déjà.');
        }
        $sql = 'INSERT INTO user (email, password, firstName, lastName, role, type) VALUES (:email, :password, :firstName, :lastName, :role, :type)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $passwordHash);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':lastName', $lastName);
        $stmt->bindValue(':role', json_encode(['ROLE_USER']));
        $stmt->bindValue(':type', $type);
        $stmt->execute();
        $lastInsertId = $this->databaseService->getPdo()->lastInsertId();
        return $lastInsertId;
    }

    public function deleteUser($id)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'DELETE FROM user WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
