package com.ktpm.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class KhoanThuDTO {
    private Integer maKhoanThu;
    private String tenKhoanThu;
    private String loaiKhoanThu;
    private Date ngayBatDau;
    private Date ngayKetThuc;
    private boolean batBuoc;
    private Double donGia;
}
