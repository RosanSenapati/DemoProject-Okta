package com.example.demoproject.controller;

import com.example.demoproject.dto.UserDTO;
import com.example.demoproject.model.User;
import com.example.demoproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/user")
    public UserDTO newUser(@RequestBody User newUser) {
        return userService.createUser(newUser);
    }

    // Get all users
    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        // Logic to return all users as DTOs (if needed)
        return userService.getAllUsers();  // You can implement a method to return all users as DTOs.
    }

    // User Login
    @PostMapping("/login")
    public UserDTO loginUser(@RequestBody User user) {
        return userService.loginUser(user.getEmail(), user.getPassword());
    }
}
