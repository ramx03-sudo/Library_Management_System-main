package com.lms.LibraryManagementSystem.Services;

import com.lms.LibraryManagementSystem.DTO.*;
import com.lms.LibraryManagementSystem.Exception.LibraryManagementSystemException;

import java.util.List;

public interface LibraryManagementSystemService {
    public ResponseDTO addUserAndIssueLibraryCard(UsersDTO usersDTO) throws LibraryManagementSystemException;
    public UsersDTO fetchUserAndIssueLibraryCardByEmail(String email) throws LibraryManagementSystemException;
    public ResponseDTO updateNameofUser(String email, String updatedName) throws LibraryManagementSystemException;
    public ResponseDTO deleteUserAndAssosiatedLibraryCard(String email) throws LibraryManagementSystemException;
    public ResponseDTO addAuthorAndBook(AuthorsDTO authorsDTO) throws LibraryManagementSystemException;
    public ResponseDTO addReviewToBook(String bookTitle, ReviewsDTO reviewsDTO) throws LibraryManagementSystemException;
    public List<ReviewsDTO> getAllBookReviews(String bookTitle) throws LibraryManagementSystemException;
    public ResponseDTO deleteBookAndAssociatedReviews(String bookTitle) throws LibraryManagementSystemException;



}
