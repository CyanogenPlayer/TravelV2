package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Booking;
import dev.cyan.travel.entity.Room;
import dev.cyan.travel.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, ObjectId> {
    Optional<Booking> findById(String id);

    List<Booking> findBookingsByUser(User user);

    List<Booking> findBookingsByRoom(Room room);

    void deleteById(String id);

    List<Booking> findBookingsByRoomAndBookedSinceAndBookedTo(Room room, LocalDate bookedSince, LocalDate bookedTo);
}
