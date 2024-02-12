package com.ks.jwtfullstack.controllers;

import com.ks.jwtfullstack.entities.User;
import com.ks.jwtfullstack.jwt.JwtHelper;
import com.ks.jwtfullstack.models.ApiRes;
import com.ks.jwtfullstack.models.JWTRequest;
import com.ks.jwtfullstack.models.JWTResponse;
import com.ks.jwtfullstack.services.UserService;
import com.ks.jwtfullstack.utils.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private CommonUtil commonUtil;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<JWTResponse> login(@RequestBody JWTRequest request) {

//        this.doAuthenticate(request.getEmail(), request.getPassword());

//        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//        String token = this.jwtHelper.generateToken(userDetails);
//
//        JWTResponse response = JWTResponse.builder()
//                .jwtToken(token)
//                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(loginJWTResponse(request.getEmail(), request.getPassword()), HttpStatus.OK);
    }

    public JWTResponse loginJWTResponse(String email, String password) {
        this.doAuthenticate(email, password);

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtHelper.generateToken(userDetails);

        JWTResponse response = JWTResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return response;
    }

    private void doAuthenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PostMapping("/signup")
    public ApiRes<JWTResponse> signUp(@RequestBody User user) {
        if (user.getName() == null || user.getName().isBlank()) {
            return userApiResponse(false, null, "Please enter your name.!");
        }
        String emailRex = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        if (user.getEmail() == null || user.getEmail().isBlank() || !commonUtil.patternMatches(user.getEmail(), emailRex)) {
            return userApiResponse(false, null, "Please enter your valid emailId.!");
        }
        if (user.getPassword() == null || user.getPassword().isBlank() || user.getPassword().length() < 7) {
            return userApiResponse(false, null, "Please enter valid password.!");
        }
        User existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null) {
            return userApiResponse(false, null, "This email is already register with us.");
        }
        // get non decoded password for login
        String password = user.getPassword();
        // add new user
        userService.createUser(user);
        // login
        JWTResponse response = loginJWTResponse(user.getEmail(), password);
        return userApiResponse(true, response, "You are successfully register with us.");
    }

    public ApiRes<JWTResponse> userApiResponse(boolean success, JWTResponse data, String message) {
        return ApiRes.<JWTResponse>builder()
                .success(success)
                .message(message)
                .data(data)
                .build();
    }
}
