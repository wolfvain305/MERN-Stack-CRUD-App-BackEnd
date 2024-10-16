import React, { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axioxInstance';
import '../styles/EditProduct.css';

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: ''
    })

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        };
        fetchProducts()
    }, []);

    // Toggle modal for editing
    const toggleEditModal = (product) => {
        setCurrentProduct(product)
        setShowEditModal(!showEditModal)
    };

    // Handle edit product
    const handleEditProduct = async (e) => {
        e.preventDefault()
        try {
            const updatedProduct = {
                name: e.target.name.value,
                description: e.target.description.value,
                price: e.target.price.value,
                category: e.target.category.value,
                imageUrl: e.target.imageUrl.value,
            };
            await axiosInstance.put(`/products/${currentProduct._id}`, updatedProduct)
            alert('Product updated successfully!')
            setShowEditModal(false)
            return window.location.reload()
        } catch (error) {
            console.error('Error updating product:', error)
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axiosInstance.delete(`/products/${productId}`)
                alert('Product deleted successfully!');
                setProducts(products.filter(product => product._id !== productId))
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    };

    // Handle add new product
    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/products', newProduct)
            setProducts([...products, response.data])
            alert('Product added successfully!')
            setNewProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error adding product:', error)
        }
    };

    return (
        <div className="admin-product-management">
            <h2>Admin Product Management</h2>
            <div className="add-product-container">
            <div className="add-product-form">
                <h3>Add New Product</h3>
                <form onSubmit={handleAddProduct} className="add-product-form">
                    <label>
                        Name: 
                        <input 
                            type="text" 
                            value={newProduct.name} 
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                            required 
                        />
                    </label>
                    <label>
                        Description: 
                        <textarea 
                            value={newProduct.description} 
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                            required 
                        />
                    </label>
                    <label>
                        Price: 
                        <input 
                            type="number" 
                            value={newProduct.price} 
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                            required 
                        />
                    </label>
                    <label>
                        Category: 
                        <input 
                            type="text" 
                            value={newProduct.category} 
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
                            required 
                        />
                    </label>
                    <label>
                        Image URL: 
                        <input 
                            type="text" 
                            value={newProduct.imageUrl} 
                            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} 
                        />
                    </label>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>

            <div className="product-list">
                <h3>Product List</h3>
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => toggleEditModal(product)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>

            {showEditModal && currentProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditProduct}>
                            <label>
                                Name:
                                <input type="text" name="name" defaultValue={currentProduct.name} required />
                            </label>
                            <label>
                                Description:
                                <textarea name="description" defaultValue={currentProduct.description} required />
                            </label>
                            <label>
                                Price:
                                <input type="number" name="price" defaultValue={currentProduct.price} required />
                            </label>
                            <label>
                                Category:
                                <input type="text" name="category" defaultValue={currentProduct.category} required />
                            </label>
                            <label>
                                Image URL:
                                <input type="text" name="imageUrl" defaultValue={currentProduct.imageUrl} />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

  export default EditProduct;