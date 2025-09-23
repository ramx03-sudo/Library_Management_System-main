package com.lms.LibraryManagementSystem.Repositories;

import com.lms.LibraryManagementSystem.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooksRepository extends JpaRepository<Books, Integer> {
    //findAll
    //findById
    //find
    //deleteByTitle
    //deleteAll
    //deleteById
    //save -> insert, update
    public Books findBytitle(String title);

}
