<?php

namespace App\EventListener;

use App\Model\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;




class JWTCreatedListener
{


    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        if ($user instanceof User) {
            $payload = $event->getData();
            $payload['type'] = $user->getType();
            $event->setData($payload);
            $header = $event->getHeader();
            $header['cty'] = 'JWT';
            $event->setHeader($header);
        };
    }
}
