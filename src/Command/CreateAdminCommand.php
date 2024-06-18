<?php

namespace App\Command;

use App\Service\DatabaseService;
use PDOException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateAdminCommand extends Command
{
    private DatabaseService $databaseService;

    public function __construct(DatabaseService $databaseService)
    {
        parent::__construct();
        $this->databaseService = $databaseService;
    }
    protected function configure(): void
    {
        $this
            ->setName('app:create-admin')
            ->setDescription('Creates the admin user.')
            ->setHelp('This command allows you to create an admin user...')
            ->addArgument('firstName', InputArgument::REQUIRED, 'Admin firstname')
            ->addArgument('lastName', InputArgument::REQUIRED, 'Admin lastName')
            ->addArgument('email', InputArgument::REQUIRED, 'Admin email')
            ->addArgument('password', InputArgument::REQUIRED, 'Admin password');
    }
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $firstName = $input->getArgument('firstName');
        $lastName = $input->getArgument('lastName');
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $output->writeln('Invalid email format.');
            return Command::FAILURE; // ou une autre valeur pour indiquer une erreur
        }
        try {
            $this->databaseService->createAdmin($firstName, $lastName, $email, $password);
            $output->writeln('Admin created successfully!');
            return Command::SUCCESS;
        } catch (PDOException $e) {
            $output->writeln('Error creating admin: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
