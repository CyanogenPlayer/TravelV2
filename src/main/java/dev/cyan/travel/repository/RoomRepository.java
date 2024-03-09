package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.entity.Room;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends MongoRepository<Room, ObjectId> {
    Optional<Room> findById(String id);

    List<Room> findRoomsByHotel(Hotel hotel);

    void deleteById(String id);
}
