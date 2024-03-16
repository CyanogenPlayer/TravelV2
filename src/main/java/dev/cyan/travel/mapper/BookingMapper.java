package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.BookingDTO;
import dev.cyan.travel.entity.Booking;
import dev.cyan.travel.repository.RoomRepository;
import dev.cyan.travel.repository.UserRepository;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {RoomRepository.class, UserRepository.class})
public interface BookingMapper {
    @Mapping(source = "room.id", target = "roomId")
    @Mapping(source = "user.id", target = "userId")
    BookingDTO toDTO(Booking booking);

    @Mapping(source = "roomId", target = "room")
    @Mapping(source = "userId", target = "user")
    Booking fromDTO(BookingDTO bookingDTO);

    @InheritConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBooking(@MappingTarget Booking booking, BookingDTO bookingDTO);
}
