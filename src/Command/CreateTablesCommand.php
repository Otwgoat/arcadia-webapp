<?php

namespace App\Command;

use App\Service\DatabaseService;
use App\Service\TablesService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateTablesCommand extends Command
{
    private $tablesService;

    public function __construct(TablesService $tablesService)
    {
        parent::__construct();
        $this->tablesService = $tablesService;
    }
    protected function configure(): void
    {
        $this
            ->setName('app:create-tables')
            ->setDescription('Creates the tables.')
            ->setHelp('This command allows you to create tables...');
    }
    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $sqlFilePath = 'src/sql/createTables.sql';
        $this->tablesService->createTableFromSqlFile($sqlFilePath);
        $output->writeln('Tables created successfully!');
        return Command::SUCCESS;
    }
}
