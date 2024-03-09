package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.DTO.RoomDTO;
import dev.cyan.travel.service.HotelService;
import dev.cyan.travel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/hotels")
public class HotelController {
    private final HotelService hotelService;
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAll() {
        return ResponseEntity.ok(hotelService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(hotelService.getById(id));
    }

    @PostMapping
    public ResponseEntity<HotelDTO> create(@RequestBody HotelDTO hotelDTO) {
        return ResponseEntity.ok(hotelService.create(hotelDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HotelDTO> update(@PathVariable String id, @RequestBody HotelDTO hotelDTO) {
        return ResponseEntity.ok(hotelService.update(id, hotelDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        hotelService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/rooms")
    public ResponseEntity<List<RoomDTO>> getRoomsInHotel(@PathVariable String id) {
        return ResponseEntity.ok(roomService.getRoomsByHotelId(id));
    }
}
