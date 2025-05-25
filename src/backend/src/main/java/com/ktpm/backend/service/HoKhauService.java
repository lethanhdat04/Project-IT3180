package com.ktpm.backend.service;

import com.ktpm.backend.dto.HoKhauDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.repository.HoKhauRepository;
import com.ktpm.backend.utils.DtoMapper;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoKhauService {

    @Autowired
    private HoKhauRepository hoKhauRepository;

    @Autowired
    private DtoMapper dtoMapper;

    public List<HoKhauDTO> getDanhSachHoKhau() {
        List<HoKhau> danhSachHoKhau = hoKhauRepository.findAll();
        return dtoMapper.mapList(danhSachHoKhau, HoKhauDTO.class);
    }

    public HoKhauDTO getHoKhauById(int maHoKhau) {
        HoKhau hoKhau = hoKhauRepository.findById(maHoKhau).orElseThrow(() -> new RuntimeException("khong tim thay ho khau"));
        return dtoMapper.map(hoKhau, HoKhauDTO.class);
    }

    @Transactional
    public HoKhau themHoKhau(HoKhau hoKhau) {
        if (hoKhau.getTenChuHo() == null || hoKhau.getTenChuHo().trim().isEmpty()) {
            throw new RuntimeException("Ten chu ho khau khong duoc de trong");
        }

        if (hoKhau.getDiaChi() == null || hoKhau.getDiaChi().trim().isEmpty()) {
            throw new RuntimeException("Dia chi ho khau khong duoc de trong");
        }

        return hoKhauRepository.save(hoKhau);
    }

    @Transactional
    public HoKhau suaHoKhau(HoKhau hoKhau) {
        if (!hoKhauRepository.existsById(hoKhau.getMaHoKhau())) {
            throw new RuntimeException("Khong tim thay ho khau");
        }
        return hoKhauRepository.save(hoKhau);
    }

//    @Transactional
//    public void xoaHoKhau(Integer maHoKhau) {
//        HoKhau hoKhau = getHoKhauById(maHoKhau);
//        hoKhauRepository.delete(hoKhau);
//    }

//    public List<HoKhau> timKiemHoKhau(String tuKhoa) {
//        if (tuKhoa == null || tuKhoa.trim().isEmpty()) {
//            return hoKhauRepository.findAll();
//        }
//        return hoKhauRepository.search(tuKhoa);
//    }
}
