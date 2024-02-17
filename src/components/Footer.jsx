import React from 'react'

function Footer() {
  return (

    <footer>
    <div className='footer'>
      <div className='footer_container'>
        <div 
          className='container_item'
        >
          <h3 style={{color:"red"}}>About</h3>
          <p>
            consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad 
            minim veniam, quis nostrud exercitation u
          </p>
        </div>
        <div 
          className='container_item'
        >
          <h3 style={{color:"red"}} id='footer_contact'>Contact</h3>
          <p>⟟ : Georgia,Tbilisi</p> 
          <p>✆ : +995-568-73-40-76</p>
          <p>✉ : ioaneturmanidze2004@gmail.com</p>
       
        </div>
      </div>
      <p className='footer_copy'>
        © 2023 Shopping|Center LP. The center design is a trademark of 
        marr-io LP. Browse millions of high-quality brand clothes, 
        electronics, and jevalery.
      </p>
    </div>
  </footer>
  )
}

export default Footer