package dev.cyan.travel.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private Set<String> roles = new HashSet<>();
}
