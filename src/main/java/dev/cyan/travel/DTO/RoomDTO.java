package dev.cyan.travel.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {
    private String id;
    private Integer roomNumber;
    private Integer capacity;
    private String hotelId;
}
