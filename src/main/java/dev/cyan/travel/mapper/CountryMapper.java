package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.CountryDTO;
import dev.cyan.travel.entity.Country;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper
public interface CountryMapper {
    CountryDTO toDTO(Country country);

    Country fromDTO(CountryDTO countryDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCountry(@MappingTarget Country target, CountryDTO source);
}
