<?php


namespace App\Controller;

use App\Model\User;
use Psr\Log\LoggerInterface;
use App\Repositories\ServiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ServiceController extends AbstractController
{
    #[Route('api/services', name: 'services', methods: ['GET'])]
    public function getServices(ServiceRepository $serviceRepository, SerializerInterface $serializer): JsonResponse
    {
        $services = $serviceRepository->getServices();
        $jsonServices = $serializer->serialize($services, 'json');
        return new JsonResponse($jsonServices, Response::HTTP_OK, [], true);
    }

    #[Route('api/admin/creation-service', name: 'create-service', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function createService(SerializerInterface $serializer, LoggerInterface $logger, Request $request, ServiceRepository $serviceRepository)
    {
        $data = json_decode($request->getContent(), true);
        $errors = [];
        if (!isset($data['title']) || trim($data['title']) === "") {
            $errors[] = ['propertyPath' => 'title', 'title' => 'Le champ titre doit être renseigné.'];
        }
        if (!isset($data['description']) || trim($data['description']) === "") {
            $errors[] = ['propertyPath' => 'description', 'title' => 'Le champ description doit être renseigné.'];
        }
        if (empty($errors)) {
            try {
                $serviceRepository->addService($data['title'], $data['description']);
                $logger->info('Service created');
            } catch (\Exception $e) {
                $logger->error('Error creating service: ' . $e->getMessage());
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }

        return new Response('Service créé', Response::HTTP_OK);
    }

    #[Route('api/service/{id}/modification', name: 'update-service', methods: ['PUT'])]
    #[IsGranted('ROLE_USER', message: "Vous n'avez pas les droits, seul un employé peut accéder à cette ressource.")]
    public function updateService(Security $security, LoggerInterface $logger, Request $request, ServiceRepository $serviceRepository, $id)
    {
        $data = json_decode($request->getContent(), true);
        $user = $security->getUser();
        if ($user instanceof User && ($user->getType() === 'Employé' || $user->getType() === 'Admin')) {
            try {
                $serviceRepository->updateService($id, $data['title'], $data['description']);
                $logger->info('Service updated');
            } catch (\Exception $e) {
                $logger->error('Error updating service: ' . $e->getMessage());
                return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
            }
        } else {
            return new JsonResponse(['error' => 'Vous n\'avez pas les droits pour accéder à cette ressource'], Response::HTTP_FORBIDDEN);
        }
        return new Response('Service modifié', Response::HTTP_OK);
    }

    #[Route('api/admin/service/{id}/suppression', name: 'delete-service', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function deleteService(LoggerInterface $logger, ServiceRepository $serviceRepository, $id): JsonResponse
    {
        try {
            $serviceRepository->deleteService($id);
            $logger->info('Service deleted');
        } catch (\Exception $e) {
            $logger->error('Error deleting service: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message:' => 'Service supprimé'], Response::HTTP_OK, [], true);
    }
}
