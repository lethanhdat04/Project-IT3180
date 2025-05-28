package com.ktpm.backend.service;

import com.ktpm.backend.dto.HoKhauDTO;
import com.ktpm.backend.dto.NhanKhauDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.model.NhanKhau;
import com.ktpm.backend.repository.HoKhauRepository;
import com.ktpm.backend.repository.NhanKhauRepository;
import com.ktpm.backend.utils.DtoMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NhanKhauService {
    @Autowired
    private NhanKhauRepository nhanKhauRepository;

    @Autowired
    private HoKhauRepository hoKhauRepository;

    @Autowired
    private DtoMapper dtoMapper;

    public List<NhanKhauDTO> getDanhSachNhanKhau() {
        List<NhanKhau> danhSachNhanKhau = nhanKhauRepository.findAll();
        return dtoMapper.mapList(danhSachNhanKhau, NhanKhauDTO.class);
    }

    public NhanKhauDTO getNhanKhau(Integer maNhanKhau) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau).orElseThrow(() -> new RuntimeException("NhanKhau not found"));
        return dtoMapper.map(nhanKhau, NhanKhauDTO.class);
    }

    public NhanKhauDTO getNhanKhauById(Integer maNhanKhau) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau).orElseThrow(() -> new RuntimeException("NhanKhau not found"));
        return dtoMapper.map(nhanKhau, NhanKhauDTO.class);
    }

    public List<NhanKhauDTO> getDanhSachNhanKhauByMaHoKhau(int maHoKhau) {
        List<NhanKhau> danhSachNhanKhau = nhanKhauRepository.findByHoKhau_MaHoKhau(maHoKhau);
        return dtoMapper.mapList(danhSachNhanKhau, NhanKhauDTO.class);
    }

    public List<NhanKhauDTO> getDanhSachNhanKhauByTrangThai(String trangThai) {
        List<NhanKhau> danhSachNhanKhau = nhanKhauRepository.findByTrangThai(trangThai);
        return dtoMapper.mapList(danhSachNhanKhau, NhanKhauDTO.class);
    }

    @Transactional
    public NhanKhauDTO themNhanKhau(NhanKhauDTO nhanKhauDTO) {
        HoKhau hoKhau = hoKhauRepository.findById(nhanKhauDTO.getMaHoKhau()).orElseThrow(() -> new RuntimeException("HoKhau not found"));

        NhanKhau nhanKhau = dtoMapper.map(nhanKhauDTO, NhanKhau.class);
        nhanKhau.setHoKhau(hoKhau);
        hoKhau.setSoNhanKhau(hoKhau.getSoNhanKhau() == null ? 1 : hoKhau.getSoNhanKhau() + 1);
        hoKhauRepository.save(hoKhau);

        NhanKhau savedNhanKhau = nhanKhauRepository.save(nhanKhau);
        return dtoMapper.map(savedNhanKhau, NhanKhauDTO.class);
    }

    @Transactional
    public NhanKhauDTO suaNhanKhau(NhanKhauDTO nhanKhauDTO) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(nhanKhauDTO.getMaNhanKhau()).orElseThrow(() -> new RuntimeException("NhanKhau not found"));
        if (nhanKhau == null) {
            throw new RuntimeException("Không tìm thấy nhân khẩu với số CMND: " + nhanKhauDTO.getSoCMND());
        }

        if (nhanKhauDTO.getMaHoKhau() != null && !nhanKhau.getHoKhau().getMaHoKhau().equals(nhanKhauDTO.getMaHoKhau())) {
            HoKhau hoKhauMoi = hoKhauRepository.findById(nhanKhauDTO.getMaHoKhau()).orElseThrow(() -> new RuntimeException("HoKhau not found"));
            HoKhau hoKhauCu = hoKhauRepository.findById(nhanKhau.getHoKhau().getMaHoKhau()).orElseThrow(() -> new RuntimeException("HoKhau not found"));
            nhanKhau.setHoKhau(hoKhauMoi);
            hoKhauMoi.setSoNhanKhau(hoKhauMoi.getSoNhanKhau() == null ? 1 : hoKhauMoi.getSoNhanKhau() + 1);
            hoKhauCu.setSoNhanKhau(hoKhauCu.getSoNhanKhau() == null ? 1 : hoKhauCu.getSoNhanKhau() - 1);
            hoKhauRepository.save(hoKhauCu);
            hoKhauRepository.save(hoKhauMoi);
        }

        nhanKhau.setHoTen(nhanKhauDTO.getHoTen());
        nhanKhau.setTrangThai(nhanKhauDTO.getTrangThai());
        nhanKhau.setSoCMND(nhanKhauDTO.getSoCMND());
        nhanKhau.setGioiTinh(nhanKhauDTO.getGioiTinh());

        NhanKhau saved = nhanKhauRepository.save(nhanKhau);
        return dtoMapper.map(saved, NhanKhauDTO.class);
    }

    @Transactional
    public void xoaNhanKhau(Integer maNhanKhau) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau).orElseThrow(() -> new RuntimeException("Khong tim thay nhan khau by ma ho khau"));

        HoKhau hoKhau = nhanKhau.getHoKhau();
        hoKhau.setSoNhanKhau(hoKhau.getSoNhanKhau() - 1);
        hoKhauRepository.save(hoKhau);

        nhanKhauRepository.delete(nhanKhau);
    }

    @Transactional
    public NhanKhauDTO capNhatTrangThaiTamVang(Integer maNhanKhau, Date ngayBatDau, Date ngayKetThuc) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau).orElseThrow(() -> new RuntimeException("Khong tim thay nhan khau"));

        nhanKhau.setTrangThai("Tạm trú");
        nhanKhau.setNgayBatDauTamTruTamVang(ngayBatDau);
        nhanKhau.setNgayKetThucTamTruTamVang(ngayKetThuc);
        NhanKhau saved = nhanKhauRepository.save(nhanKhau);
        return dtoMapper.map(saved, NhanKhauDTO.class);
    }

}
