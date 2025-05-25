package com.ktpm.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HoaDonDTO {
    private Integer maHoaDon;
    private Integer maHoKhau;
    private Integer maKhoanThu;
    private Date ngayThu;
    private Float soTien;
    private String trangThai;
}
