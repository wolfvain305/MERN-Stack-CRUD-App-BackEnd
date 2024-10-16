import React, { createContext, useState, useContext} from "react";
import axiosInstance from "./axioxInstance";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = async (username, password) => {
        const { data } = await axiosInstance.post('/users/login', { username, password})
        localStorage.setItem('token', data.token)
        setUser(data.user)
    }

    const signup = async (userData) => {
        const {data} = await axiosInstance.post('users/signup', userData)
        localStorage.setItem('token', data.token)
        setUser(data.user)
    }

    const logout =() => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout}}>
                {children}
        </AuthContext.Provider>
    )
}