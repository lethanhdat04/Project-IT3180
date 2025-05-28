package com.ktpm.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Áp dụng cho tất cả các API endpoint
                .allowedOrigins("*") // Cho phép tất cả các domain truy cập
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức được phép
                .allowedHeaders("*") // Cho phép tất cả các header
                .allowCredentials(false); // Nếu không cần gửi cookie thì để false
    }
}

