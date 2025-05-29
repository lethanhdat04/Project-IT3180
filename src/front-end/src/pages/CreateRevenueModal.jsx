import React, { useState } from 'react';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

const CreateRevenueModal = ({ visible, onCancel, onCreate }) => {
    const [formData, setFormData] = useState({
        maKhoanThu: '',
        tenKhoanThu: '',
        loaiKhoanThu: '',
        soTien: '',
        doiTuongApDung: '',
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = () => {
        // Gọi hàm callback để xử lý dữ liệu
        onCreate(formData);
        // Reset và đóng modal
        setFormData({ maKhoanThu: '', tenKhoanThu: '', loaiKhoanThu: '', soTien: '', doiTuongApDung: '' });
    };

    return (
        <Modal
            title="Tạo khoản thu mới"
            open={visible}
            onCancel={onCancel}
            onOk={handleCreate}
            okText="Tạo mới"
            cancelText="Hủy"
        >
            <Input
                placeholder="Mã khoản thu"
                value={formData.maKhoanThu}
                onChange={e => handleChange('maKhoanThu', e.target.value)}
                className="mb-2"
            />
            <Input
                placeholder="Tên khoản thu"
                value={formData.tenKhoanThu}
                onChange={e => handleChange('tenKhoanThu', e.target.value)}
                className="mb-2"
            />
            <Select
                placeholder="Chọn loại khoản thu"
                value={formData.loaiKhoanThu}
                onChange={value => handleChange('loaiKhoanThu', value)}
                className="w-full mb-2"
            >
                <Option value="dichvu">Dịch vụ</Option>
                <Option value="vesinh">Vệ sinh</Option>
                <Option value="baove">Bảo vệ</Option>
            </Select>
            <Input
                placeholder="Số tiền (VND)"
                value={formData.soTien}
                onChange={e => handleChange('soTien', e.target.value)}
                type="number"
                className="mb-2"
            />
            <Select
                placeholder="Chọn đối tượng áp dụng"
                value={formData.doiTuongApDung}
                onChange={value => handleChange('doiTuongApDung', value)}
                className="w-full"
            >
                <Option value="toanhaA">Tòa nhà A</Option>
                <Option value="toanhaB">Tòa nhà B</Option>
            </Select>
        </Modal>
    );
};

export default CreateRevenueModal;
