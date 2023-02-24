import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React, { useContext, useState } from 'react';
import useInitialState from "../hooks/useInitialState";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/quill/quill.snow.css";
import "../assets/vendor/quill/quill.bubble.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/vendor/simple-datatables/style.css";
import "../assets/css/style.css";
import "../assets/vendor/quill/quill.min.js";
import "../assets/vendor/simple-datatables/simple-datatables.js";
import "../assets/vendor/tinymce/tinymce.min.js";
import "../assets/vendor/php-email-form/validate.js";
import "../assets/vendor/echarts/echarts.min.js";
import AppContext from "../context/AppContext";

import Tables from "../page/tables";
import Nav from "../page/nav";
import Aside from "../page/aside";

function App() {

  const initialState = useInitialState();

 
  



  return (

    <AppContext.Provider value={initialState}>
      <BrowserRouter>
    <div className="App">
      <header id="header" class="header fixed-top d-flex align-items-center">

  <Nav></Nav>
<div class="search-bar">
  <form class="search-form d-flex align-items-center" method="POST" action="#">
    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
    <button type="submit" title="Search"><i class="bi bi-search"></i></button>
  </form>
</div>

<nav class="header-nav ms-auto">
  <ul class="d-flex align-items-center">

    <li class="nav-item d-block d-lg-none">
      <a class="nav-link nav-icon search-bar-toggle ">
        <i class="bi bi-search"></i>
      </a>
    </li>

    <li class="nav-item dropdown">

      <a class="nav-link nav-icon"  data-bs-toggle="dropdown">
        <i class="bi bi-bell"></i>
        <span class="badge bg-primary badge-number">4</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li class="dropdown-header">
          You have 4 new notifications
          <a><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="notification-item">
          <i class="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="notification-item">
          <i class="bi bi-x-circle text-danger"></i>
          <div>
            <h4>Atque rerum nesciunt</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>1 hr. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="notification-item">
          <i class="bi bi-check-circle text-success"></i>
          <div>
            <h4>Sit rerum fuga</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>2 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="notification-item">
          <i class="bi bi-info-circle text-primary"></i>
          <div>
            <h4>Dicta reprehenderit</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>4 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider"/>
        </li>
        <li class="dropdown-footer">
          <a >Show all notifications</a>
        </li>

      </ul>

    </li>

    <li class="nav-item dropdown">

      <a class="nav-link nav-icon"  data-bs-toggle="dropdown">
        <i class="bi bi-chat-left-text"></i>
        <span class="badge bg-success badge-number">3</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li class="dropdown-header">
          You have 3 new messages
          <a ><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="message-item">
          <a >
            <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle"/>
            <div>
              <h4>Maria Hudson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>4 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="message-item">
          <a >
            <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle"/>
            <div>
              <h4>Anna Nelson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>6 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="message-item">
          <a >
            <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle"/>
            <div>
              <h4>David Muldon</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>8 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li class="dropdown-footer">
          <a >Show all messages</a>
        </li>

      </ul>

    </li>

    <li class="nav-item dropdown pe-3">

      <a class="nav-link nav-profile d-flex align-items-center pe-0"  data-bs-toggle="dropdown">
        <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
        <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li class="dropdown-header">
          <h6>Kevin Anderson</h6>
          <span>Web Designer</span>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
            <i class="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
            <i class="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
            <i class="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider"/>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" >
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>

      </ul>
    </li>

  </ul>
</nav>

</header>

<Aside></Aside>


<Routes>

<Route index path="/" element={<Tables class="active" />} />
{/* <Route exact path='/menu' element={<Menu class="active" />} />
<Route exact path='/especial' element={<Especial />} />
<Route exact path='/contacto' element={<Contact />} />
<Route exact path='/evento' element={<Evento />} /> */}

</Routes>

<footer id="footer" class="footer">
    <div class="copyright">
      &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
    </div>
    <div class="credits">

      Designed by <a >Jeampierre Gonzalez</a>
    </div>
  </footer>
    </div>
    </BrowserRouter > </AppContext.Provider >)
}

export default App;
