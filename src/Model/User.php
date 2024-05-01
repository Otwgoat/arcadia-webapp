<?php

namespace App\Model;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups('getUsers')]
    private $id;

    #[Groups(['getUsers', 'userCreation'])]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire.')]
    private $firstName;

    #[Groups(['getUsers', 'userCreation'])]
    #[Assert\NotBlank(message: 'Le nom de famille est obligatoire.')]
    private $lastName;

    #[Groups(['getUsers', 'userCreation'])]
    #[Assert\Email(message: 'L\'adresse e-mail n\'est pas valide.')]
    #[Assert\NotBlank(message: 'L\'adresse e-mail est obligatoire.')]
    private $email;

    private $password;

    #[Groups(['getUsers', 'userCreation'])]
    private $role;

    #[Groups(['getUsers', 'userCreation'])]
    #[Assert\Choice(choices: ['Employé', 'Vétérinaire', 'Admin'], message: 'Le type doit être employé, vétérinaire ou administrateur.')]
    private $type;

    public function __construct($id, $firstName, $lastName, $email, $password, $role, $type)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
        $this->type = $type;
    }

    public function getRoles(): array
    {
        $roles = json_decode($this->role, true);
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }
    public function getPassword(): string
    {
        return $this->password;
    }

    public function getSalt()
    {
        // bcrypt n'a pas besoin de sel séparé
        return null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
    }

    public function getId()
    {
        return $this->id;
    }
    public function getFirstName()
    {
        return $this->firstName;
    }
    public function getLastName()
    {
        return $this->lastName;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getRole()
    {
        return $this->role;
    }
    public function getType()
    {
        return $this->type;
    }
}
