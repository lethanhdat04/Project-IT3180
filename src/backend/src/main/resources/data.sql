INSERT INTO users (full_name, password, role, username) VALUES
                                                            ('Nguyen Van Admin', 'hashed_password_admin', 'ADMIN', 'admin'),
                                                            ('Tran Thi User', 'hashed_password_user', 'USER', 'user1');

INSERT INTO ho_khau (dia_chi, so_dien_thoai, so_nhan_khau, ten_chu_ho) VALUES
                                                                           ('Số 1, Ngõ 1, Đường A', '0901111111', 4, 'Nguyen Van A'),
                                                                           ('Số 2, Ngõ 1, Đường A', '0902222222', 2, 'Tran Thi B'),
                                                                           ('Số 3, Ngõ 2, Đường C', '0903333333', 3, 'Le Van C'),
                                                                           ('Số 4, Ngõ 3, Đường D', '0904444444', 1, 'Pham Thi D');

INSERT INTO khoan_thu (bat_buoc, don_gia, loai_khoan_thu, ngay_bat_dau, ngay_ket_thuc, ten_khoan_thu) VALUES
                                                                                                          (true, 15000.0, 'PHI_QUAN_LY', '2023-01-01', '2023-12-31', 'Phí Quản Lý Căn Hộ/M2'),
                                                                                                          (true, NULL, 'PHI_GUI_XE', '2023-01-01', '2023-12-31', 'Phí Gửi Xe Hàng Tháng'),
                                                                                                          (false, NULL, 'KHOAN_DONG_GOP', '2023-05-01', '2023-06-30', 'Đóng Góp Quỹ Thiếu Nhi'),
                                                                                                          (true, 10000.0, 'PHI_DICH_VU', '2023-01-01', '2023-12-31', 'Phí Vệ Sinh Chung/M2'),
                                                                                                          (true, 50000.0, 'KHOAN_THU_KHAC', '2023-11-01', '2023-11-30', 'Tiền Điện Sinh Hoạt');

-- INSERT INTO phi_quan_ly (ma_khoan_thu, don_gia_theo_m2) VALUES (1, 15000.0);
--
-- INSERT INTO phi_gui_xe (ma_khoan_thu, don_gia_xe_may, don_gia_oto) VALUES (2, 100000.0, 500000.0);
--
-- INSERT INTO khoan_dong_gop (ma_khoan_thu, tu_nguyen) VALUES (3, true);
--
-- INSERT INTO phi_dich_vu (ma_khoan_thu, don_gia_theo_m2) VALUES (4, 10000.0);

INSERT INTO nhan_khau (ho_ten, ngay_sinh, gioi_tinh, so_cmnd, quan_he_voi_chu_ho, trang_thai, ma_ho_khau) VALUES
                                                                                                              ('Nguyen Van A', '1980-01-15', 'Nam', '123456789012', 'Chủ hộ', 'Thường trú', 1),
                                                                                                              ('Nguyen Thi An', '1982-03-20', 'Nữ', '098765432109', 'Vợ', 'Thường trú', 1),
                                                                                                              ('Nguyen Van Binh', '2010-07-01', 'Nam', NULL, 'Con', 'Thường trú', 1),
                                                                                                              ('Nguyen Thi Chi', '2015-11-11', 'Nữ', NULL, 'Con', 'Thường trú', 1);

INSERT INTO nhan_khau (ho_ten, ngay_sinh, gioi_tinh, so_cmnd, quan_he_voi_chu_ho, trang_thai, ma_ho_khau) VALUES
                                                                                                              ('Tran Thi B', '1975-04-25', 'Nữ', '112233445566', 'Chủ hộ', 'Thường trú', 2),
                                                                                                              ('Nguyen Thi Thơm', '1950-09-30', 'Nữ', '223344556677', 'Mẹ', 'Thường trú', 2);

INSERT INTO nhan_khau (ho_ten, ngay_sinh, gioi_tinh, so_cmnd, quan_he_voi_chu_ho, trang_thai, ngay_bat_dau_tam_tru_tam_vang, ngay_ket_thuc_tam_tru_tam_vang, ma_ho_khau) VALUES
                                                                                                                                                                             ('Le Van C', '1990-08-05', 'Nam', '334455667788', 'Chủ hộ', 'Thường trú', NULL, NULL, 3),
                                                                                                                                                                             ('Le Thi D', '1992-06-18', 'Nữ', '445566778899', 'Em gái', 'Thường trú', NULL, NULL, 3),
                                                                                                                                                                             ('Pham Van E', '1988-02-14', 'Nam', '556677889900', 'Anh rể', 'Tạm trú', '2023-10-01', '2024-03-31', 3);

INSERT INTO nhan_khau (ho_ten, ngay_sinh, gioi_tinh, so_cmnd, quan_he_voi_chu_ho, trang_thai, ma_ho_khau) VALUES
    ('Pham Thi D', '1965-12-01', 'Nữ', '667788990011', 'Chủ hộ', 'Thường trú', 4);

INSERT INTO phuong_tien (bien_so, loai_phuong_tien, ma_ho_khau) VALUES
                                                                    ('30A-12345', 'Ô tô', 1),
                                                                    ('29B1-67890', 'Xe máy', 1);

INSERT INTO phuong_tien (bien_so, loai_phuong_tien, ma_ho_khau) VALUES
    ('33M1-11223', 'Xe máy', 2);

INSERT INTO phuong_tien (bien_so, loai_phuong_tien, ma_ho_khau) VALUES
    ('17F1-44556', 'Xe máy', 3);

INSERT INTO hoa_don (ngay_thu, so_tien, trang_thai, ma_ho_khau, ma_khoan_thu) VALUES
                                                                                  ('2023-10-25', 1500000.0, 'Đã thu', 1, 1),
                                                                                  ('2023-10-25', 100000.0 + 500000.0, 'Đã thu', 1, 2),
                                                                                  ('2023-10-25', 800000.0, 'Đã thu', 1, 4);

INSERT INTO hoa_don (ngay_thu, so_tien, trang_thai, ma_ho_khau, ma_khoan_thu) VALUES
                                                                                  ('2023-11-05', 1200000.0, 'Chưa thu', 2, 1),
                                                                                  ('2023-11-05', 100000.0, 'Đã thu', 2, 2),
                                                                                  (NULL, 50000.0, 'Chưa thu', 2, 5);

INSERT INTO hoa_don (ngay_thu, so_tien, trang_thai, ma_ho_khau, ma_khoan_thu) VALUES
                                                                                  ('2023-06-15', 50000.0, 'Đã thu', 3, 3),
                                                                                  ('2023-11-01', 1050000.0, 'Đã thu', 3, 1);

INSERT INTO hoa_don (ngay_thu, so_tien, trang_thai, ma_ho_khau, ma_khoan_thu) VALUES
    ('2023-11-15', 750000.0, 'Chưa thu', 4, 1);