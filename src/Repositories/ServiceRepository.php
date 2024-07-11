<?php


namespace App\Repositories;

use App\Service\DatabaseService;

class ServiceRepository
{
    private $databaseService;
    private $databaseName;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
        $this->databaseName = $_ENV['DATABASE_NAME'];
    }

    public function getServices()
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM service';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function addService($title, $description)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'INSERT INTO service (title, description) VALUES (:title, :description)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':description', $description);
        $stmt->execute();
    }

    public function updateService($id, $title, $description)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'UPDATE service SET title = :title, description = :description WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':title', $title);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }

    public function deleteService($id)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'DELETE FROM service WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
