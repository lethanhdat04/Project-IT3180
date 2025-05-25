package com.ktpm.backend.service;

import com.ktpm.backend.dto.KhoanThuDTO;
import com.ktpm.backend.model.*;
import com.ktpm.backend.repository.*;
import com.ktpm.backend.utils.DtoMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhoanThuService {

    @Autowired
    private KhoanThuRepository khoanThuRepository;

    @Autowired
    private DtoMapper dtoMapper;

    @Autowired
    private PhuongTienRepository phuongTienRepository;

    @Autowired
    private HoKhauRepository hoKhauRepository;

    public List<KhoanThuDTO> getDanhSachKhoanThu() {
        List<KhoanThu> danhSachKhoanThu = khoanThuRepository.findAll();
        return dtoMapper.mapList(danhSachKhoanThu, KhoanThuDTO.class);
    }

    public KhoanThuDTO getKhoanThuByID(Integer maKhoanThu) {
        KhoanThu khoanThu = khoanThuRepository.findById(maKhoanThu).orElseThrow(() -> new RuntimeException("KhoanThu not found"));
        return dtoMapper.map(khoanThu, KhoanThuDTO.class);
    }

    @Transactional
    public KhoanThuDTO themKhoanThu(KhoanThuDTO khoanThuDTO) {
        KhoanThu khoanThu = dtoMapper.map(khoanThuDTO, KhoanThu.class);
        khoanThu = khoanThuRepository.save(khoanThu);
        return dtoMapper.map(khoanThu, KhoanThuDTO.class);
//        KhoanThu khoanThu = dtoMapper.map(khoanThuDTO, KhoanThu.class);
//        String loaiKhoanThu = khoanThu.getLoaiKhoanThu();
//        if (loaiKhoanThu == null || loaiKhoanThu.isEmpty()) {
//            KhoanThu saved = khoanThuRepository.save(khoanThu);
//            return dtoMapper.map(saved, KhoanThuDTO.class);
//        }
//
//        switch (loaiKhoanThu) {
//            case "PhiDichVu":
//                if (khoanThu instanceof PhiDichVu) {
//                    PhiDichVu phiDichVu = phiDichVuRepository.save((PhiDichVu) khoanThu);
//                    return dtoMapper.map(phiDichVu, KhoanThuDTO.class);
//                }
//                break;
//            case "PhiQuanLy":
//                if (khoanThu instanceof PhiQuanLy) {
//                    PhiQuanLy phiQuanLy = phiQuanLyRepository.save((PhiQuanLy) khoanThu);
//                    return dtoMapper.map(phiQuanLy, KhoanThuDTO.class);
//                }
//                break;
//            case "PhiGuiXe":
//                if (khoanThu instanceof PhiGuiXe) {
//                    PhiGuiXe phiGuiXe = phiGuiXeRepository.save((PhiGuiXe) khoanThu);
//                    return dtoMapper.map(phiGuiXe, KhoanThuDTO.class);
//                }
//                break;
//            case "KhoanDongGop":
//                if (khoanThu instanceof KhoanDongGop) {
//                    KhoanDongGop khoanDongGop = khoanDongGopRepository.save((KhoanDongGop) khoanThu);
//                    return dtoMapper.map(khoanDongGop, KhoanThuDTO.class);
//                }
//                break;
//            default:
//                KhoanThu saved = khoanThuRepository.save(khoanThu);
//                return dtoMapper.map(saved, KhoanThuDTO.class);
//        }
//        return khoanThuDTO;
    }

    @Transactional
    public KhoanThuDTO suaKhoanThu(KhoanThuDTO khoanThuDTO) {
        KhoanThu khoanThu = khoanThuRepository.findById(khoanThuDTO.getMaKhoanThu()).orElseThrow(() -> new RuntimeException("KhoanThu not found"));

        khoanThu.setLoaiKhoanThu(khoanThuDTO.getLoaiKhoanThu());
        khoanThu.setTenKhoanThu(khoanThuDTO.getTenKhoanThu());
        khoanThu.setDonGia(khoanThuDTO.getDonGia());
        khoanThu.setNgayBatDau(khoanThuDTO.getNgayBatDau());
        khoanThu.setNgayKetThuc(khoanThuDTO.getNgayKetThuc());
        khoanThu.setBatBuoc(khoanThuDTO.isBatBuoc());

        KhoanThu saved = khoanThuRepository.save(khoanThu);

        return dtoMapper.map(saved, KhoanThuDTO.class);
    }

    @Transactional
    public void xoaKhoanThu(Integer maKhoanThu) {
        KhoanThu khoanThu = khoanThuRepository.findById(maKhoanThu).orElseThrow(() -> new RuntimeException("KhoanThu not found"));
        khoanThuRepository.delete(khoanThu);
    }

    public List<KhoanThuDTO> timKiemKhoanThu(String tuKhoa) {
        if (tuKhoa == null || tuKhoa.trim().isEmpty()) {
            List<KhoanThu> danhSachKhoanThu = khoanThuRepository.findAll();
            return dtoMapper.mapList(danhSachKhoanThu, KhoanThuDTO.class);
        }
        List<KhoanThu> danhSachKhoanThu = khoanThuRepository.search(tuKhoa);
        return dtoMapper.mapList(danhSachKhoanThu, KhoanThuDTO.class);
    }

    public Double tinhTienKhoanThu(Integer maKhoanThu, Integer maHoKhau) {
        KhoanThu khoanThu = khoanThuRepository.findById(maKhoanThu).orElseThrow(() -> new RuntimeException("KhoanThu not found"));

        HoKhau hoKhau = hoKhauRepository.findById(maHoKhau).orElseThrow(() -> new RuntimeException("HoKhau not found"));

        Double soTien = 0d;

        String loaiKhoanThu = khoanThu.getLoaiKhoanThu();

        switch (loaiKhoanThu) {
            case "PHI_DICH_VU":
                return khoanThu.getDonGia()*hoKhau.getSoNhanKhau();
            case "PHI_VE_SINH":
                return khoanThu.getDonGia()*hoKhau.getSoNhanKhau();
            case "KHOAN_DONG_GOP":
                return khoanThu.getDonGia();
            case "PHI_GUI_XE_MAY":
                long soXeMay = phuongTienRepository.countByHoKhau_MaHoKhauAndLoaiPhuongTien(hoKhau.getMaHoKhau(), loaiKhoanThu);
                return khoanThu.getDonGia()*soXeMay;
            case "PHI_GUI_O_TO":
                long soOTo = phuongTienRepository.countByHoKhau_MaHoKhauAndLoaiPhuongTien(hoKhau.getMaHoKhau(), loaiKhoanThu);
                return khoanThu.getDonGia()*soOTo;
            default:
                return khoanThu.getDonGia();
        }
    }
}
