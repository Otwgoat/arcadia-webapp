<?php


namespace App\Controller;

use DateTime;
use App\Model\Animal;
use App\Model\User;
use Psr\Log\LoggerInterface;
use App\Repositories\AnimalRepository;
use App\Repositories\HabitatRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AnimalController extends AbstractController
{
    /**
     * Get animals from the database
     */
    #[Route('api/animals', name: 'animals', methods: ['GET'])]
    public function getAnimals(SerializerInterface $serializer, AnimalRepository $animalRepository)
    {
        $animals = $animalRepository->getAnimals();
        $serializedAnimals = [];
        foreach ($animals as $animal) {
            $animalModel = new Animal($animal['id'], $animal['firstName'], $animal['race'], $animal['birthDate'], $animal['description'], $animal['gender'], $animal['habitatId']);
            $serializedAnimals[] = $animalModel;
        }
        $jsonAnimals = $serializer->serialize($serializedAnimals, 'json', ['groups' => 'getAnimals']);
        return new JsonResponse($jsonAnimals, Response::HTTP_OK, [], true);
    }
    /**
     * Get animals by it's id from the database
     */
    #[Route('api/animal/{id}', name: 'animal', methods: ['GET'])]
    public function getAnimalById(SerializerInterface $serializer, AnimalRepository $animalRepository, HabitatRepository $habitatRepository, $id): JsonResponse
    {
        $animal = $animalRepository->getAnimalById($id);
        $habitatId = $habitatRepository->getHabitatById($animal['habitatId']);
        $animalModel = new Animal($animal['id'], $animal['firstName'], $animal['race'], $animal['birthDate'], $animal['description'], $animal['gender'], $habitatId);
        $lastVeterinaryReport = $animalRepository->getLastVeterinaryReport($id);
        if ($lastVeterinaryReport) {
            $animalModel->setLastVeterinaryReport($lastVeterinaryReport);
        } else {
            $animalModel->setLastVeterinaryReport(["Aucun rapport vétérinaire disponible"]);
        }

        $lastFeedingReport = $animalRepository->getLastFeedingReport($id);
        if ($lastFeedingReport) {
            $animalModel->setLastFeedingReport($lastFeedingReport);
        } else {
            $animalModel->setLastFeedingReport(["Aucun rapport d'alimentation disponible"]);
        }

        $jsonAnimal = $serializer->serialize($animalModel, 'json', ['groups' => 'getAnimal']);
        return new JsonResponse($jsonAnimal, Response::HTTP_OK, [], true);
    }

    /**
     * Get veterinary reports by animal id from the database
     */
    #[Route('api/animal/{id}/rapports-veterinaires', name: 'rapports-veterinaires', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function getVeterinaryReports(SerializerInterface $serializer, AnimalRepository $animalRepository, Request $request, $id, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Vétérinaire' || $user->getType() === 'Admin')) {
            $limit = $request->query->get('limit');

            $veterinaryReports = $animalRepository->getVeterinaryReports($id, $limit);
            $jsonVeterinaryReports = $serializer->serialize($veterinaryReports, 'json', ['groups' => 'getVeterinaryReports']);
            return new JsonResponse($jsonVeterinaryReports, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
    }
    /**
     * Get veterinary reports by date from the database
     */
    #[Route('api/animal/rapports-veterinaires/{date}', name: 'rapports-veterinaires-par-date', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function getVeterinaryReportsByDate(SerializerInterface $serializer, AnimalRepository $animalRepository, Request $request, $date, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Vétérinaire' || $user->getType() === 'Admin')) {
            $limit = $request->query->get('limit');

            $veterinaryReports = $animalRepository->getVeterinaryReportsByDate($date, $limit);
            $jsonVeterinaryReports = $serializer->serialize($veterinaryReports, 'json', ['groups' => 'getVeterinaryReports']);
            return new JsonResponse($jsonVeterinaryReports, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
    }


    /**
     * Get feeding reports by animal id from the database
     */
    #[Route('api/animal/{id}/rapports-alimentation', name: 'rapports-alimentation', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function getFeedingReports(SerializerInterface $serializer, AnimalRepository $animalRepository, Request $request, $id, Security $security): JsonResponse
    {
        $user = $security->getUser();
        if ($user instanceof User && $user->getType() === 'Vétérinaire') {
            $limit = $request->query->get('limit');
            $feedingReports = $animalRepository->getFeedingReports($id, $limit);
            $jsonFeedingReports = $serializer->serialize($feedingReports, 'json', ['groups' => 'getFeedingReports']);
            return new JsonResponse($jsonFeedingReports, Response::HTTP_OK, [], true);
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Create an animal in the database
     */
    #[Route('api/admin/creation-animal', name: 'creation-animal', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function createAnimal(ValidatorInterface $validator, UrlGeneratorInterface $urlGenerator, SerializerInterface $serializer, Request $request, LoggerInterface $logger, AnimalRepository $animalRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $animal  = new Animal(null, $data['firstName'], $data['race'], $data['birthDate'], $data['description'], $data['habitatId'], $data['gender']);
        $errors = $validator->validate($animal);
        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        if ($animalRepository->getAnimalByNameAndHabitat($data['firstName'], $data['habitatId'])) {
            return new JsonResponse(['error' => 'Un animal avec ce nom existe déjà dans cet habitat'], Response::HTTP_CONFLICT);
        }
        try {
            $id = $animalRepository->addAnimal($data['firstName'], $data['race'], $data['birthDate'], $data['description'], $data['habitatId'], $data['gender']);
            $logger->info('Animal créé', ['id' => $id, "firstName" => $data['firstName']]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création de l\'animal', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        $animal->setId($id);
        $jsonAnimal = $serializer->serialize($animal, 'json', ['groups' => 'getAnimal']);
        $location = $urlGenerator->generate('animal', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonAnimal, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    /**
     * Create a veterinary report in the database
     */
    #[Route('api/animal/creation-rapport-veterinaire', name: 'creation-rapport-vétérinaire', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function createVeterinaryReport(Security $security, Request $request, AnimalRepository $animalRepository, LoggerInterface $logger): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $security->getUser();
        if ($user instanceof User && $user->getType() === 'Vétérinaire') {
            $veterinaryId = $user->getId();
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }

        try {
            $animalRepository->addAnimalVeterinaryReport($data['date'], $data['animalState'], $data['foodProvided'], $data['foodAmountGrams'], $data['animalStateDetails'], $data['animalId'], $veterinaryId);
            $logger->info('Rapport vétérinaire créé', ['animalId' => $data['animalId'], 'veterinaryId' => $veterinaryId]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création du rapport vétérinaire', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Rapport vétérinaire créé'], Response::HTTP_CREATED);
    }

    /**
     * Create a feeding report in the database
     */
    #[Route('api/animal/creation-rapport-alimentation', name: 'creation-rapport-alimentation', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function createFeedingReport(Security $security, Request $request, AnimalRepository $animalRepository, LoggerInterface $logger): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $security->getUser();
        if ($user instanceof User && $user->getType() === 'Employé') {
            $employeeId = $user->getId();
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }

        try {
            $animalRepository->addAnimalFeedingReport($data['date'], $data['foodType'], $data['foodAmount'], $data['animalId'], $employeeId);
            $logger->info('Rapport d\'alimentation créé', ['animalId' => $data['animalId'], 'soigneurId' => $employeeId]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création du rapport d\'alimentation', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Rapport d\'alimentation créé'], Response::HTTP_CREATED);
    }

    /**
     * Update an animal in the database
     */
    #[Route('api/admin/animal/{id}/modification', name: 'modification-animal', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function updateAnimal(SerializerInterface $serializer, ValidatorInterface $validator, $id, Request $request, LoggerInterface $logger, AnimalRepository $animalRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $animal = new Animal($id, $data['firstName'], $data['race'], $data['birthDate'], $data['description'], $data['habitatId'], $data['gender']);
        $errors = $validator->validate($animal);
        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        if ($animalRepository->getAnimalByNameAndHabitat($data['firstName'], $data['habitatId'])) {
            return new JsonResponse(['error' => 'Un animal avec ce nom existe déjà dans cet habitat'], Response::HTTP_CONFLICT);
        }
        try {
            $animalRepository->updateAnimal($id, $data['firstName'], $data['race'], $data['birthDate'], $data['description'], $data['habitatId'], $data['gender']);
            $logger->info('Animal mis à jour', ['id' => $data['id'], "firstName" => $data['firstName']]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la mise à jour de l\'animal', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Animal mis à jour'], Response::HTTP_OK);
    }

    /**
     * Delete an animal from the database
     */
    #[Route('api/admin/animal/{id}/suppression', name: 'suppression-animal', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function deleteAnimal($id, AnimalRepository $animalRepository, LoggerInterface $logger): JsonResponse
    {
        try {
            $animalRepository->deleteAnimal($id);
            $logger->info('Animal supprimé', ['id' => $id]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la suppression de l\'animal', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Animal supprimé'], Response::HTTP_OK);
    }
}
