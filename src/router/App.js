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
import AppContext from "../context/AppContext";

import Tables from "../page/tables";
import ProductsTable from "../page/productsTable"
import Nav from "../utils/nav";
import Aside from "../utils/aside";
import ErrorBoundary from "../component/errorBoudaly";
import ProductsAlta from "../page/altaproduct";
import ClienteAlta from "../page/altacliente";
import ClienteEditar from "../page/updatecliente";
import UsuariosTable from "../page/UsuariosTable";
import MesaAlta from "../page/altamesa";
import Grafic from "../page/grafic";
import Pedidos from "../page/pedido";
import ProductoEditar from "../page/updateproducto";

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
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
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

                  <a class="nav-link nav-icon" data-bs-toggle="dropdown">
                    <i class="bi bi-bell"></i>
                    <span class="badge bg-primary badge-number">4</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                    <li class="dropdown-header">
                      You have 4 new notifications
                      <a><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
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
                      <hr class="dropdown-divider" />
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
                      <hr class="dropdown-divider" />
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
                      <hr class="dropdown-divider" />
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
                      <hr class="dropdown-divider" />
                    </li>
                    <li class="dropdown-footer">
                      <a >Show all notifications</a>
                    </li>

                  </ul>

                </li>

                <li class="nav-item dropdown">

                  {/* <a class="nav-link nav-icon" data-bs-toggle="dropdown">
                    <i class="bi bi-chat-left-text"></i>
                    <span class="badge bg-success badge-number">3</span>
                  </a> */}

                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                    <li class="dropdown-header">
                      You have 3 new messages
                      <a ><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li class="message-item">
                      <a >
                        <img src="assets/img/messages-1.jpg" alt="" class="rounded-circle" />
                        <div>
                          <h4>Maria Hudson</h4>
                          <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                          <p>4 hrs. ago</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li class="message-item">
                      <a >
                        <img src="assets/img/messages-2.jpg" alt="" class="rounded-circle" />
                        <div>
                          <h4>Anna Nelson</h4>
                          <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                          <p>6 hrs. ago</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li class="message-item">
                      <a >
                        <img src="assets/img/messages-3.jpg" alt="" class="rounded-circle" />
                        <div>
                          <h4>David Muldon</h4>
                          <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                          <p>8 hrs. ago</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li class="dropdown-footer">
                      <a >Show all messages</a>
                    </li>

                  </ul>

                </li>

                <li class="nav-item dropdown pe-3">

                  <a class="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" />
                    <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                      <h6>Kevin Anderson</h6>
                      <span>Web Designer</span>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                        <i class="bi bi-person"></i>
                        <span>My Profile</span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                        <i class="bi bi-gear"></i>
                        <span>Account Settings</span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                        <i class="bi bi-question-circle"></i>
                        <span>Need Help?</span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
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

            <Route index path="/" element={<ErrorBoundary><Tables class="active" /></ErrorBoundary>} />
            <Route exact path='/productos' element={<ErrorBoundary><ProductsTable class="active" /></ErrorBoundary>} />
            <Route exact path='/productoalta' element={<ErrorBoundary><ProductsAlta /></ErrorBoundary>} />
            <Route exact path='/clientealta' element={<ErrorBoundary><ClienteAlta /></ErrorBoundary>} />
            <Route exact path='/mesaalta' element={<ErrorBoundary><MesaAlta /></ErrorBoundary>} />
            <Route exact path='/editarcliente/:id' element={<ErrorBoundary><ClienteEditar /></ErrorBoundary>} />
            <Route exact path='/editarproducto/:id' element={<ErrorBoundary><ProductoEditar /></ErrorBoundary>} />
            <Route exact path='/usuarios' element={<ErrorBoundary><UsuariosTable></UsuariosTable></ErrorBoundary>} />
            <Route exact path='/graficos' element={<ErrorBoundary><Grafic></Grafic></ErrorBoundary>} />
            <Route exact path='/pedidos' element={<ErrorBoundary><Pedidos></Pedidos></ErrorBoundary>} />
          </Routes>

          <footer id="footer" class="footer">
            <div class="copyright">
              &copy; Copyright <strong><span>RestoAdmin</span></strong>. All Rights Reserved
            </div>
            <div class="credits">

              Designed by <a >Jeampierre Gonzalez</a>
            </div>
          </footer>
        </div>
      </BrowserRouter > </AppContext.Provider >)
}

export default App;
