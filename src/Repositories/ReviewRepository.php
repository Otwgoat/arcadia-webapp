<?php

namespace App\Repositories;

use App\Service\DatabaseService;

class ReviewRepository
{
    private $databaseService;

    public function __construct(DatabaseService $databaseService)
    {
        $this->databaseService = $databaseService;
    }

    // Fetch all the reviews from the database
    public function getApprovedReviews($limit)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM review WHERE isApproved = 1 LIMIT :limit';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        $reviews = $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
        $sqlCount = 'SELECT COUNT(*) as totalCount FROM review WHERE isApproved = 1';
        $stmtCount = $this->databaseService->getPdo()->prepare($sqlCount);
        $stmtCount->execute();
        $totalCount = $stmtCount->fetch($this->databaseService->getPdo()::FETCH_ASSOC)['totalCount'];
        return [
            'reviews' => $reviews,
            'totalCount' => $totalCount
        ];
    }

    // Fetch all the unapproved reviews from the database
    public function getUnapprovedReviews()
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'SELECT * FROM review WHERE isApproved = 0';
        $stmt = $this->databaseService->getPdo()->query($sql);
        return $stmt->fetchAll($this->databaseService->getPdo()::FETCH_ASSOC);
    }

    // Add a review to the database
    public function addReview($username, $review)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'INSERT INTO review (username, review, isApproved) VALUES (:username, :review, :isApproved)';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':review', $review);
        $stmt->bindValue(':isApproved', 0);
        $stmt->execute();
    }

    // Approve a review
    public function approveReview($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'UPDATE review SET isApproved = 1 WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }

    // Delete a review
    public function deleteReview($id)
    {
        $this->databaseService->connect('dbarcadia');
        $sql = 'DELETE FROM review WHERE id = :id';
        $stmt = $this->databaseService->getPdo()->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
