import React, { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axioxInstance';
import { useAuth } from '../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Accessing the authenticated user context
    const navigate = useNavigate();

    // Fetching the user's cart from the backend
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                navigate('/login'); // Redirect to login if not authenticated
                return;
            }

            try {
                const response = await axiosInstance.get(`/users/${user._id}/cart`);
                setCart(response.data); // Assuming the response data contains the cart items
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, navigate]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axiosInstance.delete(`/cart/${productId}`); // Assuming your API has this endpoint
            setCart(cart.filter(item => item.product._id !== productId)); // Update local cart state
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
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
                <ul>
                    {cart.map((item) => (
                        <li key={item.product._id}>
                            <h3>{item.product.name}</h3>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;