import React from "react";

//internal imports
import { ShortAddress } from "../utils/index";

const Header = ({ address , connect }) => {

  //menus
  const menu=[
    {
      name : "Home",
      link : "#home"
    },
    {
      name : "How It works",
      link : "#howworks"
    },
    {
      name : "About us",
      link : "#about"
    },
    {
      name : "Stats",
      link : "#stats"
    },
    {
      name : "Contact",
      link : "#contact"
    }
 
  ]

  const logoStyle={
    width: '100%', 
    height: '55px', 
    maxWidth: '100%',
  }
  // console.log(address);
  return(
    <div className="mein-menu">
      <div className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a href="/" className="navbar-brand">
          <img style={logoStyle} src="assets/img/CrexSwapLogo.png" alt="" /></a>
          <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle"
          >
            <span className="navbar-toggler-icon"></span>
            
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {menu.map((elem , i )=>{
                return(
                  <li className="nav-item" key={i+1}>
                  <a href={`${elem.link}`} className="nav-link">{elem.name}</a>
                </li>
                )
              })}

              {address ? (
                <button className="new_button">
                  {ShortAddress(address) && ShortAddress(address)}
                </button>
              ):(
                <button onClick={()=>connect()} className="new_button">Connect</button>
              )}

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
