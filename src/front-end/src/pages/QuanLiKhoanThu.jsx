import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Save } from 'lucide-react';

const KhoanThuManagement = () => {
  const [khoanThus, setKhoanThus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tenKhoanThu: '',
    loaiKhoanThu: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    batBuoc: true,
    donGia: 0
  });

  // API base URL - cập nhật theo địa chỉ back-end của bạn
  const API_BASE_URL = 'http://localhost:8080'; // Thay đổi theo port back-end của bạn

  useEffect(() => {
    loadKhoanThus();
  }, []);

  const loadKhoanThus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/khoanthu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Thêm các headers khác nếu cần (Authorization, etc.)
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setKhoanThus(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.tenKhoanThu || !formData.loaiKhoanThu || !formData.ngayBatDau || !formData.ngayKetThuc) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setLoading(true);

    try {
      // Chuẩn bị dữ liệu để gửi
      const submitData = {
        ...formData,
        ngayBatDau: new Date(formData.ngayBatDau).toISOString(),
        ngayKetThuc: new Date(formData.ngayKetThuc).toISOString(),
      };

      if (editingItem) {
        // PUT /api/khoanthu/edit
        const response = await fetch(`${API_BASE_URL}/api/khoanthu/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            ...submitData, 
            maKhoanThu: editingItem.maKhoanThu 
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedItem = await response.json();
        
        // Cập nhật danh sách local
        setKhoanThus(prev => prev.map(item => 
          item.maKhoanThu === editingItem.maKhoanThu ? updatedItem : item
        ));
        
        alert('Cập nhật khoản thu thành công!');
      } else {
        // POST /api/khoanthu/add
        const response = await fetch(`${API_BASE_URL}/api/khoanthu/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newItem = await response.json();
        
        // Thêm vào danh sách local
        setKhoanThus(prev => [...prev, newItem]);
        
        alert('Thêm khoản thu thành công!');
      }

      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      alert('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (maKhoanThu) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khoản thu này?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/khoanthu/delete/${maKhoanThu}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Xóa khỏi danh sách local
      setKhoanThus(prev => prev.filter(item => item.maKhoanThu !== maKhoanThu));
      
      alert('Xóa khoản thu thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
      alert('Có lỗi xảy ra khi xóa dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      tenKhoanThu: item.tenKhoanThu,
      loaiKhoanThu: item.loaiKhoanThu,
      ngayBatDau: item.ngayBatDau ? item.ngayBatDau.split('T')[0] : '',
      ngayKetThuc: item.ngayKetThuc ? item.ngayKetThuc.split('T')[0] : '',
      batBuoc: item.batBuoc,
      donGia: item.donGia
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      tenKhoanThu: '',
      loaiKhoanThu: '',
      ngayBatDau: '',
      ngayKetThuc: '',
      batBuoc: true,
      donGia: 0
    });
    setEditingItem(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredKhoanThus = khoanThus.filter(item =>
    item.tenKhoanThu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.loaiKhoanThu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Quản Lí Khoản Thu</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Thêm Khoản Thu
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm khoản thu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã KT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên Khoản Thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời Gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bắt Buộc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredKhoanThus.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredKhoanThus.map((item) => (
                  <tr key={item.maKhoanThu} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.maKhoanThu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.tenKhoanThu}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.loaiKhoanThu}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>Từ: {formatDate(item.ngayBatDau)}</div>
                        <div>Đến: {formatDate(item.ngayKetThuc)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(item.donGia)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.batBuoc 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.batBuoc ? 'Bắt buộc' : 'Tùy chọn'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.maKhoanThu)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingItem ? 'Sửa Khoản Thu' : 'Thêm Khoản Thu'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Khoản Thu *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenKhoanThu}
                  onChange={(e) => setFormData({...formData, tenKhoanThu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại Khoản Thu *
                </label>
                <select
                  required
                  value={formData.loaiKhoanThu}
                  onChange={(e) => setFormData({...formData, loaiKhoanThu: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn loại khoản thu</option>
                  <option value="Phí bắt buộc">Phí bắt buộc</option>
                  <option value="Phí dịch vụ">Phí dịch vụ</option>
                  <option value="Phí bảo trì">Phí bảo trì</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày Bắt Đầu *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.ngayBatDau}
                    onChange={(e) => setFormData({...formData, ngayBatDau: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày Kết Thúc *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.ngayKetThuc}
                    onChange={(e) => setFormData({...formData, ngayKetThuc: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đơn Giá (VND) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.donGia}
                  onChange={(e) => setFormData({...formData, donGia: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="batBuoc"
                  checked={formData.batBuoc}
                  onChange={(e) => setFormData({...formData, batBuoc: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="batBuoc" className="ml-2 block text-sm text-gray-900">
                  Khoản thu bắt buộc
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2 transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  {editingItem ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhoanThuManagement;