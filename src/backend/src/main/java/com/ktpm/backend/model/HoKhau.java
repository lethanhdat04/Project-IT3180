package com.ktpm.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ho_khau")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoKhau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_ho_khau", nullable = false)
    private Integer maHoKhau;
    @Column(name = "ten_chu_ho", nullable = false)
    private String tenChuHo;
    @Column(name = "dia_chi", nullable = false)
    private String diaChi;
    @Column(name = "so_nhan_khau", nullable = false)
    private Integer soNhanKhau;
    @Column(name = "so_dien_thoai", nullable = false)
    private Integer soDienThoai;

    @OneToMany(mappedBy = "hoKhau", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NhanKhau> nhanKhaus = new ArrayList<>();

    @OneToMany(mappedBy = "hoKhau", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhuongTien> phuongTiens = new ArrayList<>();

    @OneToMany(mappedBy = "hoKhau", cascade = CascadeType.ALL)
    private List<HoaDon> hoaDons = new ArrayList<>();
}
