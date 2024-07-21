<?php

namespace App\Tests\Controller;

use Symfony\Component\Panther\PantherTestCase;

class SecurityControllerTest extends PantherTestCase
{


    public function testLoginFailure()
    {
        $client = static::createPantherClient([
            'webServerDir' => __DIR__ . '/../../public',
            'port' => 9516
        ]);

        $crawler = $client->request('GET', '/connexion');

        $form = $crawler->selectButton('Se connecter')->form([
            'email' => 'admin.test@test.com',
            'password' => 'wrongpassword',
        ]);
        $client->submit($form);

        $client->waitFor('#loginFormContainer');


        $this->assertStringContainsString('Connexion', $client->getCrawler()->filter('h1')->text());
    }
}
