<?php

namespace App\Security;

use App\Model\User;
use App\Repositories\UserRepository;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = $this->userRepository->getUserByEmail($identifier);
        if (!$user) {
            throw new UserNotFoundException(sprintf('User "%s" does not exist.', $identifier));
        }


        return new User($user['id'], $user['firstName'], $user['lastName'], $user['email'], $user['password'], $user['role'], $user['type']);
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        // Votre logique pour rafraîchir un utilisateur - typiquement vous rechargez l'utilisateur de la base de données
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByIdentifier($user->getUserIdentifier());
    }

    public function supportsClass(string $class): bool
    {
        return User::class === $class || is_subclass_of($class, User::class);
    }
}
