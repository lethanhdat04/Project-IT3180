import axios from 'axios';

// Đường dẫn tới API của bạn
const BASE_URL = 'http://localhost:8080/api/hokhaus';

// Các hàm tương tác với API
export const hoKhauAPI = {
  // Lấy danh sách hộ khẩu
  getAllHoKhau: async () => {
    try {
      const res = await axios.get(BASE_URL);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Lỗi khi gọi API getAllHoKhau:', err);
      return { success: false, message: 'Không thể lấy danh sách hộ khẩu' };
    }
  },

  // Tạo mới hộ khẩu
  createHoKhau: async (data) => {
    try {
      const res = await axios.post(BASE_URL, data);
      return { success: true, data: res.data, message: 'Thêm hộ khẩu thành công!' };
    } catch (err) {
      console.error('Lỗi khi gọi API createHoKhau:', err);
      return { success: false, message: 'Không thể tạo mới hộ khẩu' };
    }
  },

  // Cập nhật hộ khẩu theo ID
  updateHoKhau: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return { success: true, data: res.data, message: 'Cập nhật thành công!' };
    } catch (err) {
      console.error('Lỗi khi gọi API updateHoKhau:', err);
      return { success: false, message: 'Không thể cập nhật hộ khẩu' };
    }
  },

  // Xóa hộ khẩu theo ID
  deleteHoKhau: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return { success: true, message: 'Xóa hộ khẩu thành công!' };
    } catch (err) {
      console.error('Lỗi khi gọi API deleteHoKhau:', err);
      return { success: false, message: 'Không thể xóa hộ khẩu' };
    }
  }
};

// Hàm kiểm tra dữ liệu đầu vào trước khi submit
export const validateHoKhauData = (data) => {
  const errors = {};

  if (!data.soHoKhau || data.soHoKhau.trim() === '') {
    errors.soHoKhau = 'Mã hộ khẩu không được để trống';
  }
  if (!data.tenChuHo || data.tenChuHo.trim() === '') {
    errors.tenChuHo = 'Tên chủ hộ không được để trống';
  }
  if (!data.diaChi || data.diaChi.trim() === '') {
    errors.diaChi = 'Địa chỉ không được để trống';
  }
  if (!data.sdt || data.sdt.trim() === '') {
    errors.sdt = 'Số điện thoại không được để trống';
  }
  if (!data.soThanhVien || data.soThanhVien <= 0) {
    errors.soThanhVien = 'Số thành viên phải lớn hơn 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
