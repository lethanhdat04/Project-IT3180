import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';

const NhanKhauManager = () => {
  const [nhanKhauList, setNhanKhauList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    hoTen: '',
    ngaySinh: '',
    gioiTinh: 'Nam',
    trangThai: 'Thường trú',
    soCMND: '',
    tenChuHo: '',
    maHoKhau: '',
    quanHeVoiChuHo: ''
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
    const fetchNhanKhauList = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch("http://localhost:8080/api/nhankhaus");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNhanKhauList(data);
      } catch (error) {
        console.error("Error fetching nhan khau list:", error);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchNhanKhauList();
  }, []);

  const resetForm = () => {
    setFormData({
      hoTen: '',
      ngaySinh: '',
      gioiTinh: 'Nam',
      trangThai: 'Thường trú',
      soCMND: '',
      tenChuHo: '',
      maHoKhau: '',
      quanHeVoiChuHo: ''
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

  const handleDelete = async (maNhanKhau) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân khẩu này?')) {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`http://localhost:8080/api/nhankhaus/delete/${maNhanKhau}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        setNhanKhauList(prevList => prevList.filter(item => item.maNhanKhau !== maNhanKhau));
        setSuccessMessage('Xóa nhân khẩu thành công!');
        
      } catch (error) {
        console.error("Error deleting nhan khau:", error);
        setError(`Không thể xóa nhân khẩu: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.hoTen || !formData.soCMND || !formData.maHoKhau) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editingItem) {
        // Update existing item
        const response = await fetch(`http://localhost:8080/api/nhankhaus/edit`, {
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
        
        setNhanKhauList(prevList => prevList.map(item =>
          item.maNhanKhau === editingItem.maNhanKhau ? updatedItem : item
        ));
        setSuccessMessage('Cập nhật thông tin nhân khẩu thành công!');
      } else {
        // Add new item
        const response = await fetch('http://localhost:8080/api/nhankhaus/add', {
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
        
        setNhanKhauList(prevList => [...prevList, newItem]);
        setSuccessMessage('Thêm nhân khẩu mới thành công!');
      }
      
      setIsModalOpen(false);
      resetForm();
      setError('');
    } catch (error) {
      console.error("Error saving nhan khau:", error);
      setError(`Không thể lưu thông tin: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredList = nhanKhauList.filter(item =>
    item.hoTen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.soCMND?.includes(searchTerm) ||
    item.maHoKhau?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách nhân khẩu</h2>
              <button
                onClick={handleAdd}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm nhân khẩu
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo họ tên, CCCD, mã hộ khẩu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mã nhân khẩu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Họ và tên</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Ngày sinh</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Giới tính</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mã hộ khẩu</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tên Chủ Hộ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">CCCD/CMND</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quan hệ với chủ hộ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredList.map((item) => (
                    <tr key={item.maNhanKhau} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.maNhanKhau}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.hoTen}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.ngaySinh}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.gioiTinh}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.trangThai === 'Thường trú' 
                            ? 'bg-green-100 text-green-800' 
                            : item.trangThai === 'Tạm trú'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.trangThai}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.maHoKhau}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.tenChuHo}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.soCMND}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.quanHeVoiChuHo}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={loading}
                            className="p-2 text-blue-600 hover:bg-blue-50 disabled:text-blue-400 rounded-lg transition-colors"
                            title="Sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.maNhanKhau)}
                            disabled={loading}
                            className="p-2 text-red-600 hover:bg-red-50 disabled:text-red-400 rounded-lg transition-colors"
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
            )}

            {!loading && filteredList.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu nhân khẩu'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingItem ? 'Sửa thông tin nhân khẩu' : 'Thêm nhân khẩu mới'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="hoTen"
                      value={formData.hoTen}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="ngaySinh"
                      value={formData.ngaySinh}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới tính
                    </label>
                    <select
                      name="gioiTinh"
                      value={formData.gioiTinh}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      name="trangThai"
                      value={formData.trangThai}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Thường trú">Thường trú</option>
                      <option value="Tạm trú">Tạm trú</option>
                      <option value="Tạm vắng">Tạm vắng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CCCD/CMND *
                    </label>
                    <input
                      type="text"
                      name="soCMND"
                      value={formData.soCMND}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên chủ hộ
                    </label>
                    <input
                      type="text"
                      name="tenChuHo"
                      value={formData.tenChuHo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã hộ khẩu *
                    </label>
                    <input
                      type="text"
                      name="maHoKhau"
                      value={formData.maHoKhau}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quan hệ với chủ hộ
                    </label>
                    <input
                      type="text"
                      name="quanHeVoiChuHo"
                      value={formData.quanHeVoiChuHo}
                      onChange={handleInputChange}
                      placeholder="VD: Con, Vợ, Chồng..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Error message in modal */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {loading ? 'Đang xử lý...' : (editingItem ? 'Cập nhật' : 'Thêm mới')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NhanKhauManager;