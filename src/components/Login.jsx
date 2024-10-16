import React, { useState } from 'react'
import { useAuth } from '../Authentication/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/AuthForm.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(username, password)
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login:</h2>
                <div className="input-group">
                    <label>Username:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="auth-button">Login</button>
            </form>
    )
}

export default Login
