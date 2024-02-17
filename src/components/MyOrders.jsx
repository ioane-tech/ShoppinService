import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Footer from './Footer';
import Header from './Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const { cartItems, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  useEffect(() => {
    const updatedItems = cartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setUpdatedCartItems(updatedItems);
  }, [cartItems]);

  useEffect(() => {
    const updatedTotalPrice = updatedCartItems.reduce(
      (total, cartItem) => total + (cartItem.price * cartItem.quantity || 0),
      0
    );

    // Round the total price to 2 decimal places
    const roundedTotalPrice = Number(updatedTotalPrice.toFixed(2));
    setTotalPrice(roundedTotalPrice);
  }, [updatedCartItems]);

  const updateQuantityAndTotal = (item, quantity) => {
    const updatedItems = updatedCartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
    );

    setUpdatedCartItems(updatedItems);
  };

  const buyHandler = (item) => {
    removeFromCart(item);
    toast.success('You have purchased!', {
      position: 'bottom-left',
    });
  };

  const calculateItemPrice = (item) => {
    let itemPrice = item.price * item.quantity || 0;

    // Round the item price to 2 decimal places
    itemPrice = Number(itemPrice.toFixed(2));

    return itemPrice;
  };

  return (
    <>
      <ToastContainer />
      <Header storeData={''} />

      <div className='orders_main_div'>
        <h1 className='common_header_text'>Your Wish List</h1>

        <div className='orders_container'>
          <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '800px' }}>
            {updatedCartItems.length !== 0 ? (
              updatedCartItems.map((item, index) => (
                <div key={index}>
                  <div className='orders_each_item_div'>
                    <img
                      style={{
                        padding: '50px',
                        width: item.category === 'jewelery' ? '140px' : '190px',
                        height: item.category === 'jewelery' ? '140px' : '190px',
                        marginTop: '20px',
                      }}
                      src={item.image}
                      alt={item.title}
                    />
                    <div className='orders_text_side_div'>
                      <h2>{item.title}</h2>
                      <h4 style={{ color: 'red' }}>Price: ${calculateItemPrice(item)}</h4>
                      <h4>Review: ⭐{item.rating.rate}</h4>
                      <div>
                        <span>Quantity:</span>
                        <input
                          className='quantity_change'
                          type='number'
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                              updateQuantityAndTotal(item, newQuantity);
                            }
                          }}
                          min={1}
                        />
                        <button onClick={() => buyHandler(item)} className='button_buy'>
                          Buy
                        </button>
                        <button onClick={() => removeFromCart(item)} className='button_remove'>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <h3>About this product</h3>
                  <p style={{ textAlign: 'left', marginLeft: '20px', marginRight: '20px' }}>
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <h3 style={{ color: 'gray' }}>Empty! You Should Order Now</h3>
            )}
            <div className='total_pice_div'>
              <p>Total Price: ${totalPrice || 0}</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MyOrders;