package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.UserDTO;
import dev.cyan.travel.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(userService.getById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> updateRoles(@PathVariable String id, @Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateRoles(id, userDTO));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> delete(@PathVariable String id) {
//        userService.delete(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
