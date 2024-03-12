package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.RoomDTO;
import dev.cyan.travel.entity.Room;
import dev.cyan.travel.repository.HotelRepository;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {HotelRepository.class})
public interface RoomMapper {
    @Mapping(source = "hotel.id", target = "hotelId")
    RoomDTO toDTO(Room room);

    @Mapping(source = "hotelId", target = "hotel")
    Room fromDTO(RoomDTO roomDTO);

    @InheritConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateRoom(@MappingTarget Room room, RoomDTO roomDTO);
}
