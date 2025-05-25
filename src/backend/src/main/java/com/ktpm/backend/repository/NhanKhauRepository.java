package com.ktpm.backend.repository;

import com.ktpm.backend.dto.NhanKhauDTO;
import com.ktpm.backend.model.NhanKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhanKhauRepository extends JpaRepository<NhanKhau, Integer> {
    List<NhanKhau> findByHoKhau_MaHoKhau(int maHoKhau);
    List<NhanKhau> findByTrangThai(String trangThai);
    NhanKhau findBySoCMND(String soCMND);
}
