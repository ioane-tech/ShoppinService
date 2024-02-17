// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const addToCart = (item,id) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeFromCart = (item,id) => {
    setQuantity((prevQuantity) => prevQuantity - 1);
    setCartItems((prevCartItems) => {
      const indexToRemove = prevCartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (indexToRemove !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems.splice(indexToRemove, 1);
        return updatedCartItems;
      }
      return prevCartItems;
    });
  };

  const value = {
    cartItems,
    quantity,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};