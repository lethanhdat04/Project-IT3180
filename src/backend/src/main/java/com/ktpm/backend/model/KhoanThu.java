package com.ktpm.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "khoan_thu")
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder

public class KhoanThu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maKhoanThu;

    @Column(name = "ten_khoan_thu", nullable = false)
    private String tenKhoanThu;

    @Column(name = "loai_khoan_thu")
    private String loaiKhoanThu;

    @Column(name = "ngay_bat_dau")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;

    @Column(name = "ngay_ket_thuc")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;

    @Column(name = "bat_buoc")
    private boolean batBuoc;

    @Column(name = "don_gia")
    private Double donGia;

    @OneToMany(mappedBy = "khoanThu", cascade = CascadeType.ALL)
    private List<HoaDon> hoaDons = new ArrayList<>();
}
