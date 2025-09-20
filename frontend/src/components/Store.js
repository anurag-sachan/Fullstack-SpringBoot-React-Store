import React, { useEffect, useState } from 'react';
import { Input } from "antd";
import axios from "axios";
import putNotification from "./Notification";
import { useNavigate } from 'react-router-dom';
import { authState, cartState } from '../states/atoms';
import { useRecoilState } from 'recoil';
import { config } from '../config';

const Store = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [cart, setCart] = useRecoilState(cartState);
    const navigate = useNavigate();

    const token = localStorage.token;

    useEffect(() => {
        if (token) {
            setAuth(true);
            fetchCartFromDb();
        } else {
            setAuth(false);
        }
    }, [token]);

    const [img, setImg] = useState(null);
    const [name, setName] = useState(null);
    const [brand, setBrand] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(null);

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addProduct = async () => {
        try {
            const resp = await axios.post(`${config.backendUrl}/products`, {
                img,
                name,
                brand,
                quantity,
                price
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (resp.status === 200) {
                putNotification("Adding new Product", resp.data);
            }
        } catch (error) {
            putNotification("Only admin can add products!", error.response?.data?.message);
        }
    };

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const resp = await axios.get(`${config.backendUrl}/products/all`);
            if (resp.status === 200) {
                setProducts(resp.data);
            }
        } catch {
            putNotification("Error", "Failed to fetch Data!");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const fetchCartFromDb = async () => {
        const email = localStorage.getItem('email');
        try {
            const resp = await axios.get(`${config.backendUrl}/cart`, {
                params: { email },
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (resp.status === 200 && resp.data) {
                console.log('Cart fetched from DB:', resp.data);
                setCart(resp.data);
                
                if (resp.data.length > 0) {
                    putNotification("Cart Loaded", `${resp.data.length} items loaded from your saved cart.`);
                }
            }
        } catch (error) {
            console.error('Failed to fetch cart from DB:', error.response?.data || error.message);
            putNotification("Error", "Failed to load your cart");
        }
    };

    const addToCart = (product) => {
        if (!auth) {
            navigate('/login');
        } else {
            setCart((prevCart) => {
                const productExists = prevCart.find(item => item.id === product.id);
                if (productExists) {
                    return prevCart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    return [...prevCart, { ...product, quantity: 1 }];
                }
            });
            putNotification('Added to Cart', 'Item added to your cart.');
        }
    };

    const updateQuantity = (product, action) => {
        setCart((prevCart) => {
            return prevCart.map(item => 
                item.id === product.id
                ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : item.quantity - 1 }
                : item
            );
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <h1 className="text-center text-3xl font-bold text-gray-800 py-10">All Products</h1>
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 p-6">
                {auth && (
                    <article className="h-auto bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
                        <div className="flex justify-between">
                            <input
                                className="w-2/3 p-2 bg-gray-100 rounded-lg text-sm border border-gray-300 focus:outline-none"
                                type="text"
                                placeholder="Product Image URL"
                                value={img || ""}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>
                        <input
                            className="w-full p-2 mt-3 bg-gray-100 rounded-lg text-sm border border-gray-300 focus:outline-none"
                            type="text"
                            placeholder="Product Name"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full p-2 mt-3 bg-gray-100 rounded-lg text-sm border border-gray-300 focus:outline-none"
                            type="text"
                            placeholder="Product Brand"
                            value={brand || ""}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <div className="flex justify-between mt-3">
                            <input
                                className="w-1/3 p-2 bg-gray-100 rounded-lg text-sm border border-gray-300 focus:outline-none"
                                type="text"
                                placeholder="Price"
                                value={price || ""}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                onClick={addProduct}
                            >
                                + Add Product
                            </button>
                        </div>
                    </article>
                )}
                
                {products.map((product) => {
                    const productInCart = cart.find(item => item.id === product.id);
                    return (
                        <article key={product.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                            <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
                            <p className="mt-3 text-lg font-bold text-blue-500">${product.price}</p>

                            <div className="mt-4 flex items-center justify-between">
                                {productInCart ? (
                                    <div className="flex items-center space-x-3">
                                        <button
                                            className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                                            onClick={() => updateQuantity(product, 'decrement')}
                                            disabled={productInCart.quantity === 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-semibold">{productInCart.quantity}</span>
                                        <button
                                            className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                                            onClick={() => updateQuantity(product, 'increment')}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </article>
                    );
                })}
            </section>
            <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600">
                <div>&copy;2023. All rights reserved.</div>
                <div>Written & Maintained by Anurag Sachan.</div>
            </footer>
        </div>
    );
};

export default Store;
