<?php

namespace App\Controller;

use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ImageController extends AbstractController
{
    private ImageRepository $imageRepository;

    public function __construct(ImageRepository $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    #[Route('/ws/images/add', name: 'images_add', methods: ['POST'])]
    public function addImage(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Error reading json'], Response::HTTP_BAD_REQUEST);
        }

        // Ensure $data['images'] is always an array
        $images = isset($data['images']) ? (array) $data['images'] : [];

        if (empty($images)) {
            return $this->json(['error' => 'JSON is empty or invalid. Expected format: { "images": [{}, {}] }'], Response::HTTP_BAD_REQUEST);
        }

        try {
            foreach ($images as $imageData) {
                if (!$this->imageRepository->isValidImageData($imageData)) {
                    return $this->json(['error' => 'Invalid image data'], Response::HTTP_BAD_REQUEST);
                }
                $image = $this->imageRepository->createImageFromData($imageData);
                $images[] = $image;
            }
            $this->imageRepository->addImages($images);
            return $this->json(['message' => 'Images added successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Error adding images: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/ws/images/delete/{id}', name: 'images_delete', methods: ['DELETE'])]
    public function deleteImage(int $id): JsonResponse
    {
        try {
            $this->imageRepository->deleteImage($id);
            return $this->json(['message' => 'Image deleted successfully']);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Error deleting image: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
