package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Country;
import dev.cyan.travel.entity.Hotel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {
    Optional<Hotel> findById(String id);

    Hotel getById(String id);

    List<Hotel> findHotelsByCountry(Country country);

    void deleteById(String id);
}