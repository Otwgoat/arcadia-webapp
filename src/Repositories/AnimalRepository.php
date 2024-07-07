<?php

namespace App\Repositories;

use App\Service\DatabaseService;

class AnimalRepository
{
    private $databaseService;
    private $databaseName;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
        $this->databaseName = getenv('DATABASE_NAME');
    }
    // Fetch all the animals from the database
    public function getAnimals()
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM animal';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    // Fetch the animal by his ID from the database with his habitat
    public function getAnimalById($id)
    {
        $this->databaseService->connect($this->databaseName);
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
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM animal WHERE firstName = :firstName AND habitatId = :habitatId';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }



    public function addAnimal($firstName, $race, $birthDate, $description, $habitatId, $gender)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'INSERT INTO animal (firstName, race, birthDate, description, habitatId, gender) VALUES (:firstName, :race, :birthDate, :description, :habitatId, :gender)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':firstName', $firstName);
        $stmt->bindValue(':race', $race);
        $stmt->bindValue(':birthDate', $birthDate);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->bindValue(':gender', $gender);
        $stmt->execute();

        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function getLastVeterinaryReport($animalId)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM veterinaryReport WHERE animalId = :animalId ORDER BY id DESC LIMIT 1';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getVeterinaryReports($animalId, $limit)
    {
        $this->databaseService->connect($this->databaseName);

        $sql = 'SELECT * FROM veterinaryReport WHERE animalId = :animalId ORDER BY date DESC LIMIT :limit';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':animalId', $animalId);

        $stmt->execute();
        $reports = $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);

        $sqlCount = 'SELECT COUNT(*) as totalCount FROM veterinaryReport WHERE animalId = :animalId';
        $stmtCount = $this->databaseService->getPdo()->prepare($sqlCount);
        $stmtCount->bindValue(':animalId', $animalId);
        $stmtCount->execute();

        $totalCount = $stmtCount->fetch($this->databaseService->getPdo()::FETCH_ASSOC)['totalCount'];

        return [
            'reports' => $reports,
            'totalCount' => $totalCount
        ];
    }

    public function getVeterinaryReportsByDate($date, $limit)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM veterinaryReport WHERE date = :date ORDER BY date DESC LIMIT :limit';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':date', $date);

        $stmt->execute();
        $reports = $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);

        $sqlCount = 'SELECT COUNT(*) as totalCount FROM veterinaryReport WHERE date = :date';
        $stmtCount = $this->databaseService->getPdo()->prepare($sqlCount);
        $stmtCount->bindValue(':date', $date);
        $stmtCount->execute();
        $totalCount = $stmtCount->fetch($this->databaseService->getPdo()::FETCH_ASSOC)['totalCount'];
        return [
            'reports' => $reports,
            'totalCount' => $totalCount
        ];
    }

    public function getLastFeedingReport($animalId)
    {
        $this->databaseService->connect($this->databaseName);
        $sql = 'SELECT * FROM feedingReport WHERE animalId = :animalId ORDER BY id DESC LIMIT 1';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }


    public function getFeedingReports($animalId, $limit)
    {
        $this->databaseService->connect($this->databaseName);

        $sql = 'SELECT * FROM feedingReport WHERE animalId = :animalId ORDER BY date DESC LIMIT :limit';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':animalId', $animalId);
        $stmt->execute();
        $reports = $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
        $sqlCount = 'SELECT COUNT(*) as totalCount FROM feedingReport WHERE animalId = :animalId';
        $stmtCount = $this->databaseService->getPdo()->prepare($sqlCount);
        $stmtCount->bindValue(':animalId', $animalId);
        $stmtCount->execute();

        $totalCount = $stmtCount->fetch($this->databaseService->getPdo()::FETCH_ASSOC)['totalCount'];

        return [
            'reports' => $reports,
            'totalCount' => $totalCount
        ];
    }



    public function addAnimalVeterinaryReport($date, $animalState, $foodProvided, $foodAmountGrams, $animalStateDetails, $animalId, $veterinaryId)
    {
        $this->databaseService->connect($this->databaseName);
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
        $this->databaseService->connect($this->databaseName);
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
        $this->databaseService->connect($this->databaseName);
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
        $this->databaseService->connect($this->databaseName);
        $sql = 'DELETE FROM animal WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
