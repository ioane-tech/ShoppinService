import React, { useState,useEffect } from 'react'
import { FaSearch,FaWatchmanMonitoring,FaRegWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {useCart} from "../context/CartContext"

function Header({ storeData }) {
  const [searchOn,setSearcOn]=useState(false)
  const [showMenu,setShowMenu]=useState(false)
  const [searchText, setSearchText] = useState('');

  const { quantity } = useCart();


const navigatorRoute="http://localhost:3000/"

  const searchHandler=()=>{
    setSearcOn(!searchOn)
  }

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // Check if the entered text matches any product title
      const matchedProduct = storeData && storeData.find(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
      
      if (matchedProduct) {
        // If there is a match, navigate to the corresponding section
        window.location.href = `#${matchedProduct.category}`;
      } else {
        // If no match, display an alert
        alert("Product does not exist!");
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEnterPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [searchText]);


  return (
    <div>
        <div className='header_div'>
            <div className='logo_div'>
                <img className='header_img' src='shopIcon.png'/>   
                <Link style={{color:"red"}} to="/"><p className='logo_text'>Shopping | Center</p></Link>
            </div>

            <input  
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: searchOn && "30%", // Set width to 30% when searchOn is true
                opacity: searchOn && 1 , // Set opacity to 1 when searchOn is true
              }} 
              className="search_input" 
              type="text" 
              placeholder="Dont use this search. see menu to see our product and navigate to themy"
            />
            <FaSearch onClick={searchHandler} className='search_icon'/>

            <img className='icon' src="profile.png"/>
            <img onClick={()=>setShowMenu(true)} className='menu_icon' src="toggle-icon-menu.png"/>
            

            <div className='shoping_cart_close_div'>
                <img className='shoping_cart_close' src='shopingCartClose1.png'/>
                <img className='shoping_cart_open' src='shopingCartOpen1.png'/>
                <Link to="/MyOrders"><div style={{position:"absolute",top:"5px",right:"-12px",height:'30px',width:'40px'}}></div></Link>
                <div className='order_quantity_div'>{quantity}</div>
            </div>

        </div>
   
          {
            showMenu &&
            <div className='fade_background_div'></div>  
          }
          <div   
            style={{
              width: showMenu && "20%" , 
              left: showMenu && "80%",
            }} 
            className='menu_div'
          >
              <h2><Link to="/">Home</Link></h2>
              <h2><a href="#Electronics">Electronic</a></h2>
              <h2><a href="#Men's Clothing">Men's Clothing</a></h2>
              <h2><a href="#Woman's Clothing">Womans's Clothing</a></h2>
              <h2><a href="#jewelery">Jewelery</a></h2>
              <h2><a href="#SaleOffers">Sale offers</a></h2>
              <h2><a href="#footer_contact">Contact</a></h2>
              <p className='exit_icon' onClick={()=>setShowMenu(false)}><FaRegWindowClose/></p>
          </div>
       
    </div>
  )
}

export default Header