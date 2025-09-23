package com.lms.LibraryManagementSystem.Controller;

import com.lms.LibraryManagementSystem.DTO.AuthorsDTO;
import com.lms.LibraryManagementSystem.DTO.ResponseDTO;
import com.lms.LibraryManagementSystem.DTO.ReviewsDTO;
import com.lms.LibraryManagementSystem.DTO.UsersDTO;
import com.lms.LibraryManagementSystem.Exception.LibraryManagementSystemException;
import com.lms.LibraryManagementSystem.Services.LibraryManagementSystemService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lms")
@CrossOrigin
@Validated
public class LibraryManagementSystemController {
    @Autowired
    LibraryManagementSystemService libraryManagementSystemService;

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseDTO> createUser(@RequestBody @Valid UsersDTO usersDTO) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.addUserAndIssueLibraryCard(usersDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<UsersDTO> fetchUserAndIssueLibraryCardByEmail(@PathVariable @Email(message = "Email should be of valid format!") String email) throws LibraryManagementSystemException {
//        return libraryManagementSystemService.fetchUserAndIssueLibraryCardByEmail(email);
        UsersDTO usersDTO = libraryManagementSystemService.fetchUserAndIssueLibraryCardByEmail(email);
        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }
    @PutMapping("/user/{email}")
    public ResponseEntity<ResponseDTO> updateNameofUser(@PathVariable @Email(message = "Email should be valid!") String email, @RequestBody @Valid String updatedName) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.updateNameofUser(email, updatedName);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @DeleteMapping("/user/{email}")
    public ResponseEntity<ResponseDTO> deleteUserAndAssosiatedLibraryCard(@PathVariable @Email(message = "Email should be of valid format!") String email) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.deleteUserAndAssosiatedLibraryCard(email);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @PostMapping("/author")
    public ResponseEntity<ResponseDTO> addAuthorAndBook(@RequestBody @Valid AuthorsDTO authorsDTO) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.addAuthorAndBook(authorsDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
    @PostMapping("/book/{bookTitle}/review")
    public ResponseEntity<ResponseDTO> addReviewToBook(@PathVariable @NotBlank(message = "Book name should not be blank or null!") String bookTitle, @RequestBody @Valid ReviewsDTO reviewsDTO) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.addReviewToBook(bookTitle, reviewsDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
    @GetMapping("/book/{bookTitle}/reviews")
    public ResponseEntity<List<ReviewsDTO>> getAllBookReviews(@PathVariable @NotBlank(message = "Book name should not be blank or null!") String bookTitle) throws LibraryManagementSystemException {
        List<ReviewsDTO> reviewsDTOList = libraryManagementSystemService.getAllBookReviews(bookTitle);
        return new ResponseEntity<>(reviewsDTOList, HttpStatus.OK);
    }
    @DeleteMapping("/book/{bookTitle}/reviews")
    public ResponseEntity<ResponseDTO> deleteBookAndAssociatedReviews(@PathVariable @NotBlank(message = "Book Name should not be blank or null!") String bookTitle) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.deleteBookAndAssociatedReviews(bookTitle);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }


}
