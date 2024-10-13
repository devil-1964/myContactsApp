import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (token) => {
        localStorage.setItem("accessToken", token);
        await fetchUser();
    };

    const fetchUser = async () => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/current`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.removeItem("accessToken");
                setUser(null);
                setIsLoggedIn(false);
            }
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
