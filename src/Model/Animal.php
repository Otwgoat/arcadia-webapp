<?php

namespace App\Model;


use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class Animal
{
    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    private $id;

    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire.')]
    private $firstName;

    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    #[Assert\NotBlank(message: 'La race de l\'animal est obligatoire.')]
    private $race;

    #[Groups(['getAnimal', 'getAnimals'])]
    private $birthDate;

    #[Groups(['getAnimal'])]
    #[Assert\NotBlank(message: 'La description de l\'animal est obligatoire.')]
    private $description;


    private $habitatId;

    #[Groups(['getAnimal', 'getAnimals'])]
    private $images;

    #[Groups(['getAnimal'])]
    private $lastVeterinaryReport;

    #[Groups(['getAnimal'])]
    private $lastFeedingReport;

    public function __construct($id, $firstName, $race, $birthDate, $description)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->race = $race;
        $this->birthDate = $birthDate;
        $this->description = $description;
    }
    public function getId()
    {
        return $this->id;
    }
    public function getFirstName()
    {
        return $this->firstName;
    }
    public function getRace()
    {
        return $this->race;
    }
    public function getBirthDate()
    {
        return $this->birthDate;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function getHabitatId()
    {
        return $this->habitatId;
    }
    public function setHabitatId(Habitat $habitatId)
    {
        $this->habitatId = $habitatId;
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

    public function getLastVeterinaryReport()
    {
        return $this->lastVeterinaryReport;
    }

    public function setLastVeterinaryReport(array $lastVeterinaryReport)
    {
        $this->lastVeterinaryReport = $lastVeterinaryReport;
        return $this;
    }

    public function getLastFeedingReport()
    {
        return $this->lastFeedingReport;
    }

    public function setLastFeedingReport(array $lastFeedingReport)
    {
        $this->lastFeedingReport = $lastFeedingReport;
        return $this;
    }
}
