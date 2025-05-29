import React, { useState, useEffect } from 'react';
import { Building, DollarSign, FileText, BarChart3, Plus, Edit, Trash2, Eye, Search, Filter, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApartmentFeeManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bills, setBills] = useState([]);
  const [statistics, setStatistics] = useState({
    tongSoHoaDon: 0,
    soHoaDonChuaThanhToan: 0,
    tongSoHo: 0,
    soHoaDonDaThanhToan: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  
  const API_BASE_URL = 'http://localhost:8080/api';

 // API Functions
  const api = {
    // Lấy thống kê tổng hợp
    fetchStatistics: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/thong-ke/tong-hop`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
      }
    },

    // Lấy danh sách tất cả hóa đơn
    fetchBills: async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/hoadon`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching bills:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    // Lấy hóa đơn theo mã hộ khẩu
    fetchBillsByHousehold: async (maHoKhau) => {
      try {
        const response = await fetch(`${API_BASE_URL}/hoadon/${maHoKhau}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching bills by household:', error);
        throw error;
      }
    },

    // Lấy chi tiết hóa đơn
    fetchBillDetails: async (maHoaDon) => {
      try {
        const response = await fetch(`${API_BASE_URL}/hoadon/details/${maHoaDon}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching bill details:', error);
        throw error;
      }
    },

    // Thêm hóa đơn mới
    createBill: async (billData) => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/hoadon/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(billData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error creating bill:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    // Cập nhật hóa đơn
    updateBill: async (billData) => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/hoadon/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(billData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error updating bill:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    // Hủy hóa đơn
    cancelBill: async (maHoaDon) => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/hoadon/cancel/${maHoaDon}`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
      } catch (error) {
        console.error('Error canceling bill:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    // Xóa hóa đơn
    deleteBill: async (maHoaDon) => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/hoadon/delete/${maHoaDon}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
      } catch (error) {
        console.error('Error deleting bill:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  };

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([
      loadBills(),
      loadStatistics()
    ]);
  };

  const loadBills = async () => {
    try {
      setError(null);
      const data = await api.fetchBills();
      setBills(data);
    } catch (error) {
      // setError('Không thể tải dữ liệu hóa đơn. Vui lòng thử lại sau.');
      // Fallback to mock data if API fails
      const mockBills = [
        {
          maHoaDon: 1,
          maHoKhau: 101,
          maKhoanThu: 1,
          ngayThu: "2025-05-15T10:30:00.000Z",
          soTien: 500000,
          trangThai: "Đã thu"
        },
        {
          maHoaDon: 2,
          maHoKhau: 102,
          maKhoanThu: 2,
          ngayThu: "2025-05-10T14:15:00.000Z",
          soTien: 300000,
          trangThai: "Chưa thu"
        }
      ];
      setBills(mockBills);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = await api.fetchStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
      // Fallback to mock statistics if API fails
      setStatistics({
        tongSoHoaDon: 10,
        soHoaDonChuaThanhToan: 3,
        tongSoHo: 4,
        soHoaDonDaThanhToan: 6
      });
    }
  };

  // Calculate total revenue for chart
  const calculateTotalRevenue = () => {
    return bills
      .filter(bill => bill.trangThai === "Đã thu")
      .reduce((total, bill) => total + bill.soTien, 0);
  };

  // Chart data
  const chartData = [
    { month: 'T1', revenue: 15000000 },
    { month: 'T2', revenue: 18000000 },
    { month: 'T3', revenue: 22000000 },
    { month: 'T4', revenue: 19000000 },
    { month: 'T5', revenue: calculateTotalRevenue() },
  ];

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.maHoKhau.toString().includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || bill.trangThai === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddBill = () => {
    setModalType('add');
    setSelectedBill(null);
    setShowModal(true);
  };

  const handleEditBill = (bill) => {
    setModalType('edit');
    setSelectedBill(bill);
    setShowModal(true);
  };

  const handleViewBill = (bill) => {
    setModalType('view');
    setSelectedBill(bill);
    setShowModal(true);
  };

  const handleDeleteBill = async (billId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        await api.deleteBill(billId);
        setBills(bills.filter(bill => bill.maHoaDon !== billId));
        // Reload statistics after deletion
        await loadStatistics();
      } catch (error) {
        setError('Không thể xóa hóa đơn. Vui lòng thử lại sau.');
      }
    }
  };

  const handleRefresh = () => {
    loadInitialData();
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

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-12 h-12 text-white/60" />
      </div>
    </div>
  );

  const BillModal = () => {
    const [formData, setFormData] = useState(
      selectedBill || {
        maHoKhau: '',
        maKhoanThu: '',
        ngayThu: new Date().toISOString().split('T')[0],
        soTien: '',
        trangThai: 'Chưa thu'
      }
    );
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
      try {
        setSubmitting(true);
        
        const billData = {
          ...formData,
          maHoKhau: parseInt(formData.maHoKhau),
          maKhoanThu: parseInt(formData.maKhoanThu),
          soTien: parseFloat(formData.soTien),
          ngayThu: new Date(formData.ngayThu).toISOString()
        };

        if (modalType === 'add') {
          const newBill = await api.createBill(billData);
          setBills([...bills, newBill]);
        } else if (modalType === 'edit') {
          const updatedBill = await api.updateBill(billData);
          setBills(bills.map(bill => 
            bill.maHoaDon === selectedBill.maHoaDon ? updatedBill : bill
          ));
        }
        
        // Reload statistics after add/edit
        await loadStatistics();
        setShowModal(false);
      } catch (error) {
        setError(`Không thể ${modalType === 'add' ? 'thêm' : 'cập nhật'} hóa đơn. Vui lòng thử lại sau.`);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <h3 className="text-xl font-bold mb-4">
            {modalType === 'add' && 'Thêm hóa đơn mới'}
            {modalType === 'edit' && 'Sửa hóa đơn'}
            {modalType === 'view' && 'Chi tiết hóa đơn'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã hộ khẩu</label>
              <input
                type="number"
                value={formData.maHoKhau}
                onChange={(e) => setFormData({...formData, maHoKhau: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalType === 'view'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã khoản thu</label>
              <input
                type="number"
                value={formData.maKhoanThu}
                onChange={(e) => setFormData({...formData, maKhoanThu: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalType === 'view'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
              <input
                type="number"
                value={formData.soTien}
                onChange={(e) => setFormData({...formData, soTien: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalType === 'view'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày thu</label>
              <input
                type="date"
                value={formData.ngayThu}
                onChange={(e) => setFormData({...formData, ngayThu: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalType === 'view'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                value={formData.trangThai}
                onChange={(e) => setFormData({...formData, trangThai: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalType === 'view'}
              >
                <option value="Chưa thu">Chưa thu</option>
                <option value="Đã thu">Đã thu</option>
              </select>
            </div>
            
            <div className="flex gap-2 pt-4">
              {modalType !== 'view' && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Đang xử lý...' : (modalType === 'add' ? 'Thêm' : 'Cập nhật')}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Thu phí Chung cư</h1>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'dashboard' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Thống kê
            </button>
            
            <button
              onClick={() => setActiveTab('bills')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'bills' 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Quản lý thu phí
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {loading && <LoadingSpinner />}
        
        {!loading && activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Tổng số hộ"
                value={statistics.tongSoHo}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                icon={Building}
              />
              <StatCard
                title="Số hóa đơn đã thanh toán"
                value={statistics.soHoaDonDaThanhToan}
                color="bg-gradient-to-br from-green-500 to-green-600"
                icon={DollarSign}
              />
              <StatCard
                title="Số hóa đơn chưa thanh toán"
                value={statistics.soHoaDonChuaThanhToan}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                icon={FileText}
              />
              <StatCard
                title="Tổng số hóa đơn"
                value={statistics.tongSoHoaDon}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                icon={BarChart3}
              />
            </div>
            
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Thống kê doanh thu theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Doanh thu"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {!loading && activeTab === 'bills' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách hóa đơn</h2>
              <button
                onClick={handleAddBill}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm hóa đơn
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo mã hộ khẩu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả</option>
                    <option value="Đã thu">Đã thu</option>
                    <option value="Chưa thu">Chưa thu</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Bills Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã HĐ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã hộ khẩu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã khoản thu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày thu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBills.map((bill) => (
                      <tr key={bill.maHoaDon} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bill.maHoaDon}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bill.maHoKhau}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bill.maKhoanThu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(bill.soTien)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(bill.ngayThu)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bill.trangThai === 'Đã thu'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {bill.trangThai}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewBill(bill)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditBill(bill)}
                              className="text-green-600 hover:text-green-900"
                              title="Sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBill(bill.maHoaDon)}
                              className="text-red-600 hover:text-red-900"
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
                
                {filteredBills.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Không có dữ liệu hóa đơn
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <BillModal />}
    </div>
  );
};

export default ApartmentFeeManagement;