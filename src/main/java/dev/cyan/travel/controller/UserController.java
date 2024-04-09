package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.UserDTO;
import dev.cyan.travel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@PreAuthorize("hasRole('MANAGER')")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @PostMapping("/{id}")
    public ResponseEntity<UserDTO> updateRoles(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateRoles(id, userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
