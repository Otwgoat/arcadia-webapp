<?php

namespace App\Controller;

use App\Model\User;
use App\Repositories\ReviewRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ReviewController extends AbstractController
{
    /**
     * Get the reviews from the database
     */
    #[Route('api/reviews', name: 'get-reviews', methods: ['GET'])]
    public function getReviews(Request $request, SerializerInterface $serializer, ReviewRepository $reviewRepository)
    {
        $limit = $request->query->get('limit');
        $reviews = $reviewRepository->getApprovedReviews($limit);
        $jsonReviews = $serializer->serialize($reviews, 'json');
        return new JsonResponse($jsonReviews, Response::HTTP_OK, [], true);
    }

    /**
     * Get the unapproved reviews from the database
     */
    #[Route('api/avis-non-approuves', name: 'avis non approuvés', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function getUnapprovedReviews(Security $security, SerializerInterface $serializer, ReviewRepository $reviewRepository)
    {
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Employé' || $user->getType() === 'Admin')) {
            try {
                $reviews = $reviewRepository->getUnapprovedReviews();
            } catch (\Exception $e) {
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
        $jsonReviews = $serializer->serialize($reviews, 'json');
        return new JsonResponse($jsonReviews, Response::HTTP_OK, [], true);
    }

    /**
     * Add a review to the database
     */
    #[Route('api/add-review', name: 'add-review', methods: ['POST'])]
    public function addReview(ReviewRepository $reviewRepository, LoggerInterface $logger, Request $request, SerializerInterface $serializer)
    {
        $data = json_decode($request->getContent(), true);
        $errors = [];
        if (!isset($data['username']) || trim($data['username']) === '') {
            $errors[] = ['propertyPath' => 'username', 'title' => 'Le champ pseudonyme doit être renseigné.'];
        }
        if (!isset($data['review']) || trim($data['review']) === '') {
            $errors[] = ['propertyPath' => 'review', 'title' => 'Le champ avis doit être renseigné.'];
        }
        if (empty($errors)) {
            try {
                $reviewRepository->addReview($data['username'], $data['review']);
                $logger->info('Review added');
            } catch (\Exception $e) {
                $logger->error('Error adding review: ' . $e->getMessage());
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        return new Response('Avis soumis', Response::HTTP_OK);
    }

    /**
     * Approve a review from the unapproved reviews in database
     */
    #[Route('api/review/{id}/approbation', name: 'approbation-avis', methods: ['PUT'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function approveReview(Security $security, LoggerInterface $logger, ReviewRepository $reviewRepository, $id)
    {
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Employé' || $user->getType() === 'Admin')) {
            try {
                $reviewRepository->approveReview($id);
                $logger->info('Review approved');
            } catch (\Exception $e) {
                $logger->error('Error approving review: ' . $e->getMessage());
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
        return new Response('Avis approuvé', Response::HTTP_OK);
    }

    /**
     * Delete a review from the database
     */
    #[Route('api/review/{id}/suppression', name: 'suppression-avis', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function deleteReview(Security $security, LoggerInterface $logger, ReviewRepository $reviewRepository, $id)
    {
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Employé' || $user->getType() === 'Admin')) {
            try {
                $reviewRepository->deleteReview($id);
                $logger->info('Review deleted');
            } catch (\Exception $e) {
                $logger->error('Error deleting review: ' . $e->getMessage());
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
        return new Response('Avis supprimé', Response::HTTP_OK);
    }
}
