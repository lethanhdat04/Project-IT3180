package com.ktpm.backend.repository;

import com.ktpm.backend.model.PhuongTien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhuongTienRepository extends JpaRepository<PhuongTien, Integer> {
    List<PhuongTien> findByHoKhau_MaHoKhau(Integer maHoKhau);
    List<PhuongTien> findByHoKhau_MaHoKhauAndLoaiPhuongTien(Integer maHo, String loaiPhuongTien);
    public long countByHoKhau_MaHoKhauAndLoaiPhuongTien(Integer maHoKhau, String loaiPhuongTien);

}
