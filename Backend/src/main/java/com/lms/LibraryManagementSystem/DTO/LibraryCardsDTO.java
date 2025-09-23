package com.lms.LibraryManagementSystem.DTO;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class LibraryCardsDTO {
    private Integer id;
//    @FutureOrPresent(message = "Issue date cannot be in past!")
    private String issueDate;
//    @Future(message = "Expiry date cannot be in past!")
    private String expiryDate;
}
