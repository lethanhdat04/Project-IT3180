package com.ktpm.backend.controller;

import com.ktpm.backend.dto.KhoanThuDTO;
import com.ktpm.backend.service.KhoanThuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khoanthu")
public class KhoanThuController {
    @Autowired
    private KhoanThuService khoanThuService;

    @GetMapping
    public List<KhoanThuDTO> getAllKhoanThu() {
        return khoanThuService.getDanhSachKhoanThu();
    }

    @PostMapping("/add")
    public ResponseEntity<KhoanThuDTO> addKhoanThu(@RequestBody KhoanThuDTO khoanThuDTO) {
        try {
            KhoanThuDTO savedKhoanThu = khoanThuService.themKhoanThu(khoanThuDTO);
            return ResponseEntity.ok(savedKhoanThu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<KhoanThuDTO> editKhoanThu(@RequestBody KhoanThuDTO khoanThuDTO) {
        try {
            KhoanThuDTO updated = khoanThuService.suaKhoanThu(khoanThuDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{maKhoanThu}")
    public ResponseEntity<Void> xoaKhoanThu(@PathVariable Integer maKhoanThu) {
        try {
            khoanThuService.xoaKhoanThu(maKhoanThu);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
