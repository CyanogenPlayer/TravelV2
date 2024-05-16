package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.DTO.RoomDTO;
import dev.cyan.travel.exception.CannotDeleteException;
import dev.cyan.travel.response.MessageResponse;
import dev.cyan.travel.service.HotelService;
import dev.cyan.travel.service.PhotoService;
import dev.cyan.travel.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/hotels")
public class HotelController {
    private final HotelService hotelService;
    private final RoomService roomService;
    private final PhotoService photoService;

    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAll() {
        return ResponseEntity.ok(hotelService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(hotelService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<HotelDTO> create(@Valid @RequestBody HotelDTO hotelDTO) {
        return ResponseEntity.ok(hotelService.create(hotelDTO));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<HotelDTO> update(@PathVariable String id, @Valid @RequestBody HotelDTO hotelDTO) {
        return ResponseEntity.ok(hotelService.update(id, hotelDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> delete(@PathVariable String id) throws CannotDeleteException {
        hotelService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/rooms")
    public ResponseEntity<List<RoomDTO>> getRoomsInHotel(@PathVariable String id,
                                                         @RequestParam(value = "bookedSince", required = false) String bookedSince,
                                                         @RequestParam(value = "bookedTo", required = false) String bookedTo) {
        if (bookedSince != null && bookedTo != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

            return ResponseEntity.ok(
                    roomService.getAllAvailableRoomsForPeriod(id,
                            LocalDate.parse(bookedSince, formatter),
                            LocalDate.parse(bookedTo, formatter)));
        }

        return ResponseEntity.ok(roomService.getRoomsByHotelId(id));
    }

    @PostMapping("/{id}/photos")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<MessageResponse> addPhotosOfHotel(@PathVariable String id,
                                                           @RequestParam("photos") MultipartFile[] files) throws IOException {
        HotelDTO hotelDTO = hotelService.getById(id).orElseThrow();

        Set<String> photosUrls = hotelDTO.getPhotosUrls();
        for (MultipartFile file : files) {
            photosUrls.add(photoService.add(file));
        }

        hotelDTO.setPhotosUrls(photosUrls);
        hotelService.update(id, hotelDTO);

        return ResponseEntity.ok(new MessageResponse("Photo uploaded successfully!"));
    }

    @DeleteMapping("/{id}/photos")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Void> deletePhotoOfHotel(@PathVariable String id,
                                       @RequestParam("photoUrl") String photoUrl) throws IOException {
        HotelDTO hotelDTO = hotelService.getById(id).orElseThrow();

        Set<String> photosUrls = hotelDTO.getPhotosUrls();
        photosUrls.removeIf(url -> url.equals(photoUrl));

        hotelDTO.setPhotosUrls(photosUrls);
        hotelService.update(id, hotelDTO);

        photoService.delete(photoUrl);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
