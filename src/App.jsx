import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Layout from './components/Layout';
import EditProduct from './components/EditProducts';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                        <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/ProductList" element={< ProductList />} />
                    <Route path="/Profile" element={< Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add-product" element={<AddProduct />} />      
                    <Route path='/EditProduct' element={<EditProduct/>} />               
                        </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;