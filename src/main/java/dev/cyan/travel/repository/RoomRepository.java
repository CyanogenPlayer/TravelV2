package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {
    Room getById(String id);

    List<Room> findRoomsByHotel(Hotel hotel);
}
