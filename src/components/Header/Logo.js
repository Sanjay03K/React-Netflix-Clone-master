import React from "react";
import "./HeaderStyles.css";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src="./images/misc/jones2.jpg" alt="Snailflix logo"/>
        <p style={{color:"white",marginLeft:"7%"}}>SNAILFLIX</p>
      </a>
    </div>
  );
}

export default Logo;
