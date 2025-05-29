import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';

const HoKhauManager = () => {
  const [hoKhauList, setHoKhauList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    maHoKhau: '',
    tenChuHo: '',
    diaChi: '',
    soDienThoai: '',
    soNhanKhau: 1
  });

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError('');
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  // Fetch data from API
  useEffect(() => {
    const fetchHoKhauList = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch("http://localhost:8080/api/hokhaus");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHoKhauList(data);
      } catch (error) {
        console.error("Error fetching ho khau list:", error);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoKhauList();
  }, []);

  const resetForm = () => {
    setFormData({
      maHoKhau: '',
      tenChuHo: '',
      diaChi: '',
      soDienThoai: '',
      soNhanKhau: 1
    });
  };

  const handleAdd = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
    setError('');
    setSuccessMessage('');
  };
  
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
    setError('');
    setSuccessMessage('');
  };

  const handleDelete = async (maHoKhau) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hộ khẩu này?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:8080/api/hokhaus/${maHoKhau}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      setHoKhauList(prevList => prevList.filter(item => item.maHoKhau !== maHoKhau));
      setSuccessMessage('Xóa hộ khẩu thành công!');
    } catch (error) {
      console.error("Error deleting ho khau:", error);
      setError(`Không thể xóa hộ khẩu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.tenChuHo || !formData.maHoKhau || !formData.diaChi || !formData.soDienThoai) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editingItem) {
        // Update existing item
        const response = await fetch(`http://localhost:8080/api/hokhaus/edit/${formData.maHoKhau}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        const updatedItem = await response.json();
        
        setHoKhauList(prevList => prevList.map(item =>
          item.maHoKhau === editingItem.maHoKhau ? updatedItem : item
        ));
        setSuccessMessage('Cập nhật thông tin hộ khẩu thành công!');
      } else {
        // Add new item
        const response = await fetch('http://localhost:8080/api/hokhaus/add', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        const newItem = await response.json();
        
        setHoKhauList(prevList => [...prevList, newItem]);
        setSuccessMessage('Thêm hộ khẩu mới thành công!');
      }
      
      setIsModalOpen(false);
      resetForm();
      setError('');
    } catch (error) {
      console.error("Error saving ho khau:", error);
      setError(`Không thể lưu thông tin: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'soNhanKhau' ? parseInt(value) || 1 : value 
    }));
  };

  // Lọc danh sách theo từ khóa
  const filteredList = hoKhauList.filter((hoKhau) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      (hoKhau.maHoKhau?.toString() || '').toLowerCase().includes(keyword) ||
      (hoKhau.tenChuHo?.toString() || '').toLowerCase().includes(keyword) ||
      (hoKhau.diaChi?.toString() || '').toLowerCase().includes(keyword) ||
      (hoKhau.soDienThoai?.toString() || '').toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách Hộ khẩu</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Thêm hộ khẩu
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã hộ khẩu, tên chủ hộ, địa chỉ, SĐT..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Table */}
          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mã hộ khẩu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tên chủ hộ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Địa chỉ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">SĐT</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Số nhân khẩu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredList.map((hoKhau) => (
                    <tr key={hoKhau.maHoKhau} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{hoKhau.maHoKhau || ''}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{hoKhau.tenChuHo || ''}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{hoKhau.diaChi || ''}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{hoKhau.soDienThoai || ''}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {hoKhau.soNhanKhau || 0} người
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(hoKhau)}
                            disabled={loading}
                            className="p-2 text-blue-600 hover:bg-blue-50 disabled:text-blue-300 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(hoKhau.maHoKhau)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 disabled:text-red-300 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredList.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {searchKeyword ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu hộ khẩu'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Sửa thông tin hộ khẩu' : 'Thêm hộ khẩu mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:text-gray-300 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã hộ khẩu *
                  </label>
                  <input
                    type="text"
                    name="maHoKhau"
                    value={formData.maHoKhau}
                    onChange={handleInputChange}
                    placeholder="VD: HK001"
                    disabled={loading || !!editingItem}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên chủ hộ *
                  </label>
                  <input
                    type="text"
                    name="tenChuHo"
                    value={formData.tenChuHo}
                    onChange={handleInputChange}
                    placeholder="VD: Nguyễn Văn A"
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ *
                  </label>
                  <textarea
                    name="diaChi"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                    placeholder="VD: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                    rows="3"
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleInputChange}
                    placeholder="VD: 0909123456"
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số nhân khẩu
                  </label>
                  <input
                    type="number"
                    name="soNhanKhau"
                    value={formData.soNhanKhau}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Đang xử lý...' : (editingItem ? 'Cập nhật' : 'Thêm mới')}
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HoKhauManager;