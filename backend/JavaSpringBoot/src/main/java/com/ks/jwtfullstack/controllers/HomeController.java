package com.ks.jwtfullstack.controllers;

import com.ks.jwtfullstack.entities.User;
import com.ks.jwtfullstack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private UserService userService;

    @RequestMapping("/users")
    public List<User> users() {
        return this.userService.getUser();
    }

    @GetMapping("/currentuser")
    public String getLoggedInUser(Principal principal) {
        return principal.getName();
    }
}
