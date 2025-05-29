// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
// import ThongKe from "./pages/ThongKe";
import QuanLiKhoanThu from "./pages/QuanLiKhoanThu";
import ThuPhi from "./pages/ThuPhi";
import ProtectedRoute from "./components/ProtectedRoute";
import HoKhau from "./pages/HoKhau";
import NhanKhauList from "./pages/NhanKhauList";
import HoKhauList from "./pages/HoKhauList";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 bg-gray-50 min-h-screen p-6">
                    <Routes>
                      <Route path="/thu-phi" element={<ThuPhi />} />
                      <Route path="/quan-li-khoan-thu" element={<QuanLiKhoanThu />} />
                      {/* <Route path="/thong-ke" element={<ThongKe />} /> */}
                      <Route path="/ho-khau" element={<HoKhau />} />
                      <Route path="/ds-nhan-khau" element={<NhanKhauList/>} />
                      <Route path="/ds-ho-khau" element={<HoKhauList/>} />

                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
