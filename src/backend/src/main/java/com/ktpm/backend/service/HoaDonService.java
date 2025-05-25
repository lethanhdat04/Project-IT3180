package com.ktpm.backend.service;

import com.ktpm.backend.dto.HoaDonDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.model.HoaDon;
import com.ktpm.backend.model.KhoanThu;
import com.ktpm.backend.repository.HoKhauRepository;
import com.ktpm.backend.repository.HoaDonRepository;
import com.ktpm.backend.repository.KhoanThuRepository;
import com.ktpm.backend.utils.DtoMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class HoaDonService {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Autowired
    HoKhauRepository hoKhauRepository;

    @Autowired
    KhoanThuRepository khoanThuRepository;

    @Autowired
    DtoMapper dtoMapper;
    @Autowired
    private KhoanThuService khoanThuService;

    public List<HoaDonDTO> getDanhSachHoaDon() {
        List<HoaDon> hoaDons = hoaDonRepository.findAll();
        return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
    }

    public List<HoaDonDTO> getDanhSachHoaDonByMaHo(Integer maHo) {
        List<HoaDon> hoaDons = hoaDonRepository.findByHoKhau_MaHoKhau(maHo);
        return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
    }

    public HoaDonDTO getChiTietHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = hoaDonRepository.findById(maHoaDon).orElseThrow(() -> new RuntimeException("HoaDon not found"));
        return dtoMapper.map(hoaDon, HoaDonDTO.class);
    }

    @Transactional
    public HoaDonDTO taoHoaDon(Integer maHoKhau, Integer maKhoanThu) {
        HoKhau hoKhau = hoKhauRepository.findById(maHoKhau).orElseThrow(() -> new RuntimeException("HoKhau not found"));
        KhoanThu khoanThu = khoanThuRepository.findById(maKhoanThu).orElseThrow(() -> new RuntimeException("KhoanThu not found"));

        Double soTien = khoanThuService.tinhTienKhoanThu(maKhoanThu, maHoKhau);

        HoaDon hoaDon = new HoaDon();
        hoaDon.setHoKhau(hoKhau);
        hoaDon.setKhoanThu(khoanThu);
        hoaDon.setNgayThu(new Date());
        hoaDon.setSoTien(soTien);
        hoaDon.setTrangThai("Chưa thanh toán");
        HoaDon saved = hoaDonRepository.save(hoaDon);
        return dtoMapper.map(saved, HoaDonDTO.class);
    }

    @Transactional
    public HoaDonDTO suaHoaDon(HoaDonDTO hoaDonDTO) {
        HoaDon hoaDon = hoaDonRepository.findById(hoaDonDTO.getMaHoaDon()).orElseThrow(() -> new RuntimeException("HoaDon not found"));
        hoaDon.setTrangThai(hoaDonDTO.getTrangThai());
        hoaDon.setSoTien(hoaDon.getSoTien());
        hoaDon.setNgayThu(hoaDonDTO.getNgayThu());
        HoaDon saved = hoaDonRepository.save(hoaDon);
        return dtoMapper.map(saved, HoaDonDTO.class);
    }

    @Transactional
    public HoaDonDTO huyHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = hoaDonRepository.findById(maHoaDon).orElseThrow(() -> new RuntimeException("HoaDon not found"));
        if ("Đã thanh toán".equals(hoaDon.getTrangThai())) {
            throw new RuntimeException("Không thể hủy hóa đơn đã thanh toán");
        }

        hoaDon.setTrangThai("Đã hủy");
        HoaDon saved = hoaDonRepository.save(hoaDon);
        return dtoMapper.map(saved, HoaDonDTO.class);
    }

    public List<HoaDonDTO> timKiemHoaDon(String tuKhoa) {
        if (tuKhoa == null || tuKhoa.trim().isEmpty()) {
            List<HoaDon> hoaDons = hoaDonRepository.findAll();
            return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
        }
        List<HoaDon> hoaDons = hoaDonRepository.search(tuKhoa);
        return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
    }

    public List<HoaDonDTO> timHoaDonByTrangThai(String trangThai) {
        List<HoaDon> hoaDons = hoaDonRepository.search(trangThai);
        return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
    }

    public List<HoaDonDTO> timHoaDonByKhoanThu(Integer maKhoanThu) {
        List<HoaDon> hoaDons = hoaDonRepository.findByKhoanThu_MaKhoanThu(maKhoanThu);
        return dtoMapper.mapList(hoaDons, HoaDonDTO.class);
    }
}
