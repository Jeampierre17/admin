import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

import Stomp from 'stompjs';
import io from 'socket.io-client';
import { Link } from "react-router-dom";

export default function Tables() {
  const { active } = useContext(AppContext);
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pedid, setPedid] = useState([]);
  const [pproductos, setPproductos] = useState([]);
  const [idpedido, setIdpedido] = useState([]);

  useEffect(() => {
    const fetchMesas = async () => {
      const response = await fetch('http://localhost:8093/api/mesas/17');
      const data = await response.json();
      setMesas(data);
    };
    fetchMesas();
  }, []);

  const endpoint = 'ws://localhost:8093/myHandler';
  const destination = '/topic/app';
  let jsonpedidos = [];
  let jsonproducto = [];
  let jsonid = [];
  let pedi = [];

  useEffect(() => {
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


  }, []);

   

  useEffect(() => {
    mesas.map((mesa) => {
      let sumas = 0;
      let pagado = 0;
      let idmesa = 0;
      let pedidoId = [];
      const mesasSeleccionadas = {};
      const pps = [];

           
      setIdpedido(Object.values(pps));

      pedidos.forEach((pedido) => {
        const mesaId = pedido.idmesa;
        pedidoId = pedido.id;
        if (!mesasSeleccionadas[mesaId]) {
          mesasSeleccionadas[mesaId] = {
            sumas: 0,
            pagado: 0,
            idmesa: mesaId,
            idpedido: [],
          };
        }

       

        mesasSeleccionadas[mesaId].sumas += parseFloat(pedido.consumototal);
        mesasSeleccionadas[mesaId].pagado += pedido.pagado !== null ? parseFloat(pedido.pagado) : 0;
        mesasSeleccionadas[mesaId].idpedido.push(pedidoId);
      });

      setMesaSeleccionada(Object.values(mesasSeleccionadas));
 console.log('mesa' +mesasSeleccionadas);
    })

  }, [mesas, pedidos]);


  useEffect(() => {
    console.log('Sumas:', mesaSeleccionada);
    console.log( 'pp'+ pproductos)
  }, [mesaSeleccionada, pproductos]);



  const elementosFiltrados = mesas.sort((a, b) => {
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
        <h1>Gestión de Mesas</h1>
       {/* <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
  </nav>*/}
        <div  class="center">
    <Link to="/mesaalta"
              class="btn btn-primary rounded-pill"> <i class="bi bi-plus-circle-dotted"></i> Alta Mesa</Link></div>
      </div>

      <section class="section dashboard categorias breadcrumb" id="categorias">
        {elementosFiltrados.map((table, id) => (

          <div class={table.Consumo - table.Pagado !== 0 ? "categoria" : "categoria pagado"} data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`}>
            <div class="num"> <h5>#{table.mesa} |</h5> <h6> {table.capacidad}<i class="bi bi-x-diamond"></i> </h6></div>

            {mesaSeleccionada.find(mesa => mesa.idmesa === table.id) ? (
              mesaSeleccionada.find(mesa => mesa.idmesa === table.id).sumas
                - mesaSeleccionada.find(mesa => mesa.idmesa === table.id).pagado !== 0 ? ( <>
                <h6 id="resta">${mesaSeleccionada.find(mesa => mesa.idmesa === table.id).sumas.toLocaleString('es-AR')}</h6>
                <h7 class="timer"><i class="bi bi-clock-history"></i> 22min</h7> </>
              ) : (
                <h5>Pagado</h5>
              )) : <><h6 class="free"> Libre </h6> 
            <i class="bi bi-check-circle free"></i>
              </>
            } 


            {/* <p>{table.timer}</p> */}

            <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby={`exampleModalLabel-${id}`} aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle Factura - Mesa  {table.mesa}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {mesaSeleccionada.find(mesa => mesa.idmesa === table.id) ? (

                  <div class="modal-body">


                  {pproductos.filter((pp) => pp.idmesa === table.id).map((product, id) => (
                    <ul className="factu" key={id}>
                      <li>{product.cantidad} un.</li>
                      <li>{product.nombre}</li>
                      <li>${product.precio * product.cantidad}</li>
                    </ul>
                  ))}
                    <h5>Consumo Total: ${ mesaSeleccionada.find(mesa => mesa.idmesa === table.id).sumas.toLocaleString('es-AR',)}</h5>
                    <h5 className="pago">Pago Online: ${mesaSeleccionada.find(mesa => mesa.idmesa === table.id).pagado.toLocaleString('es-AR',)}</h5>
                    <h6>Subtotal: ${(mesaSeleccionada.find(mesa => mesa.idmesa === table.id).sumas
                - mesaSeleccionada.find(mesa => mesa.idmesa === table.id).pagado).toLocaleString('es-AR',)}</h6> 
                  </div>

                    ) : <h5> - </h5>





                    }



                  <div class="modal-footer">
                    {/*table.Consumo - table.Pagado === 0 ? <button type="button" class="btn btn-primary">Liberar</button> : ''*/}
                    <button type="button" class="btn btn-primary">Imprimir</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                  </div>
                </div>
              </div>
            </div>
          </div>

        )


        )}



      </section>
    </main>
  )


}

