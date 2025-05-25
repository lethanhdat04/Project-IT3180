//package com.ktpm.backend.controller;
//
//import com.ktpm.backend.model.User;
//import com.ktpm.backend.repository.UserRepository;
//import com.ktpm.backend.service.UserService;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> dangNhap(@RequestParam String username, @RequestParam String password, HttpSession session) {
//        try {
//            Map<String, Object> result = userService.dangnhap(username, password);
//            if (result != null && result.containsKey("user")) {
//                session.setAttribute("currentuser", result.get("user"));
//                return ResponseEntity.ok(result);
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Ten dang nhap hoac mat khau sai"));
//        }
//    }
//}
