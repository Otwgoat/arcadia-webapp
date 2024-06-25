<?php

namespace App\Model;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class Habitat
{
    #[Groups(['getHabitat', 'getHabitats'])]
    private $id;

    #[Assert\NotBlank(message: 'Le nom de l\'habitat est obligatoire.')]
    #[Groups(['getHabitat', 'getHabitats'])]
    private $name;

    #[Assert\NotBlank(message: 'La description de l\'habitat est obligatoire.')]
    #[Groups(['getHabitat', 'getHabitats'])]
    private $description;

    #[Groups(['getHabitat'])]
    private $animals;


    public function __construct($id, $name, $description)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
    }

    public function getId()
    {
        return $this->id;
    }
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function getName()
    {
        return $this->name;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getAnimals()
    {
        return $this->animals;
    }

    public function setAnimals(array $animals)
    {
        $this->animals = $animals;
        return $this;
    }
}
