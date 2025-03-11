<?php
namespace App\Controller;

use App\Entity\Book;
use App\Entity\Image;
use App\Repository\BookRepository;
use App\Repository\ImageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class BookController extends AbstractController
{
    private BookRepository $bookRepository;
    private ImageRepository $imageRepository;
    private $entityManager;

    public function __construct(BookRepository $bookRepository, ImageRepository $imageRepository, EntityManagerInterface $entityManager)
    {
        $this->bookRepository = $bookRepository;
        $this->imageRepository = $imageRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/book', name: 'app_book')]
    public function index(): Response
    {
        return $this->render('book/index.html.twig', [
            'controller_name' => 'BookController',
        ]);
    }

    #[Route('/ws/import-books', name: 'import_books', methods: ['POST'])]
    public function importBooks(Request $request): JsonResponse
    {
        $file = $request->files->get('file');
        if (!$file) {
            return $this->json(['error' => 'No file uploaded'], Response::HTTP_BAD_REQUEST);
        }

        $content = file_get_contents($file->getPathname());
        $data = json_decode($content, true);

        if (!isset($data['books']) || !is_array($data['books'])) {
            return $this->json(['error' => 'Invalid JSON format'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $books = [];
            foreach ($data['books'] as $bookData) {
                if (!$this->bookRepository->isValidBookData($bookData)) {
                    return $this->json(['error' => 'Invalid book data'], Response::HTTP_BAD_REQUEST);
                }
                $book = $this->bookRepository->createBookFromData($bookData);
                $books[] = $book;
            }
            $this->bookRepository->addBooks($books);
            return $this->json(['message' => 'Books imported successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Error importing books: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/ws/books/add', name: 'books_add', methods: ['POST'])]
    public function addBook(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Error reading json'], Response::HTTP_BAD_REQUEST);
        }

        if (!($this->bookRepository->isValidBookData($data))) {
            return $this->json(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $book = $this->bookRepository->createBookFromData($data);
        $this->bookRepository->addBook($book);

        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $imageData) {
                $image = new Image();
                $image->setUrl($imageData);
                $image->setBook($book);
                $this->entityManager->persist($image);
            }
        }

        $this->entityManager->flush();
        
        return $this->json(['message' => 'Book added successfully'], Response::HTTP_CREATED);
    }

    #[Route('/ws/books', name: 'books', methods: ['GET'])]
    public function getAllBooks(): JsonResponse
    {
        $books = $this->bookRepository->findAll();
        $data = $this->bookRepository->serializeBooks($books);

        return $this->json($data);
    }

    #[Route('/ws/books/published-before/{year}', name: 'books_published_before', methods: ['GET'])]
    public function getBooksPublishedBefore(int $year): JsonResponse
    {
        $books = $this->bookRepository->findBooksPublishedBefore($year);
        $data = $this->bookRepository->serializeBooks($books);

        return $this->json($data);
    }

    #[Route('/ws/books/category/{category}', name: 'books_category', methods: ['GET'])]
    public function getBooksByCategory(string $category): JsonResponse
    {
        $books = $this->bookRepository->findBooksByCategory($category);
        $data = $this->bookRepository->serializeBooks($books);

        return $this->json($data);
    }

    #[Route('/ws/books/isbn/{isbn}', name: 'books_isbn', methods: ['GET'])]
    public function getBookByIsbn(string $isbn): JsonResponse
    {
        $book = $this->bookRepository->findOneBy(['isbn' => $isbn]);

        if (!$book) {
            return $this->json(['error' => 'Book not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = $this->bookRepository->serializeBook($book);

        return $this->json($data);
    }

    #[Route('/ws/books/{isbn}/delete', name: 'books_isbn_delete', methods: ['DELETE'])]
    public function deleteBook(string $isbn): JsonResponse
    {
        $book = $this->bookRepository->findOneBy(['isbn' => $isbn]);

        if (!$book) {
            return $this->json(['error' => 'Book not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        
        try {
            $this->bookRepository->deleteBook($isbn);
            return $this->json(['message' => 'Book deleted successfully']);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Error deleting book: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}