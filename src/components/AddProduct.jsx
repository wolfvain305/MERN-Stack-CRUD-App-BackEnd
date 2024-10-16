import React, {useState} from "react";
import axiosInstance from "../Authentication/axioxInstance";
import { useNavigate } from "react-router-dom";
import '../styles/AddProductForm.css'

const AddProduct = () => {
    const [productData, setProductData] = useState ({
        name: '',
        description: '',
        price: '0',
        category: '',
        imageUrl: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/products', productData)
            navigate('/')
        } catch (error) {
            console.error('Failed to add product:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2 className="product-title"> Add Baking Product</h2>
            <div className="product-group">
            <label>Product Name:</label>
            <input value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })}/>
            </div>
            <div className="product-group">
            <label>Product Description:</label>
            <textarea value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })}></textarea>
            </div>
            <div className="product-group">
            <label>Product Price:</label>
            <input value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })}type="number" />
            </div>
            <div className="product-group">
            <label>Product Category:</label>
            <input value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })}/>
            </div>
            <div className="product-group">
            <label>Product Image:</label>
            <input value={productData.imageUrl} onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}/>
            </div>
            <div className="add-product-button">
            <button type="submit">Add Product</button>
            </div>
        </form>
    )
}

export default AddProduct