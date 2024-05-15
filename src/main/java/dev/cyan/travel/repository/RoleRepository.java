package dev.cyan.travel.repository;

import dev.cyan.travel.entity.Role;
import dev.cyan.travel.enums.ERole;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);

    Role getByName(ERole name);
}
