package com.ktpm.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class NhanKhauDTO {
    private Integer maNhanKhau;
    private String hoTen;
    private Date ngaySinh;
    private String gioiTinh;
    private String trangThai;
    private Integer maHoKhau; // Chỉ lấy mã hộ khẩu, không lấy toàn bộ HoKhau
    private String tenChuHo;  // Lấy tên chủ hộ nếu cần
    private String soCMND;
    private String quanHeVoiChuHo;
    // Getters và Setters
}
