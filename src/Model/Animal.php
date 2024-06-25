<?php

namespace App\Model;


use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class Animal
{
    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    private $id;

    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    #[Assert\NotBlank(message: 'Le nom de l\'animal est obligatoire.')]
    private $firstName;

    #[Groups(['getAnimal', 'getAnimals', 'getHabitat'])]
    #[Assert\NotBlank(message: 'La race de l\'animal est obligatoire.')]
    private $race;

    #[Groups(['getAnimal', 'getAnimals'])]
    #[Assert\NotBlank(message: 'La date de naissance de l\'animal est obligatoire.')]
    #[Assert\LessThanOrEqual('today', message: 'La date de naissance ne peut pas être supérieure à la date actuelle.')]
    private $birthDate;

    #[Groups(['getAnimal', 'getAnimals'])]
    #[Assert\NotBlank(message: 'La description de l\'animal est obligatoire.')]
    private $description;

    #[Groups(['getAnimal', 'getAnimals'])]
    private $habitatId;

    #[Groups(['getAnimal', 'getAnimals'])]
    private $gender;



    #[Groups(['getAnimal'])]
    private $lastVeterinaryReport;

    #[Groups(['getAnimal'])]
    private $lastFeedingReport;

    public function __construct($id, $firstName, $race, $birthDate, $description, $gender, $habitatId)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->race = $race;
        $this->birthDate = $birthDate;
        $this->description = $description;
        $this->habitatId = $habitatId;
        $this->gender = $gender;
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

    public function getGender()
    {
        return $this->gender;
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
