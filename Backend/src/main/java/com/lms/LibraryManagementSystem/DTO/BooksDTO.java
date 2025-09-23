package com.lms.LibraryManagementSystem.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BooksDTO {
    private Integer id;
    @NotBlank(message = "Name cannot be null or blank")
    private String title;
}
