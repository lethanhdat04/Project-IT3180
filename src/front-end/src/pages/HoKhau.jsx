import React, { useState, useEffect } from 'react';
import { User, Users, BarChart3, Search, Plus, Edit, Trash2, Eye, Calendar, MapPin, Phone, Mail, FileText } from 'lucide-react';

const HouseholdManagementForm = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Data states
    const [hoKhauList, setHoKhauList] = useState([]);
    const [nhanKhauList, setNhanKhauList] = useState([]);
    const [statistics, setStatistics] = useState({
        totalHouseholds: 0,
        totalResidents: 0,
        temporaryResidents: 0,
        genderStats: { male: 0, female: 0, other: 0 },
        ageGroups: { under18: 0, from18to60: 0, over60: 0 },
        statusStats: { permanent: 0, temporary: 0, absent: 0 }
    });
    const [historyData, setHistoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // API functions
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
        console.log("Ho Khau Data:", data);
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


    const fetchResidents = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/nhankhaus');
            if (!response.ok) throw new Error('Failed to fetch residents');
            const data = await response.json();
            setNhanKhauList(data);
            return data;
        } catch (err) {
            console.error('Error fetching residents:', err);
            // setError('Không thể tải dữ liệu nhân khẩu');
            // Fallback data for demo
            const fallbackData = [
            //      { id: 1, hoTen: 'Nguyen Van A', ngaySinh: '1980-01-15', gioiTinh: 'Nam', cccd: '123456789012', maHoKhau: 'HK001', trangThai: 'Thường trú' },
            //      { id: 2, hoTen: 'Nguyen Thi An', ngaySinh: '1982-03-20', gioiTinh: 'Nữ', cccd: '098765432109', maHoKhau: 'HK001', trangThai: 'Thường trú' },
            //      { id: 3, hoTen: 'Nguyen Van Binh', ngaySinh: '2010-07-01', gioiTinh: 'Nam', cccd: '', maHoKhau: 'HK001', trangThai: 'Thường trú' },
            //      { id: 4, hoTen: 'Nguyen Thi Chi', ngaySinh: '2015-11-11', gioiTinh: 'Nữ', cccd: '', maHoKhau: 'HK001', trangThai: 'Thường trú' },
            //      { id: 5, hoTen: 'Tran Thi B', ngaySinh: '1975-04-25', gioiTinh: 'Nữ', cccd: '112233445566', maHoKhau: 'HK002', trangThai: 'Thường trú' },
            //      { id: 6, hoTen: 'Nguyen Thi Thom', ngaySinh: '1950-09-30', gioiTinh: 'Nữ', cccd: '223344556677', maHoKhau: 'HK002', trangThai: 'Thường trú' },
            //      { id: 7, hoTen: 'Le Van C', ngaySinh: '1990-08-05', gioiTinh: 'Nam', cccd: '334455667788', maHoKhau: 'HK003', trangThai: 'Thường trú' },
            //      { id: 8, hoTen: 'Le Thi D', ngaySinh: '1992-06-18', gioiTinh: 'Nữ', cccd: '445566778899', maHoKhau: 'HK003', trangThai: 'Thường trú' },
            //      { id: 9, hoTen: 'Pham Van E', ngaySinh: '1988-02-14', gioiTinh: 'Nam', cccd: '556677889900', maHoKhau: 'HK003', trangThai: 'Tạm trú' },
            //     //  { id: 10, hoTen: 'Pham Thi D', ngaySinh: '1965-12-01', gioiTinh: 'Nữ', cccd: '667788990011', maHoKhau: 'HK004', trangThai: 'Thường trú' }
            ];
            setNhanKhauList(fallbackData);
            return fallbackData;
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/history');
            if (!response.ok) throw new Error('Failed to fetch history');
            const data = await response.json();
            setHistoryData(data);
            return data;
        } catch (err) {
            console.error('Error fetching history:', err);
            // Fallback data for demo
            const fallbackData = [
                { id: 1, ngay: '2024-05-15', hoTen: 'Nguyễn Van A', loaiThayDoi: 'Thêm mới', moTa: 'Thêm nhân khẩu mới', nguoiThucHien: 'Admin' },
                { id: 2, ngay: '2024-05-10', hoTen: 'Tran Thi B', loaiThayDoi: 'Cập nhật', moTa: 'Thay đổi địa chỉ', nguoiThucHien: 'Admin' },
                { id: 3, ngay: '2024-05-08', hoTen: 'Le Van C', loaiThayDoi: 'Tạm trú', moTa: 'Đăng ký tạm trú', nguoiThucHien: 'Admin' },
                { id: 4, ngay: '2024-05-05', hoTen: 'Pham Thị E', loaiThayDoi: 'Tạm vắng', moTa: 'Đăng ký tạm vắng', nguoiThucHien: 'Admin' }
            ];
            setHistoryData(fallbackData);
            return fallbackData;
        }
    };

    // Calculate statistics
    const calculateStatistics = (householdsData, residentsData) => {
        const totalHouseholds = householdsData.length;
        const totalResidents = residentsData.length;
        
        // Gender statistics
        const genderStats = residentsData.reduce((acc, resident) => {
            if (resident.gioiTinh === 'Nam') acc.male++;
            else if (resident.gioiTinh === 'Nữ') acc.female++;
            else acc.other++;
            return acc;
        }, { male: 0, female: 0, other: 0 });

        // Age group statistics
        const currentYear = new Date().getFullYear();
        const ageGroups = residentsData.reduce((acc, resident) => {
            const birthYear = new Date(resident.ngaySinh).getFullYear();
            const age = currentYear - birthYear;
            if (age < 18) acc.under18++;
            else if (age <= 60) acc.from18to60++;
            else acc.over60++;
            return acc;
        }, { under18: 0, from18to60: 0, over60: 0 });

        // Status statistics
        const statusStats = residentsData.reduce((acc, resident) => {
            if (resident.trangThai === 'Thường trú') acc.permanent++;
            else if (resident.trangThai === 'Tạm trú') acc.temporary++;
            else if (resident.trangThai === 'Tạm vắng') acc.absent++;
            return acc;
        }, { permanent: 0, temporary: 0, absent: 0 });

        const temporaryResidents = statusStats.temporary + statusStats.absent;

        setStatistics({
            totalHouseholds,
            totalResidents,
            temporaryResidents,
            genderStats,
            ageGroups,
            statusStats
        });
    };

    // Search and filter functions
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        if (!keyword.trim()) {
            setFilteredData([]);
            return;
        }

        const filtered = nhanKhauList.filter(nhanKhauList => 
            nhanKhauList.hoTen.toLowerCase().includes(keyword.toLowerCase()) ||
            nhanKhauList.soCMND.includes(keyword) ||
            nhanKhauList.maHoKhau.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // Load data on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const [householdsData, residentsData] = await Promise.all([
                    fetchHouseholds(),
                    fetchResidents()
                ]);
                calculateStatistics(householdsData, residentsData);
                await fetchHistory();
            } catch (err) {
                console.error('Error loading data:', err);
            }
        };

        loadData();
    }, []);

    const renderStatsTab = () => {
        const statCards = [
            { 
                id: 'gender', 
                label: 'Thống kê theo giới tính', 
                value: `Nam: ${statistics.genderStats.male}, Nữ: ${statistics.genderStats.female}`,
                color: 'blue'
            },
            { 
                id: 'age', 
                label: 'Thống kê theo độ tuổi', 
                value: `<18: ${statistics.ageGroups.under18}, 18-60: ${statistics.ageGroups.from18to60}, >60: ${statistics.ageGroups.over60}`,
                color: 'green'
            },
            { 
                id: 'status', 
                label: 'Thống kê theo trạng thái', 
                value: `TT: ${statistics.statusStats.permanent}, TRU: ${statistics.statusStats.temporary}, TV: ${statistics.statusStats.absent}`,
                color: 'orange'
            },
            { 
                id: 'temp', 
                label: 'Thống kê tạm vắng, tạm trú', 
                value: `${statistics.temporaryResidents} người`,
                color: 'purple'
            }
        ];

        return (
            <div className="space-y-6">
                {loading && (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map(({ id, label, value, color }) => (
                        <div key={id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 bg-${color}-100 rounded-lg`}>
                                    <BarChart3 className={`text-${color}-600`} size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{label}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Thống kê tổng quan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{statistics.totalHouseholds}</div>
                            <div className="text-gray-600">Tổng số hộ khẩu</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{statistics.totalResidents}</div>
                            <div className="text-gray-600">Tổng số nhân khẩu</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">{statistics.temporaryResidents}</div>
                            <div className="text-gray-600">Tạm trú/tạm vắng</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Chi tiết thống kê</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium mb-3">Phân bố theo giới tính</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Nam:</span>
                                    <span className="font-medium">{statistics.genderStats.male} người</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nữ:</span>
                                    <span className="font-medium">{statistics.genderStats.female} người</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Khác:</span>
                                    <span className="font-medium">{statistics.genderStats.other} người</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-3">Phân bố theo độ tuổi</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Dưới 18 tuổi:</span>
                                    <span className="font-medium">{statistics.ageGroups.under18} người</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>18-60 tuổi:</span>
                                    <span className="font-medium">{statistics.ageGroups.from18to60} người</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Trên 60 tuổi:</span>
                                    <span className="font-medium">{statistics.ageGroups.over60} người</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderQueryTab = () => {
        return (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Tìm kiếm thông tin</h3>
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, CCCD, mã hộ khẩu..."
                            value={searchKeyword}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {searchKeyword && (
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Kết quả tìm kiếm ({filteredData.length})</h3>
                        {filteredData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border border-gray-200 px-4 py-2 text-left">Họ tên</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left">Ngày sinh</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left">Giới tính</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left">CCCD</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left">Mã hộ khẩu</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map(resident => (
                                            <tr key={resident.id} className="hover:bg-gray-50">
                                                <td className="border border-gray-200 px-4 py-2">{resident.hoTen}</td>
                                                <td className="border border-gray-200 px-4 py-2">{resident.ngaySinh}</td>
                                                <td className="border border-gray-200 px-4 py-2">{resident.gioiTinh}</td>
                                                <td className="border border-gray-200 px-4 py-2">{resident.cccd}</td>
                                                <td className="border border-gray-200 px-4 py-2">{resident.maHoKhau}</td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        resident.trangThai === 'Thường trú' ? 'bg-green-100 text-green-800' :
                                                        resident.trangThai === 'Tạm trú' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {resident.trangThai}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">Không tìm thấy kết quả nào</p>
                        )}
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Eye size={20} />
                        Lịch sử thay đổi nhân khẩu
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-200 px-4 py-2 text-left">Ngày</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left">Họ tên</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left">Loại thay đổi</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left">Mô tả</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-200 px-4 py-2">{item.ngay}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.hoTen}</td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                item.loaiThayDoi === 'Thêm mới' ? 'bg-green-100 text-green-800' :
                                                item.loaiThayDoi === 'Cập nhật' ? 'bg-blue-100 text-blue-800' :
                                                item.loaiThayDoi === 'Tạm trú' ? 'bg-orange-100 text-orange-800' :
                                                'bg-purple-100 text-purple-800'
                                            }`}>
                                                {item.loaiThayDoi}
                                            </span>
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">{item.moTa}</td>
                                        <td className="border border-gray-200 px-4 py-2">
                                            <button className="text-blue-600 hover:text-blue-800 mr-2">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const tabs = [
        { id: 'stats', label: 'Thống kê', icon: BarChart3, component: renderStatsTab },
        { id: 'query', label: 'Truy vấn', icon: Search, component: renderQueryTab }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Quản lý hộ khẩu, nhân khẩu
                        </h1>
                        <p className="text-gray-600">
                            Hệ thống quản lý thông tin hộ khẩu và nhân khẩu của khu vực
                        </p>
                    </div>

                    <div className="flex border-b">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-3 px-6 py-4 font-medium transition-colors relative ${activeTab === id
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {tabs.find(tab => tab.id === activeTab)?.component()}
                </div>
            </div>
        </div>
    );
};

export default HouseholdManagementForm;