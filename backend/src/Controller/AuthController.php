<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthController extends AbstractController
{
    #[Route('/ws/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
       $data = json_decode($request->getContent(), true);

       if (!$data || !isset($data['email'], $data['password'])) {
        return new JsonResponse(['message' => 'Missing email or password'], JsonResponse::HTTP_BAD_REQUEST);
       }

       $user = new User();
       $user->setEmail($data['email']);
       $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
       $user->setRoles(['ROLE_USER']);

       $entityManager->persist($user);
       $entityManager->flush();

       return new JsonResponse(['message' => 'User registered'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/ws/login', name: 'login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Credentials are incorrect'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        return new JsonResponse([
            'email' => $user->getEmail(), 
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/ws/me', name: 'me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Not authenticated'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        return new JsonResponse([
            'email' => $user->getEmail(), 
            'roles' => $user->getRoles(),
        ]);
    }
}