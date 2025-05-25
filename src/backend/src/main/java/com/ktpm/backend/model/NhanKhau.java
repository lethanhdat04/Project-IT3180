package com.ktpm.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "nhan_khau")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NhanKhau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nhan_khau")
    private Integer maNhanKhau;

    @ManyToOne
    @JoinColumn(name = "ma_ho_khau", nullable = false)
    private HoKhau hoKhau;

    @Column(name = "ho_ten", nullable = false)
    private String hoTen;

    @Column(name = "ngay_sinh")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Column(name = "gioi_tinh")
    private String gioiTinh;

    @Column(name = "so_cmnd")
    private String soCMND;

    @Column(name = "quan_he_voi_chu_ho")
    private String quanHeVoiChuHo;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "ngay_bat_dau_tam_tru_tam_vang")
    @Temporal(TemporalType.DATE)
    private Date ngayBatDauTamTruTamVang;

    @Column(name = "ngay_ket_thuc_tam_tru_tam_vang")
    @Temporal(TemporalType.DATE)
    private Date ngayKetThucTamTruTamVang;
}
