import React, {useEffect, useState} from "react";
import axiosInstance from "../Authentication/axioxInstance";
import { useAuth } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([])
    

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axiosInstance.get('/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h2>All Baking Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList
