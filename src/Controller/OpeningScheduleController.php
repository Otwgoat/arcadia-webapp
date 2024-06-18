<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OpeningScheduleController extends AbstractController
{
    #[Route('api/horaires', name: 'opening-schedule', methods: ['GET'])]
    public function getOpeningSchedule(SerializerInterface $serializer)
    {
        $openingSchedule = $this->getParameter('kernel.project_dir') . '/src/data/openingSchedule.json';
        $jsonContent = file_get_contents($openingSchedule);
        $data = json_decode($jsonContent, true);
        $serializedData = $serializer->serialize($data, 'json');
        return new JsonResponse($serializedData, 200, [], true);
    }

    #[Route('api/admin/horaires/modification', name: 'update-opening-schedule', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function updateOpeningSchedule(LoggerInterface $logger, Request $request, SerializerInterface $serializer)
    {
        $data = json_decode($request->getContent(), true);
        $filePath = $this->getParameter('kernel.project_dir') . '/src/data/openingSchedule.json';
        $serializedData = $serializer->serialize($data, 'json');
        try {
            file_put_contents($filePath, $serializedData);
            $logger->info('Horaires d\'ouverture mis à jour');
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la mise à jour des horaires d\'ouverture: ' . $e->getMessage());
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
        return new JsonResponse($serializedData, 200, [], true);
    }
}
