package dev.cyan.travel.service;

import dev.cyan.travel.DTO.UserDTO;
import dev.cyan.travel.entity.User;
import dev.cyan.travel.mapper.UserMapper;
import dev.cyan.travel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> getAll() {
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::toDTO)
                .toList();
    }

    public UserDTO updateRoles(String id, UserDTO userDTO) {
        User user = userRepository
                .findById(id)
                .orElseThrow();
        user.setRoles(userMapper.fromDTO(userDTO).getRoles());
        User modifiedUser = userRepository.save(user);
        return userMapper.toDTO(modifiedUser);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
