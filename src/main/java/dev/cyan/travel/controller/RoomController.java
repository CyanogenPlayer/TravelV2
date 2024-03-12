package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.RoomDTO;
import dev.cyan.travel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAll() {
        return ResponseEntity.ok(roomService.getAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<RoomDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(roomService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<RoomDTO> create(@RequestBody RoomDTO roomDTO) {
        return ResponseEntity.ok(roomService.create(roomDTO));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<RoomDTO> update(@PathVariable String id, @RequestBody RoomDTO roomDTO) {
        return ResponseEntity.ok(roomService.update(id, roomDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        roomService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //TODO add booking for role USER
}
