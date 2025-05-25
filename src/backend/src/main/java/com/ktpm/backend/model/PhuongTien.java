package com.ktpm.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "phuong_tien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhuongTien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_phuong_tien")
    private Integer maPhuongTien;

    @ManyToOne
    @JoinColumn(name = "ma_ho_khau", nullable = false)
    private HoKhau hoKhau;

    @Column(name = "loai_phuong_tien", nullable = false)
    private String loaiPhuongTien;  // "Xe máy" hoặc "Ô tô"

    @Column(name = "bien_so", nullable = false)
    private String bienSo;
}
