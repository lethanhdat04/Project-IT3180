package com.ktpm.backend.controller;

import com.ktpm.backend.dto.HoKhauDTO;
import com.ktpm.backend.dto.NhanKhauDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.model.NhanKhau;
import com.ktpm.backend.service.HoKhauService;
import com.ktpm.backend.service.NhanKhauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhankhaus")
public class NhanKhauController {

    @Autowired
    private NhanKhauService nhanKhauService;

    @Autowired
    private HoKhauService hoKhauService;

    @GetMapping
    public List<NhanKhauDTO> getAllNhanKhau() {
        return nhanKhauService.getDanhSachNhanKhau();
    }

    @GetMapping("/{maNhanKhau}")
    public NhanKhauDTO getNhanKhau(@PathVariable Integer maNhanKhau) {
        return nhanKhauService.getNhanKhau(maNhanKhau);
    }

    @GetMapping("/ho/{maHo}")
    public List<NhanKhauDTO> danhSachNhanKhau(@PathVariable Integer maHo) {
        return nhanKhauService.getDanhSachNhanKhauByMaHoKhau(maHo);
    }

    @PostMapping("/add")
    public ResponseEntity<NhanKhauDTO> themNhanKhau(@RequestBody NhanKhauDTO nhanKhauDTO) {
        try {
            NhanKhauDTO savedNhanKhau = nhanKhauService.themNhanKhau(nhanKhauDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNhanKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<NhanKhauDTO> suaNhanKhau(@RequestBody NhanKhauDTO nhanKhauDTO) {
        try {
            NhanKhauDTO savedNhanKhau = nhanKhauService.suaNhanKhau(nhanKhauDTO);
            return ResponseEntity.status(HttpStatus.OK).body(savedNhanKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/delete/{maNhanKhau}")
    public ResponseEntity<Void> xoaNhanKhau(@PathVariable Integer maNhanKhau) {
        try {
            nhanKhauService.xoaNhanKhau(maNhanKhau);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();  //204 No Content if success
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
