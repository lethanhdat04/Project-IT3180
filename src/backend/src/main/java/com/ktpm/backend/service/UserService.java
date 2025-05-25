//package com.ktpm.backend.service;
//
//import com.ktpm.backend.model.User;
//import com.ktpm.backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Optional;
//
//@Service
//public class UserService implements UserDetailsService {
////    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với username"));
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//                new ArrayList<>()
//        );
//    }
//
//    public User dangnhap(String username, String password) {
//        Optional<User> userOpt = userRepository.findByUsername(username);
//        if (userOpt.isEmpty()) {
//            throw new UsernameNotFoundException("Tên đăng nhập không tồn tại");
//        }
//
//        User user = userOpt.get();
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new RuntimeException("Mật khẩu không chính xác");
//        }
//
//        return user;
//    }
//
//    public User dangky(User user) {
//        if (userRepository.existsByUsername(user.getUsername())) {
//            throw new RuntimeException("Ten dang nhap da ton tai");
//        }
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
//
//    public User doiMatKhau(Integer userId, String oldPassword, String newPassword) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Khong tim thay nguoi dung"));
//
//        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
//            throw new RuntimeException("Mat khau cu khong chinh xac");
//        }
//
//        user.setPassword(passwordEncoder.encode(newPassword));
//        return userRepository.save(user);
//    }
//
//    public void dangxuat() {
//
//    }
//
//    public User getThongTinUser(Integer userId) {
//        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Khong tim thay nguoi dung"));
//    }
//}
