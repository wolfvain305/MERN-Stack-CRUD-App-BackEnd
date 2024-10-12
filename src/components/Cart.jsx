import React, { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axioxInstance';
import { useAuth } from '../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'

const Cart = () => {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()

   
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                navigate('/login')
                return
            }

            try {
                const {response} = await axiosInstance.get('/carts')
                setCart(response.data) 
            } catch (error) {
                console.error('Error fetching cart:', error)
            } finally {
                setLoading(false)
            }
        };

        fetchCart();
    }, [user, navigate])

    const handleRemoveFromCart = async (productId) => {
        try {
            await axiosInstance.delete(`/cart/remove/${productId}`) 
            setCart(cart.filter(item => item.product._id !== productId))
        } catch (error) {
            console.error('Error removing item from cart:', error)
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <button onClick={() => navigate('/ProductList')}>View Our Products</button>
                </div>
            ) : (
                <div className="cart-container">
                    {cart.map((item) => (
                        <div className="cart-card" key={item.product._id}>
                            <div className="cart-card-content">
                                <h3 className="cart-card-title">{item.product.name}</h3>
                                <p className="cart-card-price">Price: ${item.product.price}</p>
                                <p className="cart-card-quantity">Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveFromCart(item.product._id)} className="remove-button">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;