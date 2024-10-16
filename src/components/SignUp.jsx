import React, {useState} from "react";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/AuthForm.css'


const SignUp = () => {
    const[userData, setUserData] = useState({ username: '', password: '', firstName: '', lastName: ''})
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(userData)
            navigate('/')
        } catch (error) {
            console.error('Sign up failed:', error)
            if (error.response && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Sign Up:</h2>
            <div className="input-group">
                <label>First Name:</label>
                <input value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>Last Name:</label>
                <input value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>Username:</label>
                <input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>Password:</label>
                <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />
            </div>
            <button type="submit" className="auth-button">Sign Up</button>
        </form>
    )
}

export default SignUp