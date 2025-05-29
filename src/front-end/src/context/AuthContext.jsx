import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { username, role }

    //  Tải user từ localStorage khi app khởi động
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    //  Hàm đăng nhập
    const login = (username, password) => {
        // Mock: kiểm tra tài khoản và gán role
        let role = null;
        if (username === "admin" && password === "admin123") {
            role = "admin";
        } else if (username === "accountant" && password === "acc123") {
            role = "accountant";
        }

        if (role) {
            const userData = { username, role };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); 
            return { success: true };
        }

        return { success: false, message: "Sai tài khoản hoặc mật khẩu" };
    };

    //  Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

//  Hook tiện lợi để sử dụng context
export const useAuth = () => useContext(AuthContext);
