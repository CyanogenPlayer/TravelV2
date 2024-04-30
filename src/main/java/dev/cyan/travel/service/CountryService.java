package dev.cyan.travel.service;

import dev.cyan.travel.DTO.CountryDTO;
import dev.cyan.travel.entity.Country;
import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.exception.CannotDeleteException;
import dev.cyan.travel.mapper.CountryMapper;
import dev.cyan.travel.repository.CountryRepository;
import dev.cyan.travel.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;
    private final HotelRepository hotelRepository;
    private final CountryMapper countryMapper;

    public List<CountryDTO> getAll() {
        return countryRepository
                .findAllByOrderByName()
                .stream()
                .map(countryMapper::toDTO)
                .toList();
    }

    public Optional<CountryDTO> getById(String id) {
        return countryRepository
                .findById(id)
                .map(countryMapper::toDTO);
    }

    public CountryDTO create(CountryDTO countryDTO) {
        Country country = countryMapper.fromDTO(countryDTO);
        Country createdCountry = countryRepository.save(country);
        return countryMapper.toDTO(createdCountry);
    }

    public CountryDTO update(String id, CountryDTO countryDTO) {
        Country country = countryRepository
                .findById(id)
                .orElseThrow();
        countryMapper.updateCountry(country, countryDTO);
        Country modifiedCountry = countryRepository.save(country);
        return countryMapper.toDTO(modifiedCountry);
    }

    public void delete(String id) throws CannotDeleteException {
        Country country = countryRepository
                .findById(id)
                .orElseThrow();
        List<Hotel> hotels = hotelRepository.findHotelsByCountry(country);
        if (hotels.isEmpty()) {
            countryRepository.deleteById(id);
        } else {
            throw new CannotDeleteException("Cannot delete this country because there are hotels in this country");
        }
    }
}
