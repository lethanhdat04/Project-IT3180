package com.ktpm.backend.controller;

import com.ktpm.backend.dto.HoKhauDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.service.HoKhauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hokhaus")
public class HoKhauController {

    @Autowired
    private HoKhauService hoKhauService;

    @GetMapping
    public List<HoKhauDTO> danhSachHoKhau(@RequestParam(required = false) String search) {
        List<HoKhauDTO> danhSachHo;
//        if (search != null && !search.trim().isEmpty()) {
//            danhSachHo = hoKhauService.timKiemHoKhau(search);
//        } else {
//            danhSachHo = hoKhauService.getDanhSachHoKhau();
//        }
//        return danhSachHo.toString();

        danhSachHo = hoKhauService.getDanhSachHoKhau();
        return danhSachHo;
    }

    @GetMapping("/{maHoKhau}")
    public HoKhauDTO getHoKhauByID(@PathVariable int maHoKhau) {
        return hoKhauService.getHoKhauById(maHoKhau);
    }

    @PostMapping("/add")
    public void addHoKhau(@RequestBody HoKhau hoKhau) {
        hoKhauService.themHoKhau(hoKhau);
    }

    @PutMapping("/edit/{maHoKhau}")
    public void suaHoKhau(@PathVariable Integer maHoKhau, @RequestBody HoKhau hoKhau) {
        hoKhau.setMaHoKhau(maHoKhau);
        hoKhauService.suaHoKhau(hoKhau);
    }
}
