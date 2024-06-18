<?php

namespace App\Model;

use Symfony\Component\Serializer\Annotation\Groups;

class Habitat
{
    #[Groups(['getHabitat', 'getHabitats'])]
    private $id;

    #[Groups(['getHabitat', 'getHabitats'])]
    private $name;

    #[Groups(['getHabitat', 'getHabitats'])]
    private $description;

    #[Groups(['getHabitat'])]
    private $animals;

    #[Groups(['getHabitat', 'getHabitats'])]
    private $images;

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

    public function getImages()
    {
        return $this->images;
    }

    public function setImages(array $images)
    {
        $this->images = $images;
        return $this;
    }
}
