package dev.cyan.travel.payload.response;

import com.mongodb.MongoWriteException;
import dev.cyan.travel.DTO.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class Advice {
    @ExceptionHandler(MongoWriteException.class)
    public ResponseEntity<ErrorDTO> handleMongoWriteException(MongoWriteException exception) {
        String details = exception.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(ErrorDTO.builder()
                        .timestamp(System.currentTimeMillis())
                        .details(details)
                        .build());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorDTO> handleNoSuchElementException(NoSuchElementException exception) {
        String details = exception.getMessage();
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorDTO.builder()
                        .timestamp(System.currentTimeMillis())
                        .details(details)
                        .build());
    }
}
