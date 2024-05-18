package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.BookingDTO;
import dev.cyan.travel.service.BookingService;
import dev.cyan.travel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {
    private final BookingService bookingService;
    private final RoomService roomService;

    @GetMapping("/bookings")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<BookingDTO>> searchForBookings(@RequestParam(value = "userId", required = false) String userId,
                                                              @RequestParam(value = "hotelId", required = false) String hotelId) {
        if (userId != null && hotelId != null) {
            return ResponseEntity.ok(getBookingsList(hotelId, bookingService.getBookingsByUserId(userId)));
        } else if (userId != null) {
            ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
        } else if (hotelId != null) {
            return ResponseEntity.ok(getBookingsList(hotelId, bookingService.getAll()));
        }

        return ResponseEntity.ok(bookingService.getAll());
    }

    private List<BookingDTO> getBookingsList(String hotelId, List<BookingDTO> list) {
        List<BookingDTO> toReturn = new ArrayList<>();
        for (BookingDTO bookingDTO : list) {
            String tempId = roomService.getById(bookingDTO.getRoomId()).orElseThrow().getHotelId();
            if (tempId.equals(hotelId)) {
                toReturn.add(bookingDTO);
            }
        }
        return toReturn;
    }
}
