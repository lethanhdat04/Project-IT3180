// src/components/Header.jsx
import React from "react";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Avatar } from "antd";

const Header = () => {
    return (
        <div className="flex justify-between items-center px-6 py-2 bg-white shadow-sm">
            {/* Logo và tiêu đề */}
            <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-700 to-blue-400 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg">
                    B
                </div>
                <span className="text-lg font-semibold text-blue-900">
                    BlueMoon Apartment Management System
                </span>
            </div>

            {/* Phần người dùng */}
            <div className="flex items-center space-x-4">
                {/* Thông báo */}
                <Badge count={3} size="small">
                    <BellOutlined className="text-xl" />
                </Badge>

                {/* Avatar + tên */}
                <div className="flex items-center space-x-2">
                    <Avatar style={{ backgroundColor: "#004080" }}>QT</Avatar>
                    <div>
                        <div className="text-sm font-medium">Quản Trị Viên</div>
                        <div className="text-xs text-gray-500">Admin</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
