package dev.cyan.travel.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HotelDTO {
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String countryId;
    private String countryName;
}
