import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

import Stomp from 'stompjs';
import io from 'socket.io-client';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Pedidos() {
  const { active, user } = useContext(AppContext);
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pedid, setPedid] = useState([]);
  const [pproductos, setPproductos] = useState([]);
  const [idpedido, setIdpedido] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  
  const handleOptionSelect = (id, tiempo, estado) => {
    setSelectedOption({ id: id, tiempoespera: tiempo, estado: estado });
    pedidos();
  };

  

  useEffect(() => {
    const fetchMesas = async () => {
      const response = await fetch('http://localhost:8093/api/mesas/17');
      const data = await response.json();
      setMesas(data);
    };
    fetchMesas();
  }, []);

  useEffect(() => {
    const fetchEstado = async () => {

  
  
      const response = await fetch('http://localhost:8093/api/pedidos/estado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOption),
      })
        .then((response) => {
          // Manejar la respuesta de la API si es necesario
        })
        .catch((error) => {
          // Manejar errores de la llamada a la API
        });
      }
      fetchEstado();

  }, [selectedOption]);





  useEffect(() => {

  const endpoint = 'ws://localhost:8093/myHandler';
  const destination = '/topic/app';
  let jsonpedidos = [];
  let jsonproducto = [];
  let jsonid = [];
  let pedi = [];
    const socket = new WebSocket(endpoint); // establece una conexión WebSocket
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });
    try {
      socket.addEventListener('message', (event) => {

        const pedido = JSON.parse(event.data);
        if (pedido.pedidos) {
          jsonpedidos = pedido.pedidos;
          setPedidos(jsonpedidos)

          const productosArray = pedido.pproductos.map((producto) => {
            return {
              idpedido: producto.pedidoProductoPK.idpedido,
              idproducto: producto.pedidoProductoPK.idproducto,
              nombre: producto.producto,
              cantidad: producto.cantidad,
              precio: producto.precio,
              estado: producto.estado,
              idusuario: producto.idusuario,
              idmesa: producto.idmesa,
            
              observacion: producto.observacion
            };
          });
          //jsonproducto = JSON.stringify(pedido.pproductos);
          setPproductos(productosArray);


          console.log(jsonproducto)
          pedi = pedido.pedidos
          setPedid(Object.values(pedi));


        } else {
          jsonpedidos = pedido; setPedidos(jsonpedidos)
          console.log(pedidos);
        }

      });
    } catch (error) {
      console.error('Error al analizar el JSON:', error);
    }


    // Cierra el WebSocket cuando el componente se desmonte
    return () => {
      socket.close();
    };

    
  }, [selectedOption]);



  // useEffect(() => {
  //   mesas.map((mesa) => {
  //     let sumas = 0;
  //     let pagado = 0;
  //     let idmesa = 0;
  //     let pedidoId = [];
  //     const mesasSeleccionadas = {};
  //     const pps = [];


  //     setIdpedido(Object.values(pps));

  //     pedidos.forEach((pedido) => {
  //       const mesaId = pedido.idmesa;
  //       pedidoId = pedido.id;
  //       if (!mesasSeleccionadas[mesaId]) {
  //         mesasSeleccionadas[mesaId] = {
  //           sumas: 0,
  //           pagado: 0,
  //           idmesa: mesaId,
  //           idpedido: [],
  //         };
  //       }



  //       mesasSeleccionadas[mesaId].sumas += parseFloat(pedido.consumototal);
  //       mesasSeleccionadas[mesaId].pagado += pedido.pagado !== null ? parseFloat(pedido.pagado) : 0;
  //       mesasSeleccionadas[mesaId].idpedido.push(pedidoId);
  //     });

  //     setMesaSeleccionada(Object.values(mesasSeleccionadas));
  //     console.log('mesa' + mesasSeleccionadas);
  //   })

  // }, [mesas, pedidos]);



  const elementosFiltrados = pedidos.sort((a, b) => {
    if (a.Mesa === 1 && b.Mesa !== 1) {
      return -1;
    } else if (a.Mesa !== 1 && b.Mesa === 1) {
      return 1;
    } else {
      return 0;
    }
  });

  const total = elementosFiltrados.Productos ? elementosFiltrados.Productos.reduce((acc, product) => acc + (product.price * product.cantidad), 0) : 0;


  return (

    <main id="main" class={active === 'active' ? 'main active' : 'main'}>

      <div class="pagetitle">
        <h1>Gestión de Pedidos</h1>

        {/* <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
  </nav>*/}
        <div class="center">
          <Link to="/mesaalta"
            class="btn btn-primary rounded-pill"> <i class="bi bi-plus-circle-dotted"></i> Alta Pedido</Link></div>
      </div>

      <section class="section dashboard categorias" id="categorias">
        {elementosFiltrados.map((pedido, id) => (

          <div  >
          

            {/* -----------------------------------------------------------------------------------------------*/}


            <div class="contenedor-preguntas activo center" data-categoria="metodos-pago" data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`}>
              {/* <div class="tipo"><h1>Consultas médicas</h1></div> */}
              <div class="contenedor-pregunta">

                <h6>#{pedido.numeroPedido}</h6><h1 class="modal-title fs-5" id="exampleModalLabel">Mesa  {pedido.idmesa}</h1>
                {/* <p >{mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id) ? 
                <></>

               // <h7 class="timer"><i class="bi bi-clock-history"></i> 22min</h7> 

               : <><h6 class="free"> Libre </h6>
              <i class="bi bi-check-circle free"></i>
            </>
            }
                 </p> */}



                 <div class=""> {pedidos.find(pedido => pedido.id === pedido.id) ? 
                <div class="modal-content"> 
                  <div class="modal-header">
                  {mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id) ?
                  
                     <h5>Consumo Total: <strong>${mesaSeleccionada.find(pedido => pedido.id === mesas.id).sumas.toLocaleString('es-AR',)}</strong> </h5>
                    : <></>
                                      }                    </div>
                

                    <div class="modal-body">


                      {pproductos.filter((pp) => pp.idpedido === pedido.id).map((product, id) => (
                        <ul className="factu" key={id}>
                          <li>{product.cantidad}x</li>
                          <li>{product.nombre}</li>
                          <li>${product.precio * product.cantidad}</li>
                        </ul>
                      ))}
                      {/* <h5>Consumo Total: ${mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).sumas.toLocaleString('es-AR',)}</h5>
                      {/* <h5 className="pago">Pago Online: ${mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).pagado.toLocaleString('es-AR',)}</h5> 
                      <h6>Subtotal: ${(mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).sumas
                        - mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).pagado).toLocaleString('es-AR',)}</h6> */}
                    </div>

                

{console.log("estado" + pedido.estado)}

                  <div class="modal-footer">
                    {pedido.estado !== 'ACEPTADO' ?

                    <button type="button" class="btn btn-primary"><div class="dropdown dropend">
                      <span class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Aceptar</span>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#scrollspyHeading3" onClick={(event ) =>  {   event.preventDefault() 
                          setSelectedOption({ id: pedido.id, tiempoespera: '15', estado: 'ACEPTADO',  idusuario: user  })}}>15min</a></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading4" onClick={() => setSelectedOption({ id: pedido.id, tiempoespera: '30', estado: 'ACEPTADO', idusuario: user })}>30min</a></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading4"onClick={() => setSelectedOption({ id: pedido.id, tiempoespera: '45', estado: 'ACEPTADO',  idusuario: user  })}>45min</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading5" onClick={() => setSelectedOption({ id: pedido.id, tiempoespera: '*', estado: 'ACEPTADO',  idusuario: user  })}>Personalizado</a></li>
                      </ul>
                    </div></button> :<button type="button" class="btn btn-primary"><div class="dropdown dropend">
                      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="top" aria-expanded="false">PAGO</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#scrollspyHeading3" onClick={() => setSelectedOption({ id: pedido.id, tiempoespera: '15', estado: 'ACEPTADO', idusuario: user  })}>15min</a></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading4" onClick={() => handleOptionSelect(pedido.id, '30', 'ACEPTADO' )}>30min</a></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading4"onClick={() => handleOptionSelect(pedido.id, '45', 'ACEPTADO')}>45min</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" href="#scrollspyHeading5" onClick={() => handleOptionSelect(pedido.id, '99', 'CANCELADO')}>Cancelar</a></li>
                      </ul>
                    </div></button>
                    }
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                  </div>
                </div> :<></>}
              </div>

              </div>
            

            

            {/* <div class="num"> <h5>#{pedido.mesa} |</h5> <h6> {pedido.capacidad}<i class="bi bi-x-diamond"></i> </h6></div> */}
            


            {/* <p>{pedido.timer}</p> */}

            {/* <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby={`exampleModalLabel-${id}`} aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle Factura - Mesa  {pedido.mesa}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id) ? (

                    <div class="modal-body">


                      {pproductos.filter((pp) => pp.idmesa === pedido.id).map((product, id) => (
                        <ul className="factu" key={id}>
                          <li>{product.cantidad} un.</li>
                          <li>{product.nombre}</li>
                          <li>${product.precio * product.cantidad}</li>
                        </ul>
                      ))}
                      <h5>Consumo Total: ${mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).sumas.toLocaleString('es-AR',)}</h5>
                      <h5 className="pago">Pago Online: ${mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).pagado.toLocaleString('es-AR',)}</h5>
                      <h6>Subtotal: ${(mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).sumas
                        - mesaSeleccionada.find(mesa => mesa.idmesa === pedido.id).pagado).toLocaleString('es-AR',)}</h6>
                    </div>

                  ) : <h5> - </h5>





                  }



                  <div class="modal-footer">
                    {/*pedido.Consumo - pedido.Pagado === 0 ? <button type="button" class="btn btn-primary">Liberar</button> : ''
                    <button type="button" class="btn btn-primary">Imprimir</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                  </div>
                </div>
              </div>
            </div> */}
          </div>
          
          </div>

        )


        )}



      </section>
    </main>
  )


}

