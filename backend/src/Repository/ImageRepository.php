<?php

namespace App\Repository;

use App\Entity\Image;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Image>
 */
class ImageRepository extends ServiceEntityRepository
{
    private $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Image::class);
        $this->entityManager = $entityManager;
    }

    public function serializeImages(array $images): array
    {
        $data = [];
        foreach ($images as $image) {
            $data[] = [
                'id' => $image->getId(),
                'url' => $image->getUrl(),
            ];
        }
        return $data;
    }


    public function isValidImageData($data): bool
    {
        return is_string($data) && !empty($data);
    }

    public function createAndPersistImages(array $imageDataArray, $book): void
    {
        foreach ($imageDataArray as $imageData) {
            if (!$this->isValidImageData($imageData)) {
                throw new \InvalidArgumentException('Invalid image data');
            }
            $image = new Image();
            $image->setUrl($imageData);
            $image->setBook($book);
            $this->entityManager->persist($image);
        }
    }
}
