package com.ktpm.backend.repository;

import com.ktpm.backend.model.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    List<HoaDon> findByHoKhau_MaHoKhau(Integer maHo);
    List<HoaDon> findByKhoanThu_MaKhoanThu(Integer maKhoanThu);
    List<HoaDon> findByTrangThai(String trangThai);
    List<HoaDon> findByHoKhau_MaHoKhauAndTrangThai(Integer maHo, String trangThai);
    List<HoaDon> findByKhoanThu_MaKhoanThuAndTrangThai(Integer maKhoanThu, String trangThai);

    @Query("SELECT h FROM HoaDon h WHERE " +
            "h.ngayThu BETWEEN :tuNgay AND :denNgay")
    List<HoaDon> findByNgayThuBetween(@Param("tuNgay") Date tuNgay, @Param("denNgay") Date denNgay);

    @Query("SELECT h FROM HoaDon h JOIN h.hoKhau hgd JOIN h.khoanThu kt WHERE " +
            "LOWER(hgd.tenChuHo) LIKE LOWER(CONCAT('%', :tuKhoa, '%')) OR " +
            "LOWER(kt.tenKhoanThu) LIKE LOWER(CONCAT('%', :tuKhoa, '%')) OR " +
            "LOWER(h.trangThai) LIKE LOWER(CONCAT('%', :tuKhoa, '%'))")
    List<HoaDon> search(@Param("tuKhoa") String tuKhoa);

    // Thống kê
    @Query("SELECT SUM(h.soTien) FROM HoaDon h WHERE " +
            "h.trangThai = 'Đã thu' AND " +
            "YEAR(h.ngayThu) = :nam AND " +
            "MONTH(h.ngayThu) = :thang")
    Float thongKeDoanhThuTheoThang(@Param("thang") int thang, @Param("nam") int nam);

    @Query("SELECT SUM(h.soTien) FROM HoaDon h WHERE " +
            "h.trangThai = 'Đã thu' AND " +
            "YEAR(h.ngayThu) = :nam AND " +
            "MONTH(h.ngayThu) BETWEEN :thangBatDau AND :thangKetThuc")
    Float thongKeDoanhThuTheoQuy(
            @Param("thangBatDau") int thangBatDau,
            @Param("thangKetThuc") int thangKetThuc,
            @Param("nam") int nam);

    @Query("SELECT SUM(h.soTien) FROM HoaDon h WHERE " +
            "h.trangThai = 'Đã thu' AND " +
            "YEAR(h.ngayThu) = :nam")
    Float thongKeDoanhThuTheoNam(@Param("nam") int nam);
}
