package dev.cyan.travel.service;

import dev.cyan.travel.DTO.BookingDTO;
import dev.cyan.travel.entity.Booking;
import dev.cyan.travel.entity.Room;
import dev.cyan.travel.entity.User;
import dev.cyan.travel.mapper.BookingMapper;
import dev.cyan.travel.repository.BookingRepository;
import dev.cyan.travel.repository.RoomRepository;
import dev.cyan.travel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;

    public List<BookingDTO> getAll() {
        return bookingRepository
                .findAll()
                .stream()
                .map(bookingMapper::toDTO)
                .toList();
    }

    public Optional<BookingDTO> getById(String id) {
        return bookingRepository
                .findById(id)
                .map(bookingMapper::toDTO);
    }

    public Optional<BookingDTO> create(BookingDTO bookingDTO) {
        roomRepository.findById(bookingDTO.getRoomId()).orElseThrow();
        userRepository.findById(bookingDTO.getUserId()).orElseThrow();
        Booking booking = bookingMapper.fromDTO(bookingDTO);
        if (checkIfBooleanIsAvailable(booking.getRoom(), booking.getBookedSince(), booking.getBookedTo())) {
            Booking createdBooking = bookingRepository.save(booking);
            return Optional.of(bookingMapper.toDTO(createdBooking));
        }

        return Optional.empty();
    }

    private Boolean checkIfBooleanIsAvailable(Room room, LocalDate bookedSince, LocalDate bookedTo) {
        if (bookedSince == null || bookedTo == null || bookedSince.isAfter(bookedTo)) {
            return false;
        }

        List<Booking> bookings = bookingRepository
                .findBookingsByRoomAndBookedSinceAndBookedTo(room, bookedSince, bookedTo);
        return bookings.isEmpty();
    }

    public BookingDTO update(String id, BookingDTO bookingDTO) {
        roomRepository.findById(bookingDTO.getRoomId()).orElseThrow();
        userRepository.findById(bookingDTO.getUserId()).orElseThrow();
        Booking booking = bookingRepository.findById(id).orElseThrow();
        bookingMapper.updateBooking(booking, bookingDTO);
        Booking modifiedBooking = bookingRepository.save(booking);
        return bookingMapper.toDTO(modifiedBooking);
    }

    public void delete(String id) {
        bookingRepository.deleteById(id);
    }

    public List<BookingDTO> getBookingsByUserId(String id) {
        User user = userRepository.findById(id).orElseThrow();
        List<Booking> bookingsByUser = bookingRepository
                .findBookingsByUser(user);
        return bookingsByUser
                .stream()
                .map(bookingMapper::toDTO)
                .toList();
    }

    public List<BookingDTO> getBookingsByRoomId(String id) {
        Room room = roomRepository.findById(id).orElseThrow();
        List<Booking> bookingsByRoom = bookingRepository
                .findBookingsByRoom(room);
        return bookingsByRoom
                .stream()
                .map(bookingMapper::toDTO)
                .toList();
    }
}
