package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.repository.CountryRepository;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CountryRepository.class})
public interface HotelMapper {
    @Mapping(source = "country.id", target = "countryId")
    HotelDTO toDTO(Hotel hotel);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(source = "countryId", target = "country")
    })
    Hotel fromDTO(HotelDTO hotelDTO);

    @InheritConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateHotel(@MappingTarget Hotel target, HotelDTO source);
}
