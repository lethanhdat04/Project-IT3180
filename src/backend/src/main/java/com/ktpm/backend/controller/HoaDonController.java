package com.ktpm.backend.controller;

import com.ktpm.backend.dto.HoaDonDTO;
import com.ktpm.backend.model.HoaDon;
import com.ktpm.backend.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;

    @GetMapping
    public List<HoaDonDTO> getDanhSachHoaDon() {
        return hoaDonService.getDanhSachHoaDon();
    }

    @GetMapping("/{maHoKhau}")
    public List<HoaDonDTO> getDanhSachHoaDonByMaHo(@PathVariable Integer maHoKhau) {
        return hoaDonService.getDanhSachHoaDonByMaHo(maHoKhau);
    }

    @PostMapping("/add")
    public ResponseEntity<HoaDonDTO> addHoaDon(@RequestBody HoaDonDTO hoaDonDTO) {
        try {
            hoaDonService.taoHoaDon(hoaDonDTO.getMaHoKhau(), hoaDonDTO.getMaKhoanThu());
            return new ResponseEntity<>(hoaDonDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/details/{maHoaDon}")
    public HoaDonDTO getHoaDon(@PathVariable Integer maHoaDon) {
        return hoaDonService.getChiTietHoaDon(maHoaDon);
    }

    @PutMapping("/edit")
    public ResponseEntity<HoaDonDTO> editHoaDon(@RequestBody HoaDonDTO hoaDonDTO) {
        try {
            hoaDonService.suaHoaDon(hoaDonDTO);
            return new ResponseEntity<>(hoaDonDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cancel/{maHoaDon}")
    public ResponseEntity<HoaDonDTO> cancelHoaDon(@PathVariable Integer maHoaDon) {
        try {
            hoaDonService.huyHoaDon(maHoaDon);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
