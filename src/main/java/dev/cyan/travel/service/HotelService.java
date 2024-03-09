package dev.cyan.travel.service;

import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.entity.Country;
import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.mapper.HotelMapper;
import dev.cyan.travel.repository.CountryRepository;
import dev.cyan.travel.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final CountryRepository countryRepository;
    private final HotelMapper hotelMapper;

    public List<HotelDTO> getAll() {
        return hotelRepository
                .findAll()
                .stream()
                .map(hotelMapper::toDTO)
                .toList();
    }

    public Optional<HotelDTO> getById(String id) {
        return hotelRepository
                .findById(id)
                .map(hotelMapper::toDTO);
    }

    public HotelDTO create(HotelDTO hotelDTO) {
        countryRepository.findById(hotelDTO.getCountryId()).orElseThrow();
        Hotel hotel = hotelMapper.fromDTO(hotelDTO);
        Hotel createdHotel = hotelRepository.save(hotel);
        return hotelMapper.toDTO(createdHotel);
    }

    public HotelDTO update(String id, HotelDTO hotelDTO) {
        countryRepository.findById(hotelDTO.getCountryId()).orElseThrow();
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow();
        hotelMapper.updateHotel(hotel, hotelDTO);
        Hotel modifiedHotel = hotelRepository.save(hotel);
        return hotelMapper.toDTO(modifiedHotel);
    }

    public void delete(String id) {
        hotelRepository.deleteById(id);
    }

    public List<HotelDTO> getHotelsByCountryId(String id) {
        Country country = countryRepository.findById(id).orElseThrow();
        List<Hotel> hotelsByCountry = hotelRepository
                .findHotelsByCountry(country);
        return hotelsByCountry
                .stream()
                .map(hotelMapper::toDTO)
                .toList();
    }
}
