import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function Aside() {
  const {active, setActive, toggleActive } = useContext(AppContext);
  
    return(
      <aside id="sidebar" className={active === 'active' ? 'sidebar active' : 'sidebar'}>
    
      <ul class="sidebar-nav" id="sidebar-nav">
      
        <li class="nav-item">
          <Link to="/"  class="nav-link ">
            <i class="bi bi-grid"></i>
            <span>Mesas</span>
          </Link>
          <Link to="/pedidos"  class="nav-link ">
            <i class="bi bi-grid"></i>
            <span>Pedidos</span>
          </Link>
        </li> 
 
      
        <li class="nav-item">
          <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" >
            <i class="bi bi-journal-text"></i><span>Altas</span><i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" class= {active === 'active' ? 'nav-content collapse centerGrid' : 'nav-content collapse'}   data-bs-parent="#sidebar-nav">
            <li>
              <Link to="productoalta">
                <i class="bi bi-circle"></i><span>Alta Producto</span>
              </Link>
            </li>
            <li>
              <Link to="clientealta">
                <i class="bi bi-circle"></i><span>Alta Cliente</span>
              </Link>
            </li>
            <li>
              <Link to="mesaalta">
                <i class="bi bi-circle"></i><span>Alta Mesa</span>
              </Link>
            </li>
          </ul>
        </li> 
      
        <li class="nav-item">
          <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" >
            <i class="bi bi-layout-text-window-reverse"></i><span>Detalles</span><i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="tables-nav"  class= {active === 'active' ? 'nav-content collapse centerGrid' : 'nav-content collapse'} data-bs-parent="#sidebar-nav">
            <li>
              <Link to='/productos'>
                <i class="bi bi-circle"></i><span>Detalles Productos</span>
              </Link>
            </li>
            <li>
            <Link to='/usuarios'>
                <i class="bi bi-circle"></i><span>Detalles Usuarios</span>
              </Link>
            </li>
          </ul>
        </li> 
      
         
        <li class="nav-item">
          <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" >
            <i class="bi bi-menu-button-wide"></i><span>Components</span><i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <a href="components-alerts.html">
                <i class="bi bi-circle"></i><span>Alerts</span>
              </a>
            </li>
           
          </ul>
        </li>    
      
        <li class="nav-item">
          <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" >
            <i class="bi bi-gem"></i><span>Icons</span><i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <a href="icons-bootstrap.html">
                <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
              </a>
            </li>
            <li>
              <a href="icons-remix.html">
                <i class="bi bi-circle"></i><span>Remix Icons</span>
              </a>
            </li>
            <li>
              <a href="icons-boxicons.html">
                <i class="bi bi-circle"></i><span>Boxicons</span>
              </a>
            </li>
          </ul>
        </li> 
        {/* <li class="nav-heading">Configuración</li> */}
        {/* 
        <li class="nav-item">
          <a class="nav-link collapsed" href="users-profile.html">
            <i class="bi bi-person"></i>
            <span>Profile</span>
          </a>
        </li> 
      
      <li class="nav-item">
          <a class="nav-link collapsed" href="pages-faq.html">
            <i class="bi bi-question-circle"></i>
            <span>F.A.Q</span>
          </a>
        </li>  */}
      
        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-contact.html">
            <i class="bi bi-envelope"></i>
            <span>Contact</span>
          </a>
        </li> 
      
        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-register.html">
            <i class="bi bi-card-list"></i>
            <span>Register</span>
          </a>
        </li> 
      
        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-login.html">
            <i class="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </a>
        </li> 
        {/* <li class="nav-item">
          <a class="nav-link collapsed" href="pages-error-404.html">
            <i class="bi bi-dash-circle"></i>
            <span>Error 404</span>
          </a>
        </li>
      
        <li class="nav-item">
          <a class="nav-link collapsed" href="pages-blank.html">
            <i class="bi bi-file-earmark"></i>
            <span>Blank</span>
          </a>
        </li>
       */}
      </ul>
      
      
      
      </aside>
 )
}