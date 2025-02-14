package com.example.demoproject.service;

import com.example.demoproject.dto.UserDTO;
import com.example.demoproject.exception.UserNotFoundException;
import com.example.demoproject.model.User;
import com.example.demoproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Automatically injected

    // Method to create a new user
    public UserDTO createUser(User user) {
        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    // Method to get a user by ID
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Convert the list of User entities to UserDTOs
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    // Login user
    public UserDTO loginUser(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent() && passwordEncoder.matches(password, existingUser.get().getPassword())) {
            User user = existingUser.get();
            return new UserDTO(user.getId(), user.getName(), user.getEmail());
        } else {
            return null;  // Return null if login fails (could be improved with an exception)
        }
    }
}
