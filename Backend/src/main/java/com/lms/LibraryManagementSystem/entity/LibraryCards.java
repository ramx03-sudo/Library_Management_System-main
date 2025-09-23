package com.lms.LibraryManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "LibraryCards")
@Setter
@Getter
@NoArgsConstructor

public class LibraryCards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "issue_date", nullable = false ,unique = true)
    private String issueDate;
    @Column(name = "expiry_date", nullable = false ,unique = true)
    private String expiryDate;


}
