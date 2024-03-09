package dev.cyan.travel.advice;

import com.mongodb.MongoWriteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class Advice {
    @ExceptionHandler(MongoWriteException.class)
    public ResponseEntity<Response> handleMongoWriteException() {
        Response response = new Response("Object already exists");
        return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Response> handleNoSuchElementException() {
        Response response = new Response("Object not found");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
