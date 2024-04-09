package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Role;
import dev.cyan.travel.enums.ERole;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, ObjectId> {
    Optional<Role> findByName(ERole name);

    Role getByName(ERole name);
}
