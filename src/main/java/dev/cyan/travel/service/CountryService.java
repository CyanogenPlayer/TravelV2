package dev.cyan.travel.service;

import dev.cyan.travel.DTO.CountryDTO;
import dev.cyan.travel.entity.Country;
import dev.cyan.travel.mapper.CountryMapper;
import dev.cyan.travel.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    public List<CountryDTO> getAll() {
        return countryRepository
                .findAll()
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

    public void delete(String id) {
        countryRepository.deleteById(id);
    }
}
