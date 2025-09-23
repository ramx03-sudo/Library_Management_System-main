package com.lms.LibraryManagementSystem.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ReviewsDTO {
    private Integer id;
    @NotNull(message = "Rating cannot be null or blank")
    @Max(value = 5, message = "Rating should be atmost 5")
    @Min(value = 1, message = "Rating should be atleast 1")
    private Integer rating;
    @NotBlank(message = "Comments cannot be null or blank")
    private String comments;
//    @NotBlank(message = "Book cannot be null or blank")
    @Valid
    private BooksDTO booksDTO;
}
