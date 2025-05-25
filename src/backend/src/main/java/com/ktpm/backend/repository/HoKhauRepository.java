package com.ktpm.backend.repository;

import com.ktpm.backend.model.HoKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoKhauRepository extends JpaRepository<HoKhau, Integer> {

//    @Query("SELECT h FROM HoKhau h WHERE " +
//            "LOWER(h.tenChuHo) LIKE LOWER(CONCAT('%', :tuKhoa, '%')) OR " +
//            "LOWER(h.diaChi) LIKE LOWER(CONCAT('%', :tuKhoa, '%')) OR " +
//            "LOWER(h.soDienThoai) LIKE LOWER(CONCAT('%', :tuKhoa, '%'))")
//    List<HoKhau> search(@Param("tuKhoa") String tuKhoa);
}
