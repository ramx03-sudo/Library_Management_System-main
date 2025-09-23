package com.lms.LibraryManagementSystem.DTO;

import com.lms.LibraryManagementSystem.entity.Books;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class AuthorsDTO {
    private Integer id;
//    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be null or blank")
    @Pattern(regexp = "[A-Z][]a-z]+\\s[A-Z][a-z]+", message = "Name should be exactly 2 words!")
    private String name;
    @NotEmpty(message = "Books cannot be null or empty")
    @Valid
    private List<BooksDTO> booksDTO;


}
// [A-Z]
