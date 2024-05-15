package dev.cyan.travel.mapper;

import dev.cyan.travel.DTO.HotelDTO;
import dev.cyan.travel.entity.Hotel;
import dev.cyan.travel.entity.Photo;
import dev.cyan.travel.repository.CountryRepository;
import dev.cyan.travel.repository.PhotoRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashSet;
import java.util.Set;

@Mapper(componentModel = "spring", uses = {CountryRepository.class})
public abstract class HotelMapper {
    protected PhotoRepository photoRepository;

    @Autowired
    protected void setQuestionService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    @Mappings({
            @Mapping(source = "country.id", target = "countryId"),
            @Mapping(source = "photos", target = "photosUrls")
    })
    public abstract HotelDTO toDTO(Hotel hotel);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(source = "countryId", target = "country"),
            @Mapping(source = "photosUrls", target = "photos")
    })
    public abstract Hotel fromDTO(HotelDTO hotelDTO);

    @InheritConfiguration
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract void updateHotel(@MappingTarget Hotel target, HotelDTO source);

    public abstract HashSet<String> photosToUrls(Set<Photo> value);

    public String photoToUrl(Photo photo) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/photos/")
                .path(photo.getId())
                .toUriString();
    }

    public abstract HashSet<Photo> urlsToPhotos(Set<String> value);

    public Photo urlToPhoto(String url) {
        String key = "/photos/";
        return photoRepository.getById(url.substring(url.indexOf(key) + key.length()));
    }
}
