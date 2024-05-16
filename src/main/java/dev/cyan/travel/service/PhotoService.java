package dev.cyan.travel.service;

import dev.cyan.travel.entity.Photo;
import dev.cyan.travel.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;

    public Photo getById(String id) {
        return photoRepository.findById(id).orElseThrow();
    }

    public String add(MultipartFile file) throws IOException {
        Photo saved = photoRepository.save(Photo.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(new Binary(BsonBinarySubType.BINARY, file.getBytes()))
                .build());

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/photos/")
                .path(saved.getId())
                .toUriString();
    }

    public void delete(String photoUrl) {
        String key = "/photos/";
        photoRepository.deleteById(photoUrl.substring(photoUrl.indexOf(key) + key.length()));
    }
}
