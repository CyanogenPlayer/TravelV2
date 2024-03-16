package dev.cyan.travel.DTO;

import jakarta.validation.constraints.FutureOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingDTO {
    private String id;
    @FutureOrPresent(message = "not valid bookedSince date")
    private LocalDate bookedSince;
    @FutureOrPresent(message = "not valid bookedTo date")
    private LocalDate bookedTo;
    private String roomId;
    private String userId;
}
