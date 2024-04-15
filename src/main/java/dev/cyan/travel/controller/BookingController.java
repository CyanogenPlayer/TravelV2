package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.BookingDTO;
import dev.cyan.travel.payload.response.MessageResponse;
import dev.cyan.travel.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<List<BookingDTO>> getAll() {
        return ResponseEntity.ok(bookingService.getAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<BookingDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(bookingService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> create(@Valid @RequestBody BookingDTO bookingDTO) {
        Optional<BookingDTO> optionalBookingDTO = bookingService.create(bookingDTO);
        if (optionalBookingDTO.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Booking isn't available for those dates"));
        }
        return ResponseEntity.ok(optionalBookingDTO);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody BookingDTO bookingDTO) {
        Optional<BookingDTO> optionalBookingDTO = bookingService.update(id, bookingDTO);
        if (optionalBookingDTO.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Booking isn't available for those dates"));
        }
        return ResponseEntity.ok(optionalBookingDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        bookingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<BookingDTO>> getListForUser(@PathVariable String userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }
}
