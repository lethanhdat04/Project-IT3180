package com.ktpm.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "hoa_don")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hoa_don")
    private Integer maHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_ho_khau", nullable = false)
    private HoKhau hoKhau;

    @ManyToOne
    @JoinColumn(name = "ma_khoan_thu", nullable = false)
    private KhoanThu khoanThu;

    @Column(name = "ngay_thu")
    @Temporal(TemporalType.DATE)
    private Date ngayThu;

    @Column(name = "so_tien")
    private Double soTien;

    @Column(name = "trang_thai")
    private String trangThai;  // "Chưa thanh toán", "Đã thanh toán", "Đã hủy"
}