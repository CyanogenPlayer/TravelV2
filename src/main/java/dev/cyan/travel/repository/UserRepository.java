package dev.cyan.travel.repository;

import dev.cyan.travel.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);

    Optional<User> findById(String id);

    User getById(String id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
