package com.ktpm.backend.controller;

import com.ktpm.backend.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/thong-ke")
@CrossOrigin(origins = "*")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    /**
     * Lấy thống kê tổng hợp
     * GET /api/thong-ke/tong-hop
     */
    @GetMapping("/tong-hop")
    public ResponseEntity<Map<String, Object>> getThongKeTongHop() {
        try {
            Map<String, Object> thongKeTongHop = thongKeService.thongKeTongHop();
            return ResponseEntity.ok(thongKeTongHop);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể lấy thống kê tổng hợp");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Thống kê khoản thu theo tháng
     * GET /api/thong-ke/khoan-thu/thang?thang={thang}&nam={nam}
     */
    @GetMapping("/khoan-thu/thang")
    public ResponseEntity<Map<String, Object>> thongKeKhoanThuTheoThang(
            @RequestParam Integer thang,
            @RequestParam Integer nam) {
        try {
            if (thang == null || thang < 1 || thang > 12) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Tháng không hợp lệ");
                errorResponse.put("message", "Tháng phải từ 1 đến 12");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            Map<String, Object> result = thongKeService.thongKeKhoanThuTheoThang(thang, nam);
            result.put("kieu", "thang");
            result.put("thang", thang);
            result.put("nam", nam);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê khoản thu theo tháng");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/khoan-thu/quy")
    public ResponseEntity<Map<String, Object>> thongKeKhoanThuTheoQuy(
            @RequestParam Integer quy,
            @RequestParam Integer nam) {
        try {
            if (quy == null || quy < 1 || quy > 4) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Quý không hợp lệ");
                errorResponse.put("message", "Quý phải từ 1 đến 4");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            Map<String, Object> result = thongKeService.thongKeKhoanThuTheoQuy(quy, nam);
            result.put("kieu", "quy");
            result.put("quy", quy);
            result.put("nam", nam);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê khoản thu theo quý");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Thống kê khoản thu theo năm
     * GET /api/thong-ke/khoan-thu/nam?nam={nam}
     */
    @GetMapping("/khoan-thu/nam")
    public ResponseEntity<Map<String, Object>> thongKeKhoanThuTheoNam(@RequestParam Integer nam) {
        try {
            Map<String, Object> result = thongKeService.thongKeKhoanThuTheoNam(nam);
            result.put("kieu", "nam");
            result.put("nam", nam);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê khoản thu theo năm");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Thống kê hộ gia đình đã nộp
     * GET /api/thong-ke/ho-gia-dinh/da-nop?maKhoanThu={maKhoanThu}
     */
    @GetMapping("/ho-gia-dinh/da-nop")
    public ResponseEntity<Map<String, Object>> thongKeHoGiaDinhDaNop(@RequestParam Integer maKhoanThu) {
        try {
            Map<String, Object> result = thongKeService.thongKeHoGiaDinhDaNop(maKhoanThu);
            result.put("trangThai", "da-nop");
            result.put("maKhoanThu", maKhoanThu);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê hộ gia đình đã nộp");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Thống kê hộ gia đình chưa nộp
     * GET /api/thong-ke/ho-gia-dinh/chua-nop?maKhoanThu={maKhoanThu}
     */
    @GetMapping("/ho-gia-dinh/chua-nop")
    public ResponseEntity<Map<String, Object>> thongKeHoGiaDinhChuaNop(@RequestParam Integer maKhoanThu) {
        try {
            Map<String, Object> result = thongKeService.thongKeHoGiaDinhChuaNop(maKhoanThu);
            result.put("trangThai", "chua-nop");
            result.put("maKhoanThu", maKhoanThu);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê hộ gia đình chưa nộp");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Thống kê doanh thu theo tháng
     * GET /api/thong-ke/doanh-thu/thang?thang={thang}&nam={nam}
     */
    @GetMapping("/doanh-thu/thang")
    public ResponseEntity<Map<String, Object>> thongKeDoanhThuTheoThang(
            @RequestParam Integer thang,
            @RequestParam Integer nam) {
        try {
            if (thang == null || thang < 1 || thang > 12) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Tháng không hợp lệ");
                errorResponse.put("message", "Tháng phải từ 1 đến 12");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            Map<String, Object> result = thongKeService.thongKeDoanhThuTheoThang(thang, nam);
            result.put("kieu", "thang");
            result.put("thang", thang);
            result.put("nam", nam);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Không thể thống kê doanh thu theo tháng");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
