package dev.cyan.travel.repository;

import dev.cyan.travel.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    User getById(String id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
