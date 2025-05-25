package com.ktpm.backend.repository;

import com.ktpm.backend.model.KhoanThu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhoanThuRepository extends JpaRepository<KhoanThu, Integer> {
    @Query("SELECT k FROM KhoanThu k WHERE " +
            "LOWER(k.tenKhoanThu) LIKE LOWER(CONCAT('%', :tuKhoa, '%')) OR " +
            "LOWER(k.loaiKhoanThu) LIKE LOWER(CONCAT('%', :tuKhoa, '%'))")
    List<KhoanThu> search(@Param("tuKhoa") String tuKhoa);

    List<KhoanThu> findByLoaiKhoanThu(String loaiKhoanThu);

    List<KhoanThu> findByBatBuoc(Boolean batBuoc);
}
