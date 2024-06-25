<?php

namespace App\Controller;

use DateTime;
use App\Model\User;
use App\Model\Animal;
use App\Model\Habitat;
use Psr\Log\LoggerInterface;
use App\Repositories\HabitatRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class HabitatController extends AbstractController
{
    #[Route('api/habitats', name: 'habitats', methods: ['GET'])]
    public function getHabitats(SerializerInterface $serializer, HabitatRepository $habitatRepository): JsonResponse
    {
        $habitats = $habitatRepository->getHabitats();
        $serializedHabitats = [];
        foreach ($habitats  as $habitat) {
            $habitatModel = new Habitat($habitat['id'], $habitat['name'], $habitat['description']);
            $serializedHabitats[] = $habitatModel;
        }
        $jsonHabitats = $serializer->serialize($serializedHabitats, 'json', ['groups' => 'getHabitats']);
        return new JsonResponse($jsonHabitats, Response::HTTP_OK, [], true);
    }

    #[Route('api/habitat/{id}', name: 'habitat', methods: ['GET'])]
    public function getHabitatById(SerializerInterface $serializer, HabitatRepository $habitatRepository, $id): JsonResponse
    {
        $habitat = $habitatRepository->getHabitatById($id);
        $habitatModel = new Habitat($habitat['id'], $habitat['name'], $habitat['description']);
        $animals = $habitatRepository->getAnimalsByHabitatId($id);
        $habitatModel->setAnimals($animals);
        $jsonHabitat = $serializer->serialize($habitatModel, 'json', ['groups' => 'getHabitat']);
        return new JsonResponse($jsonHabitat, Response::HTTP_OK, [], true);
    }

    #[Route('api/habitat/{id}/animaux', name: 'habitat-animaux', methods: ['GET'])]
    public function getAnimalsByHabitatId(SerializerInterface $serializer, HabitatRepository $habitatRepository, $id): JsonResponse
    {
        $animals = $habitatRepository->getAnimalsByHabitatId($id);
        $serializedAnimals = [];
        foreach ($animals as $animal) {
            $animalModel = new Animal($animal['id'], $animal['firstName'], $animal['race'], $animal['birthDate'], $animal['description'], $animal['habitatId'], $animal['gender']);
            $serializedAnimals[] = $animalModel;
        }
        $jsonAnimals = $serializer->serialize($serializedAnimals, 'json', ['groups' => 'getAnimals']);
        return new JsonResponse($jsonAnimals, Response::HTTP_OK, [], true);
    }

    #[Route('api/admin/habitat-creation', name: 'creation-habitat', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function createHabitat(ValidatorInterface $validator, SerializerInterface $serializer, LoggerInterface $logger, HabitatRepository $habitatRepository, Request $request, UrlGeneratorInterface $urlGenerator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $habitat = new Habitat(null, $data['name'], $data['description'], null);
        $errors = $validator->validate($habitat);
        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        try {
            $id = $habitatRepository->addHabitat($data['name'], $data['description']);
            $logger->info('Habitat créé', ['id' => $id, "name" => $data['name']]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création de l\'habitat', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        $habitat->setId($id);
        $jsonHabitat = $serializer->serialize($habitat, 'json', ['groups' => 'getHabitat']);
        $location = $urlGenerator->generate('habitat', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonHabitat, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    #[Route('api/admin/habitat/{id}/habitat-reports', name: 'habitat reports', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function getHabitatReports(Request $request, SerializerInterface $serializer, HabitatRepository $habitatRepository, $id): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $habitatReports = $habitatRepository->getHabitatReports($id, $page);
        $jsonHabitatReports = $serializer->serialize($habitatReports, 'json', ['groups' => 'getHabitats']);
        return new JsonResponse($jsonHabitatReports, Response::HTTP_OK, [], true);
    }

    #[Route('api/habitat/create-report', name: 'habitat-create-report', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul l'utilisateur peut accéder à cette ressource.")]
    public function createHabitatReport(Security $security, LoggerInterface $logger, HabitatRepository $habitatRepository, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $security->getUser();
        if ($user instanceof User && $user->getType() === "Vétérinaire") {
            $veterinaryId = $user->getId();
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits, seul le vétérinaire peut accéder à cette ressource.'], Response::HTTP_FORBIDDEN);
        }
        $dateInput = $data['date']; // Get the input date
        $date = DateTime::createFromFormat('d/m/Y', $dateInput);
        $formattedDate = $date->format('Y-m-d'); //  format to YYYY-MM-DD
        try {
            $habitatRepository->addHabitatReport($formattedDate, $data['report'], $data['habitatId'], $veterinaryId);
            $logger->info('Rapport créé', ['habitatId' => $data['habitatId'], 'veterinaryId' => $veterinaryId]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création du rapport', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Rapport créé'], Response::HTTP_CREATED);
    }

    #[Route('api/admin/habitat/{id}/modification', name: 'modification-habitat', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function updateHabitat(UrlGeneratorInterface $urlGenerator, SerializerInterface $serializer, ValidatorInterface $validator, LoggerInterface $logger, HabitatRepository $habitatRepository, Request $request, $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $habitat = new Habitat($id, $data['name'], $data['description'], null);
        $errors = $validator->validate($habitat);
        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        try {
            $habitatRepository->updateHabitat($id, $data['name'], $data['description']);
            $logger->info('Habitat mis à jour', ['id' => $id, 'name' => $data['name']]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la mise à jour de l\'habitat', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        $jsonHabitat = $serializer->serialize($habitat, 'json', ['groups' => 'getHabitat']);
        $location = $urlGenerator->generate('habitat', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonHabitat, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    #[Route('api/admin/habitat/{id}/suppression', name: 'suppression-habitat', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function deleteHabitat(LoggerInterface $logger, HabitatRepository $habitatRepository, $id): JsonResponse
    {
        $animalsInHabitat = $habitatRepository->getAnimalsByHabitatId($id);
        if (count($animalsInHabitat) > 0) {
            return new JsonResponse(['error' => 'Vous ne pouvez pas supprimer cet habitat car il abrite encore des animaux.'], Response::HTTP_CONFLICT);
        }
        try {
            $habitatRepository->deleteHabitat($id);
            $logger->info('Habitat supprimé', ['id' => $id]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la suppression de l\'habitat', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Habitat supprimé'], Response::HTTP_OK);
    }
}
