<?php

namespace App\Repository;

use App\Entity\Book;
use App\Entity\Image;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Book>
 */
class BookRepository extends ServiceEntityRepository
{
    private $imageRepository;
    public function __construct(ManagerRegistry $registry, ImageRepository $imageRepository)
    {
        parent::__construct($registry, Book::class);
        $this->imageRepository = $imageRepository;
    }

    public function isValidBookData(array $bookData): bool
    {
        $existingBook = $this->findOneBy(['isbn' => $bookData['isbn']]);
        if ($existingBook) {
            return false;
        }
        return (
            isset(
                $bookData['isbn'],
                $bookData['title'],
                $bookData['author'],
                $bookData['published'],
                $bookData['publisher'],
                $bookData['pages'],
                $bookData['description'],
                $bookData['category']
            )
        );
    }

    public function createBookFromData(array $bookData): Book
    {
        $newBook = new Book();
        $newBook->setIsbn($bookData['isbn']);
        $newBook->setTitle($bookData['title']);
        $newBook->setSubtitle($bookData['subtitle'] ?? null);
        $newBook->setAuthor($bookData['author']);
        $newBook->setPublished(new \DateTime($bookData['published']));
        $newBook->setPublisher($bookData['publisher']);
        $newBook->setPages((int) $bookData['pages']);
        $newBook->setDescription($bookData['description']);
        $newBook->setWebsite($bookData['website'] ?? null);
        $newBook->setCategory($bookData['category']);

        return $newBook;
    }

    public function addBook(Book $book): void
    {
        $this->getEntityManager()->persist($book);
        $this->getEntityManager()->flush();
    }

    public function saveBooks(array $books): void
    {
        foreach ($books as $book) {

            $this->getEntityManager()->persist($book);
        }
        $this->getEntityManager()->flush();
    }

    public function findBooksPublishedBefore(int $year): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.published < :year')
            ->setParameter('year', new \DateTime("$year-01-01"))
            ->orderBy('b.published', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findBooksByCategory(string $category): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.category = :category')
            ->setParameter('category', $category)
            ->getQuery()
            ->getResult();
    }

    public function deleteBook(string $isbn): void
    {
        $book = $this->findOneBy(['isbn' => $isbn]);
        if ($book) {
            $this->getEntityManager()->remove($book);
            $this->getEntityManager()->flush();
        }
    }

    public function serializeBooks(array $books): array
    {
        $data = [];
        foreach ($books as $book) {
            $data[] = $this->serializeBook($book);
        }
        return $data;
    }

    public function serializeBook(Book $book): array
    {
        $images = $this->imageRepository->serializeImages($book->getImages()->toArray());

        return [
            'id' => $book->getId(),
            'isbn' => $book->getIsbn(),
            'title' => $book->getTitle(),
            'author' => $book->getAuthor(),
            'published' => $book->getPublished()->format('Y-m-d'),
            'publisher' => $book->getPublisher(),
            'pages' => $book->getPages(),
            'description' => $book->getDescription(),
            'website' => $book->getWebsite(),
            'category' => $book->getCategory(),
            'images' => $images,
        ];
    }

    public function findAllOrderedByDate(): array
    {
        return $this->createQueryBuilder('b')
            ->orderBy('b.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function validateBookData(array $bookData): ?string
    {
        $existingBook = $this->findOneBy(['isbn' => $bookData['isbn']]);
        if ($existingBook) {
            return "ISBN: {$bookData['isbn']} already exists";
        }

        $requiredFields = ['isbn', 'title', 'author', 'published', 'publisher', 'pages', 'description', 'category'];
        foreach ($requiredFields as $field) {
            if (!isset($bookData[$field])) {
                return "Missing required field: $field";
            }
        }

        return null; // without errors
    }
}
