<?php

namespace App\Repository;

use App\Entity\Book;
use App\Entity\Image;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Image>
 */
class ImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Image::class);
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

    public function isValidImageData(array $imageData): bool
    {
        if (isset($imageData['book_id'])) {
            $bookRepository = $this->getEntityManager()->getRepository(Book::class);
            $existingBook = $bookRepository->findOneBy(['id' => $imageData['book_id']]);
            if (!$existingBook) {
                return false;
            }
        }
        return isset($imageData['url']);
    }

    public function createImageFromData(array $imageData): Image
    {
        $image = new Image();
        $image->setUrl($imageData['url']);

        $bookRepository = $this->getEntityManager()->getRepository(Book::class);
        $book = $bookRepository->find($imageData['book_id']);
        if ($book) {
            $image->setBook($book);
        }

        return $image;
    }
    public function addImages(array $images): void
    {
        foreach ($images as $image) {
            $this->getEntityManager()->persist($image);
        }
        $this->getEntityManager()->flush();
    }

    public function deleteImage(int $id): void
    {
        $image = $this->find($id);
        if ($image) {
            $this->getEntityManager()->remove($image);
            $this->getEntityManager()->flush();
        }
    }
}
