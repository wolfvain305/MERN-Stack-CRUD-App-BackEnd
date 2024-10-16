import React, {useEffect, useState} from "react";
import axiosInstance from "../Authentication/axioxInstance";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/ProductList.css'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axiosInstance.get('/products')
                setProducts(data)

            
                const uniqueCategories = [...new Set(data.map(product => product.category))]
                setCategories(uniqueCategories)

                const queryParams = new URLSearchParams(location.search)
                const category= queryParams.get('category')
                if (category) {
                    setSelectedCategory(category)
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (product) => {
        if (!user) {
            navigate('/login')
            return
        }

        try {
            await axiosInstance.post(`/carts/add`, { productId: product._id, quantity: 1 })
            alert(`${product.name} has been added to your cart.`);
        } catch (error) {
            console.error('Error adding to cart:', error)
        }
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className="product-list-container">
            <h2>All Baking Products</h2>
            <button onClick={() => navigate('/cart')}>Go to Cart</button>
            <div>
                <label htmlFor='category-select'>Filter by Category:</label>
                <select id="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value=''>All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">${product.price}</p>
                        <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div >
        </div>
    );
};

export default ProductList;