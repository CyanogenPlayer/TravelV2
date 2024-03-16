package dev.cyan.travel.payload.response;

import com.mongodb.MongoWriteException;
import dev.cyan.travel.DTO.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class Advice {
    private ResponseEntity<ErrorDTO> exceptionHandler(Exception exception, HttpStatus httpStatus) {
        String details = exception.getLocalizedMessage();
        return ResponseEntity.status(httpStatus)
                .body(ErrorDTO.builder()
                        .timestamp(System.currentTimeMillis())
                        .details(details)
                        .build());
    }

    @ExceptionHandler(MongoWriteException.class)
    public ResponseEntity<ErrorDTO> handleMongoWriteException(MongoWriteException exception) {
        return exceptionHandler(exception, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorDTO> handleNoSuchElementException(NoSuchElementException exception) {
        return exceptionHandler(exception, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        return exceptionHandler(exception, HttpStatus.BAD_REQUEST);
    }
}
