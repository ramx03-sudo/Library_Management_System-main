package com.lms.LibraryManagementSystem.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UsersDTO {
    private Integer id;
    @NotBlank(message = "Name cannot be null or blank")
    @Pattern(regexp = "[A-Z][]a-z]+\\s[A-Z][a-z]+", message = "Name should be exactly 2 words!")
    private String name;
    @Email(message = "Email should be valid")
    private String email;
    @NotNull(message = "Library Card cannot be null")
    @Valid
    private LibraryCardsDTO libraryCardsDTO;
}
