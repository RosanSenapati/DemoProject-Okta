package com.example.demoproject.controller;


import com.example.demoproject.exception.UserNotFoundException;
import com.example.demoproject.model.User;
import com.example.demoproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/user")
    User newUser(@RequestBody User newUser){

        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers (){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
         .orElseThrow(()->new UserNotFoundException(id));
    }

    // User Login
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return existingUser.get();  // Successful login
//            return true;
        } else {
            return null;
        }
    }

}
