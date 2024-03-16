package dev.cyan.travel.DTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {
    private String id;
    private Integer roomNumber;
    @Min(value = 1, message = "must be greater than 0")
    @Max(value = 10, message = "must be less than or equal to 10")
    private Integer capacity;
    private String hotelId;
}
