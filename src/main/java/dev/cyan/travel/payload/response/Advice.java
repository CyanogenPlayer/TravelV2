package dev.cyan.travel.payload.response;

import com.mongodb.MongoWriteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class Advice {
    @ExceptionHandler(MongoWriteException.class)
    public ResponseEntity<MessageResponse> handleMongoWriteException() {
        MessageResponse response = new MessageResponse("Object already exists");
        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<MessageResponse> handleNoSuchElementException() {
        MessageResponse response = new MessageResponse("Object not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
