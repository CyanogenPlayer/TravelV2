package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.CountryDTO;
import dev.cyan.travel.entity.Country;
import org.mapstruct.*;

@Mapper
public interface CountryMapper {
    CountryDTO toDTO(Country country);

    @Mapping(target = "id", ignore = true)
    Country fromDTO(CountryDTO countryDTO);

    @InheritConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCountry(@MappingTarget Country target, CountryDTO source);
}
