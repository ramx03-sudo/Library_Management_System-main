package com.lms.LibraryManagementSystem.Repositories;

import com.lms.LibraryManagementSystem.entity.Books;
import com.lms.LibraryManagementSystem.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewsRepository extends JpaRepository <Reviews, Integer>{
    public List<Reviews> findByBook(Books books);
}
