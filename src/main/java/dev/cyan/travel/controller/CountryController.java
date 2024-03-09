package dev.cyan.travel.controller;

import dev.cyan.travel.DTO.CountryDTO;
import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.service.CountryService;
import dev.cyan.travel.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/countries")
public class CountryController {
    private final CountryService countryService;
    private final HotelService hotelService;

    @GetMapping
    public ResponseEntity<List<CountryDTO>> getAll() {
        return ResponseEntity.ok(countryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryDTO> getById(@PathVariable String id) {
        return ResponseEntity.of(countryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CountryDTO> create(@RequestBody CountryDTO countryDTO) {
        return ResponseEntity.ok(countryService.create(countryDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CountryDTO> update(@PathVariable String id, @RequestBody CountryDTO countryDTO) {
        return ResponseEntity.ok(countryService.update(id, countryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        countryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/hotels")
    public ResponseEntity<List<HotelDTO>> getHotelsInCountry(@PathVariable String id) {
        return ResponseEntity.ok(hotelService.getHotelsByCountryId(id));
    }
}
