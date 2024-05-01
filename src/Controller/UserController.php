<?php

namespace App\Controller;

use App\Model\User;
use App\Repositories\UserRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('api/admin/users', name: 'users', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function getUsers(UserRepository $userRepository)
    {
        $users = $userRepository->getUsers();
        return $this->json($users);
    }

    #[Route('api/admin/user/{id}', name: 'user', methods: ['GET'])]
    public function getUserByID(UserRepository $userRepository, $id)
    {
        $user = $userRepository->getUserById($id);
        return $this->json($user);
    }

    #[Route('api/admin/creation-utilisateur', name: 'creation_utilisateur', methods: ['POST'])]
    #[IsGranted("ROLE_ADMIN", message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function createUser(UserRepository $userRepository, Request $request, UserPasswordHasherInterface $passHasher, UrlGeneratorInterface $urlGenerator, SerializerInterface $serializer, LoggerInterface $logger, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = new User(null, $data['firstName'], $data['lastName'], $data['email'], $data['password'], json_encode(['ROLE_USER']), $data['type']);
        $hashedPassword = $passHasher->hashPassword($user, $user->getPassword());
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), Response::HTTP_BAD_REQUEST, [], true);
        }
        try {
            $id = $userRepository->addUser($data['email'], $hashedPassword, $data['firstName'], $data['lastName'], $data['type']);
            $logger->info('Utilisateur créé', ['id' => $id]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création de l\'utilisateur', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'userCreation']);
        $location = $urlGenerator->generate('user', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ['Location' => $location], true);
    }
}
