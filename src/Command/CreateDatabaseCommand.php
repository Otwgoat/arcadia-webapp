<?php

namespace App\Command;


use App\Service\DatabaseService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateDatabaseCommand extends Command
{

    private $databaseService;


    public function __construct(DatabaseService $databaseService)
    {
        parent::__construct();
        $this->databaseService = $databaseService;
    }

    protected function configure(): void
    {
        $this
            ->setName('app:create-database')
            ->setDescription('Creates the database.')
            ->setHelp('This command allows you to create a database...');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $databaseName = $_ENV['DATABASE_NAME'];
        $this->databaseService->createDatabase($databaseName);
        $output->writeln("Database " . $databaseName . " created successfully!");

        return Command::SUCCESS;
    }
}
