<?php

namespace App\Repositories;

use App\Service\DatabaseService;

class AnimalRepository
{
    private $databaseService;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
    }
    // Fetch all the animals from the database
    public function getAnimals()
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM animal';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    // Fetch the animal by his ID from the database with his habitat
    public function getAnimalById($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT 
        a.*, 
        h.name AS habitatName, 
        h.description AS habitatDescription
    FROM 
        animal a
    JOIN 
        habitat h ON a.habitatId = h.id
    WHERE
        a.id = :animalId;';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $id);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    // Check if an animal exists by his name and habitat
    public function getAnimalByNameAndHabitat($firstName, $habitatId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM animal WHERE firstName = :firstName AND habitatId = :habitatId';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    // Fetch all images of an animal by his ID
    public function getAnimalImages($animalId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM animalImage WHERE animalId = :animalId';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }



    public function addAnimal($firstName, $race, $birthDate, $description, $habitatId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO animal (firstName, race, birthDate, description, habitatId) VALUES (:firstName, :race, :birthDate, :description, :habitatId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':race', $race);
        $stmt->bindValue(':birthDate', $birthDate);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function getLastVeterinaryReport($animalId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM veterinaryReport WHERE animalId = :animalId ORDER BY id DESC LIMIT 1';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getVeterinaryReports($animalId, $page)
    {
        $this->databaseService->connect('dbarcadia');
        $offset = ($page - 1) * 10;
        $sql = 'SELECT * FROM veterinaryReport WHERE animalId = :animalId LIMIT 10 OFFSET :offset';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getLastFeedingReport($animalId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM feedingReport WHERE animalId = :animalId ORDER BY id DESC LIMIT 1';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getFeedingReports($animalId, $page)
    {
        $this->databaseService->connect('dbarcadia');
        $offset = ($page - 1) * 10;
        $sql = 'SELECT * FROM feedingReport WHERE animalId = :animalId ORDER BY date DESC LIMIT 10 OFFSET :offset ';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function addAnimalImage($name, $description, $url, $animalId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO animalImage (name, description, url, animalId) VALUES (:name, :description, :url, :animalId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':url', $url);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function addAnimalVeterinaryReport($date, $animalState, $foodProvided, $foodAmountGrams, $animalStateDetails, $animalId, $veterinaryId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO veterinaryReport (date, animalState, foodProvided, foodAmountGrams, animalStateDetails, animalId, veterinaryId) VALUES (:date, :animalState, :foodProvided, :foodAmountGrams, :animalStateDetails, :animalId, :veterinaryId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':date', $date);
        $stmt->bindValue(':animalState', $animalState);
        $stmt->bindValue(':foodProvided', $foodProvided);
        $stmt->bindValue(':foodAmountGrams', $foodAmountGrams);
        $stmt->bindValue(':animalStateDetails', $animalStateDetails);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->bindValue(':veterinaryId', $veterinaryId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function addAnimalFeedingReport($date, $foodType, $foodAmountGrams, $animalId, $employeeId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO feedingReport (date, foodType, foodAmountGrams, animalId, employeeId) VALUES (:date, :foodType, :foodAmountGrams, :animalId, :employeeId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':date', $date);
        $stmt->bindValue(':foodType', $foodType);
        $stmt->bindValue(':foodAmountGrams', $foodAmountGrams);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->bindValue(':employeeId', $employeeId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function updateAnimal($id, $firstName, $race, $birthDate, $description, $habitatId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'UPDATE animal SET firstName = :firstName, race = :race, birthDate = :birthDate, description = :description, habitatId = :habitatId WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':race', $race);
        $stmt->bindValue(':birthDate', $birthDate);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
    }

    public function deleteAnimal($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'DELETE FROM animal WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
