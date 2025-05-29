import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import { 
    Users, 
    FileText, 
    UserCheck, 
    CreditCard, 
    DollarSign, 
    LogOut,
    Home,
    ChevronRight,
    Shield,
    User
} from "lucide-react";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const role = user?.role;

    // Role display configuration
    const roleConfig = {
        [ROLES.ADMIN]: {
            label: "Quản trị viên",
            icon: Shield,
            color: "text-yellow-400"
        },
        [ROLES.ACCOUNTANT]: {
            label: "Kế toán",
            icon: User,
            color: "text-green-400"
        }
    };

    // Menu items configuration
    const menuItems = {
        [ROLES.ADMIN]: [
            {
                path: "/ho-khau",
                label: "Quản lí Nhân khẩu",
                icon: Users,
                description: "Quản lý thông tin nhân khẩu"
            },
            {
                path: "/ds-ho-khau",
                label: "Danh sách hộ khẩu",
                icon: FileText,
                description: "Xem danh sách các hộ khẩu"
            },
            {
                path: "/ds-nhan-khau",
                label: "Danh sách nhân khẩu",
                icon: UserCheck,
                description: "Xem danh sách nhân khẩu"
            }
        ],
        [ROLES.ACCOUNTANT]: [
            {
                path: "/thu-phi",
                label: "Quản lí thu phí",
                icon: CreditCard,
                description: "Quản lý thu phí dịch vụ"
            },
            {
                path: "/quan-li-khoan-thu",
                label: "Quản lí khoản thu",
                icon: DollarSign,
                description: "Quản lý các khoản thu"
            }
        ]
    };

    const isActivePath = (path) => location.pathname === path;

    const RoleIcon = roleConfig[role]?.icon || User;

    return (
        <div className="w-72 bg-gradient-to-b from-[#004b91] to-[#003366] text-white min-h-screen shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-blue-800/50">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-blue-200" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        BlueMoon
                    </h1>
                </div>
                
                {/* User Info */}
                {user && (
                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                <RoleIcon className={`w-4 h-4 ${roleConfig[role]?.color || 'text-white'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user.username || user.email}
                                </p>
                                <p className={`text-xs ${roleConfig[role]?.color || 'text-blue-200'}`}>
                                    {roleConfig[role]?.label || role}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {menuItems[role]?.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = isActivePath(item.path);
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20'
                                        : 'text-blue-100 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 transition-colors ${
                                    isActive 
                                        ? 'bg-blue-500/30 text-white' 
                                        : 'bg-white/5 text-blue-200 group-hover:bg-white/10 group-hover:text-white'
                                }`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-blue-200/70 mt-0.5">
                                        {item.description}
                                    </p>
                                </div>
                                
                                <ChevronRight className={`w-4 h-4 transition-transform ${
                                    isActive ? 'rotate-90 text-white' : 'text-blue-300/50 group-hover:text-blue-200'
                                }`} />
                                
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-blue-500 rounded-r-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-blue-800/50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="font-medium">Đăng xuất</span>
                </button>
                
                <div className="mt-3 text-center">
                    <p className="text-xs text-blue-200/60">
                        © 2025 BlueMoon System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;