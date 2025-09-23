package com.lms.LibraryManagementSystem.Services;

import com.lms.LibraryManagementSystem.DTO.*;
import com.lms.LibraryManagementSystem.Exception.LibraryManagementSystemException;
import com.lms.LibraryManagementSystem.Repositories.*;
import com.lms.LibraryManagementSystem.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LibraryManagementServiceImpl implements LibraryManagementSystemService{
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private BooksRepository booksRepository;
    @Autowired
    private LibraryCardsRepository libraryCardsRepository;
    @Autowired
    private ReviewsRepository reviewsRepository;
    @Override
    public ResponseDTO addUserAndIssueLibraryCard(UsersDTO usersDTO) throws LibraryManagementSystemException {
        Users user = usersRepository.findByEmail(usersDTO.getEmail());
        if(user != null){
            throw new LibraryManagementSystemException("User already exists");
        }
        user = new Users();
        user.setName(usersDTO.getName());
        user.setEmail(usersDTO.getEmail());

        LibraryCards libraryCard = new LibraryCards();
        libraryCard.setIssueDate(usersDTO.getLibraryCardsDTO().getIssueDate());
        libraryCard.setExpiryDate(usersDTO.getLibraryCardsDTO().getExpiryDate());
        user.setLibraryCards(libraryCard);
        usersRepository.save(user);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("User added successfully! with User Id: " + user.getId() + " and Library Card Id: " + user.getLibraryCards().getId() + "!");
        return responseDTO;


//        return null;
    }

    @Override
    public UsersDTO fetchUserAndIssueLibraryCardByEmail(String email) throws LibraryManagementSystemException {
        Users user = usersRepository.findByEmail(email);
        if(user == null){
            throw new LibraryManagementSystemException("User does not exist");
        }
        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setId(user.getId());
        usersDTO.setName(user.getName());
        usersDTO.setEmail(user.getEmail());
        LibraryCardsDTO libraryCardsDTO = new LibraryCardsDTO();
        libraryCardsDTO.setId(user.getLibraryCards().getId());
        libraryCardsDTO.setIssueDate(user.getLibraryCards().getIssueDate());
        libraryCardsDTO.setExpiryDate(user.getLibraryCards().getExpiryDate());
        usersDTO.setLibraryCardsDTO(libraryCardsDTO);
        return usersDTO;
//        return null;
    }

    @Override
    public ResponseDTO updateNameofUser(String email, String updatedName) throws LibraryManagementSystemException {
        Users user = usersRepository.findByEmail(email);
        if(user == null){
            throw new LibraryManagementSystemException("No User found with email: " + email);
        }
        user.setName(updatedName);
        usersRepository.save(user);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("User name updated successfully!");
        return responseDTO;
    }

    @Override
    public ResponseDTO deleteUserAndAssosiatedLibraryCard(String email) throws LibraryManagementSystemException {
        Users user = usersRepository.findByEmail(email);
        if(user == null){
            throw new LibraryManagementSystemException("No user found with email: " + email);
        }
//        if(user.getLibraryCards() != null){
//            libraryCardsRepository.delete(user.getLibraryCards());
//        }
        usersRepository.delete(user);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("User deleted successfully!");
        return responseDTO;

//        return null;

    }

    @Override
    public ResponseDTO addAuthorAndBook(AuthorsDTO authorsDTO) {
        Authors author = authorRepository.findByName(authorsDTO.getName());
        if(author==null){
            author = new Authors();
            author.setName(authorsDTO.getName());
            authorRepository.save(author);
        }
//            authorsDTO.getBooks().forEach(bookDTO -> {
//            Books book = bookRepository.findByBookTitle(bookDTO.getTitle());
//            if (book == null) {
//                Books book1 = new Books();
//                book1.setTitle(bookDTO.getTitle());
//             book.setAuthor(author);
//                bookRepository.save(book1);
//            }
//        });
        List<Books> booksList = new ArrayList<>();
        for(BooksDTO booksDTO: authorsDTO.getBooksDTO()){
            Books book = new Books();
            book.setTitle(booksDTO.getTitle());
            booksList.add(book);
        }
        author.setBooks(booksList);
        authorRepository.save(author);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("Author and books linked successfully!");
        return responseDTO;
    }

    @Override
    public ResponseDTO addReviewToBook(String bookTitle, ReviewsDTO reviewsDTO) throws LibraryManagementSystemException {
        if (bookTitle == null || reviewsDTO == null) {
            throw new LibraryManagementSystemException("Book title or review cannot be null.");
        }

        // Fetch the book by title
        Books book = booksRepository.findBytitle(bookTitle);
        if (book == null) {
            throw new LibraryManagementSystemException("No book found with title: " + bookTitle);
        }


        Reviews review = new Reviews();
        review.setBook(book);
        review.setRating(reviewsDTO.getRating());
        review.setComment(reviewsDTO.getComments());

        reviewsRepository.save(review);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("Review added successfully to the book: " + bookTitle);
        return responseDTO;
    }

    @Override
    public List<ReviewsDTO> getAllBookReviews(String bookTitle) throws LibraryManagementSystemException {
        Books book = booksRepository.findBytitle(bookTitle);
        if(book == null){
            throw new LibraryManagementSystemException("No Book found by name: " + bookTitle);
        }
        List<Reviews> reviewsList = reviewsRepository.findByBook(book);
        List<ReviewsDTO> reviewsDTOList = new ArrayList<>();
        for(Reviews review: reviewsList){
            ReviewsDTO reviewsDTO = new ReviewsDTO();
            reviewsDTO.setRating(review.getRating());
            reviewsDTO.setComments(review.getComment());
            reviewsDTOList.add(reviewsDTO);
        }

        return reviewsDTOList;
    }

    @Override
    public ResponseDTO deleteBookAndAssociatedReviews(String bookTitle) throws LibraryManagementSystemException {
        Books book = booksRepository.findBytitle(bookTitle);
        if(book == null){
            throw new LibraryManagementSystemException("No book found with name: "+bookTitle);
        }
        List<Reviews> reviewsList = reviewsRepository.findByBook(book);
        reviewsRepository.deleteAll(reviewsList);
        booksRepository.delete(book);
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("Book and associated reviews for book:" + bookTitle + " deleted successfully!");
        return responseDTO;

//        return null;
    }
}
