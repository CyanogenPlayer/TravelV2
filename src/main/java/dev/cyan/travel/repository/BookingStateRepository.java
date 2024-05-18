package dev.cyan.travel.repository;

import dev.cyan.travel.entity.BookingState;
import dev.cyan.travel.enums.EBookingState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingStateRepository extends MongoRepository<BookingState, String> {
    BookingState getByName(EBookingState name);
}
