import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function Nav() {
  const {active, setActive, toggleActive } = useContext(AppContext);

  const toggle = (props) =>{
    toggleActive(props)
    console.log(active)
  }
  
    return(
    <div className="d-flex align-items-center justify-content-between">
    <i  onClick={()=> toggle('active')}  className="bi bi-list toggle-sidebar-btn"></i>
    <Link to="/"   onClick={() => console.log(active)}  class="logo d-flex align-items-center">
     <img src="assets/img/logo.png" alt=""/>
     <span class="d-none d-lg-block">NiceAdmin</span>
   </Link>
  
 </div>)
}