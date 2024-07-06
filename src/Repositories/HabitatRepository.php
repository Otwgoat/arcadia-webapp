<?php


namespace App\Repositories;

use App\Service\DatabaseService;

class HabitatRepository
{
    private $databaseService;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
    }

    public function getHabitats()
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM habitat';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getHabitatById($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM habitat WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        return $stmt->fetch($this->databaseService->getPdo()::FETCH_ASSOC);
    }


    public function getAnimalsByHabitatId($habitatId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM animal WHERE habitatId = :habitatId';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function getAnimalsByRaceAndHabitat($race, $habitatId, $limit)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM animal WHERE race = :race AND habitatId = :habitatId LIMIT :limit';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->bindValue(':race', $race);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        $animals = $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);

        $sqlCount = 'SELECT COUNT(*) as totalCount FROM animal WHERE race = :race AND habitatId = :habitatId';
        $stmtCount = $this->databaseService->getPdo()->prepare($sqlCount);
        $stmtCount->bindValue(':habitatId', $habitatId);
        $stmt->bindValue(':race', $race);
        $stmtCount->execute();
        $totalCount = $stmtCount->fetch($this->databaseService->getPdo()::FETCH_ASSOC)['totalCount'];
        return [
            'animals' => $animals,
            'totalCount' => $totalCount
        ];
    }
    public function addHabitat($name, $description)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO habitat (name, description) VALUES (:name, :description)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':description', $description);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function addHabitatImage($name, $description, $url, $habitatId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO habitatImage (name, description, url, habitatId) VALUES (:name, :description, :url, :habitatId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':description', $description);
        $stmt->bindValue(':url', $url);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function addHabitatReport($date, $report, $habitatId, $veterinaryId)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO habitatReport (date,report, habitatId, veterinaryId) VALUES (:date, :report, :habitatId, :veterinaryId)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->bindValue(':date', $date);
        $stmt->bindValue(':report', $report);
        $stmt->bindValue(':veterinaryId', $veterinaryId);
        $stmt->execute();
        return $this->databaseService->getPdo()->lastInsertId();
    }

    public function getHabitatReports($habitatId, $page)
    {
        $this->databaseService->connect('dbarcadia');
        $offset = ($page - 1) * 10;
        $sql = 'SELECT * FROM habitatReport WHERE habitatId = :habitatId ORDER BY id DESC LIMIT 10 OFFSET :offset ';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->bindValue(':habitatId', $habitatId);
        $stmt->execute();
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    public function updateHabitat($id, $name, $description)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'UPDATE habitat SET name = :name, description = :description WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':name', $name);
        $stmt->bindValue(':description', $description);
        $stmt->execute();
    }

    public function deleteHabitat($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'DELETE FROM habitat WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
