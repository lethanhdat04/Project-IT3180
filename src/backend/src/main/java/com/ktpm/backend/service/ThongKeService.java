package com.ktpm.backend.service;

import com.ktpm.backend.dto.HoKhauDTO;
import com.ktpm.backend.model.HoKhau;
import com.ktpm.backend.repository.HoKhauRepository;
import com.ktpm.backend.repository.HoaDonRepository;
import com.ktpm.backend.repository.KhoanThuRepository;
import com.ktpm.backend.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ThongKeService {

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private KhoanThuRepository khoanThuRepository;

    @Autowired
    private HoKhauRepository hoKhauRepository;

    @Autowired
    DtoMapper dtoMapper;

    public Map<String, Object> thongKeKhoanThuTheoThang(int thang, int nam) {
        Map<String, Object> result = new HashMap<>();

        Float doanhThu = hoaDonRepository.thongKeDoanhThuTheoThang(thang, nam);
        result.put("doanhThu", doanhThu != null ? doanhThu : 0f);
        result.put("thang", thang);
        result.put("nam", nam);

        return result;
    }

    public Map<String, Object> thongKeKhoanThuTheoQuy(int quy, int nam) {
        Map<String, Object> result = new HashMap<>();

        int thangBatDau = (quy - 1) * 3 + 1;
        int thangKetThuc = quy * 3;

        Float doanhThu = hoaDonRepository.thongKeDoanhThuTheoQuy(thangBatDau, thangKetThuc, nam);
        result.put("doanhThu", doanhThu != null ? doanhThu : 0f);
        result.put("quy", quy);
        result.put("nam", nam);

        return result;
    }

    public Map<String, Object> thongKeKhoanThuTheoNam(int nam) {
        Map<String, Object> result = new HashMap<>();

        Float doanhThu = hoaDonRepository.thongKeDoanhThuTheoNam(nam);
        result.put("doanhThu", doanhThu != null ? doanhThu : 0f);
        result.put("nam", nam);

        return result;
    }

    public Map<String, Object> thongKeHoGiaDinhChuaNop(Integer maKhoanThu) {
        Map<String, Object> result = new HashMap<>();

        List<HoKhau> danhSachHoChuaNop = hoKhauRepository.findAll();

        // Lọc ra những hộ chưa nộp khoản thu này
        danhSachHoChuaNop.removeIf(ho ->
                ho.getHoaDons().stream().anyMatch(hoaDon ->
                        hoaDon.getKhoanThu().getMaKhoanThu().equals(maKhoanThu) &&
                                "Đã thu".equals(hoaDon.getTrangThai())
                )
        );
        List<HoKhauDTO> danhSachHo = dtoMapper.mapList(danhSachHoChuaNop, HoKhauDTO.class);

        result.put("danhSachHoChuaNop", danhSachHo);
        result.put("soHoChuaNop", danhSachHo.size());

        return result;
    }

    public Map<String, Object> thongKeHoGiaDinhDaNop(Integer maKhoanThu) {
        Map<String, Object> result = new HashMap<>();

        List<HoKhau> danhSachHoDaNop = hoKhauRepository.findAll();

        // Lọc ra những hộ đã nộp khoản thu này
        danhSachHoDaNop.removeIf(ho ->
                ho.getHoaDons().stream().noneMatch(hoaDon ->
                        hoaDon.getKhoanThu().getMaKhoanThu().equals(maKhoanThu) &&
                                "Đã thu".equals(hoaDon.getTrangThai())
                )
        );

        List<HoKhauDTO> danhSachHo = dtoMapper.mapList(danhSachHoDaNop, HoKhauDTO.class);

        result.put("danhSachHoDaNop", danhSachHo);
        result.put("soHoChuaNop", danhSachHo.size());

        return result;
    }

    public Map<String, Object> thongKeDoanhThuTheoThang(int thang, int nam) {
        Map<String, Object> result = new HashMap<>();

        Float doanhThu = hoaDonRepository.thongKeDoanhThuTheoThang(thang, nam);
        result.put("doanhThu", doanhThu != null ? doanhThu : 0f);
        result.put("thang", thang);
        result.put("nam", nam);

        return result;
    }

    public Map<String, Object> thongKeTongHop() {
        Map<String, Object> result = new HashMap<>();

        // Tổng số hộ gia đình
        long tongSoHo = hoKhauRepository.count();
        result.put("tongSoHo", tongSoHo);

        // Tổng số khoản thu
        long tongSoKhoanThu = khoanThuRepository.count();
        result.put("tongSoKhoanThu", tongSoKhoanThu);

        // Tổng số hóa đơn
        long tongSoHoaDon = hoaDonRepository.count();
        result.put("tongSoHoaDon", tongSoHoaDon);

        // Tổng số hóa đơn đã thanh toán
        long soHoaDonDaThanhToan = hoaDonRepository.findByTrangThai("Đã thu").size();
        result.put("soHoaDonDaThanhToan", soHoaDonDaThanhToan);

        // Tổng số hóa đơn chưa thanh toán
        long soHoaDonChuaThanhToan = hoaDonRepository.findByTrangThai("Chưa thu").size();
        result.put("soHoaDonChuaThanhToan", soHoaDonChuaThanhToan);

        // Tổng số hóa đơn đã hủy
        long soHoaDonDaHuy = hoaDonRepository.findByTrangThai("Đã hủy").size();
        result.put("soHoaDonDaHuy", soHoaDonDaHuy);

        return result;
    }
}