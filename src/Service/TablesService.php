<?php

namespace App\Service;



class TablesService
{
    private $databaseService;
    public function __construct(DatabaseService $databaseService)
    {

        $this->databaseService = $databaseService;
    }


    public function createTableFromSqlFile($filePath)
    {
        $databaseName = $_ENV['DATABASE_NAME'];
        $this->databaseService->connect($databaseName);
        if (!file_exists($filePath)) {
            throw new \RuntimeException("SQL file does not exist: $filePath");
        }
        $sql = file_get_contents($filePath);
        $this->databaseService->getPdo()->exec($sql);
    }
}
