import React, { useEffect, useState } from 'react';
import axios from 'axios';
import putNotification from './Notification';
import { useNavigate } from 'react-router-dom';
import { cartState, authState } from '../states/atoms';
import { useRecoilState } from 'recoil';
import { config } from '../config';

const Cart = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [cartProducts, setCartProducts] = useRecoilState(cartState);
  const navigate = useNavigate();

  // Increment the quantity of a product in the cart
  const incrementQuantity = (productId) => {
    setCartProducts((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  // Decrement the quantity of a product in the cart
  const decrementQuantity = (productId) => {
    setCartProducts((prevCart) =>
      prevCart
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity: product.quantity === 1 ? 0 : product.quantity - 1, // If quantity is 1, set to 0 (remove item)
              }
            : product
        )
        .filter((product) => product.quantity > 0) // Filter out items with quantity 0
    );
  };

  // Remove item completely from the cart
  const removeItem = (productId) => {
    setCartProducts((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Calculate totals for the cart (subtotal, GST, and total)
  const subTotal = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const gstAmount = subTotal * 0.125;
  const totalAmt = subTotal + gstAmount;

  // Handle Checkout (empty the cart)
  const handleCheckout = async () => {
    try {
      const resp = await axios.delete(`${config.backendUrl}/cart`);
      if (resp.status === 200) {
        setCartProducts([]); // Clear the cart in Recoil state
        putNotification('Order placed!', 'Go to Orders');
      }
    } catch {
      putNotification('Error', 'Unable to Empty Cart');
    }
  };

  return (
    <div className="bg-gray-200 pt-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="flex flex-col mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {cartProducts.map((cartProduct) => (
          <div key={cartProduct.id} className="rounded-lg ml-6" style={{ width: '65%' }}>
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={cartProduct.img}
                alt=""
                className="w-full rounded-lg sm:w-40"
                style={{ height: '8rem', width: '15rem' }}
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{cartProduct.name}</h2>
                  <p className="mt-1 text-sm text-gray-700">{cartProduct.brand}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-700 font-bold mr-4">Quantity:</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(cartProduct.id)}
                        className="px-2 py-1 bg-gray-300 text-sm rounded"
                      >
                        -
                      </button>
                      <div className="bg-white border px-3 py-1 text-center text-sm outline-none">
                        {cartProduct.quantity}
                      </div>
                      <button
                        onClick={() => incrementQuantity(cartProduct.id)}
                        className="px-2 py-1 bg-gray-300 text-sm rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">$ {cartProduct.price * cartProduct.quantity}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => removeItem(cartProduct.id)} // Remove item
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Sub total */}
        <div>
          <div className="my-8 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$ {subTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700 text-sm font-bold text-gray-500">GST - 12.5%</p>
              <p className="text-gray-700">$ {gstAmount.toFixed(2)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 ml-2 text-lg font-bold">$ {totalAmt.toFixed(2)}</p>
                <p className="text-sm text-gray-700">including GST</p>
              </div>
            </div>
            {cartProducts.length !== 0 ? (
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Check out
              </button>
            ) : (
              <button
                className="mt-6 w-full rounded-md bg-rose-500 py-1.5 font-medium text-red-50 hover:bg-rose-600"
                onClick={() => navigate('/#responsive-header')}
              >
                Integrate Payment Portal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
