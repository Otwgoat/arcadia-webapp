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
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    /**
     * Get the users from the database
     */
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

    /**
     * Create a user in the database
     */
    #[Route('api/admin/creation-utilisateur', name: 'creation_utilisateur', methods: ['POST'])]
    #[IsGranted("ROLE_ADMIN", message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function createUser(MailerInterface $mailer, UserRepository $userRepository, Request $request, UserPasswordHasherInterface $passHasher, UrlGeneratorInterface $urlGenerator, SerializerInterface $serializer, LoggerInterface $logger, ValidatorInterface $validator): JsonResponse
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
            $email = (new Email())
                ->from('lucas.jouffroy@gmail.com')
                ->to($user->getEmail())
                ->subject('Bienvenue chez Arcadia')
                ->text('Bienvenue chez Arcadia, votre compte a bien été créé. Veuillez-vous rapprocher de l\'administrateur afin qu\'il vous communique votre mot de passe. Voici l\'identifiant qui vous a été attribué: ' . $user->getEmail() . '. Nous vous souhaitons une trés bonne intégration.');
            $mailer->send($email);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création de l\'utilisateur', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'userCreation']);
        $location = $urlGenerator->generate('user', ['id' => $id], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ['Location' => $location], true);
    }

    /**
     * Delete a user from the database
     */
    #[Route('api/admin/utilisateur/{id}/suppression', name: 'delete_user', methods: ['DELETE'])]
    #[IsGranted("ROLE_ADMIN", message: "Vous n'avez pas les droits, seul l'administrateur peut accéder à cette ressource.")]
    public function deleteUser(UserRepository $userRepository, $id, LoggerInterface $logger): JsonResponse
    {
        try {
            $userRepository->deleteUser($id);
            $logger->info('Utilisateur supprimé', ['id' => $id]);
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la suppression de l\'utilisateur', ['message' => $e->getMessage()]);
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_CONFLICT);
        }
        return new JsonResponse(['message' => 'Utilisateur supprimé'], Response::HTTP_OK);
    }

    /**
     * Get the current user
     */
    #[Route("api/utilisateur-connecte", name: "utilisateur-actuel", methods: ["GET"])]
    public function getConnectedUser(SerializerInterface $serializer, Security $security): JsonResponse
    {
        $user = $security->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUsers']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }
}
