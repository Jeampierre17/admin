
import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";


export default function MesaAlta() {

    const { active } = useContext(AppContext);
    const [registroExitoso, setRegistroExitoso] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      mesa: formData.get('mesa'),
      piso: formData.get('piso'),
      capacidad: formData.get('capacidad'),
      observacion: formData.get('observacion'),
      idusuario: 17,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('http://localhost:8093/api/mesas/alta', requestOptions);
    const data = await response.status;
    console.log(data);

    // Si la respuesta indica que el registro fue exitoso,
    // actualizamos la variable de estado para mostrar el mensaje.
    if (data === 200) {
      setRegistroExitoso(true);
      event.target.reset();
    }
  };
    return(
<main id="main" class={active === 'active' ? 'main active' : 'main'}>

<div class="pagetitle">
  <h1>Alta Cliente</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
      <li class="breadcrumb-item">Forms</li>
      <li class="breadcrumb-item active">Elements</li>
    </ol>
  </nav>
</div>
{registroExitoso && (
        <div class="alert alert-success" role="alert">
          ¡Registro exitoso!
        </div>
      )}
<section class="section">
  <div class="row">
    <div class="col-lg-6">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Alta Mesa</h5>


          <form onSubmit={handleSubmit}>
            <div class="row mb-3">
              <label for="inputText" class="col-sm-2 col-form-label">Mesa</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="mesa"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputEmail" class="col-sm-2 col-form-label">Piso</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="piso"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword" class="col-sm-2 col-form-label">Capacidad</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" name="capacidad"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputNumber" class="col-sm-2 col-form-label">Observación</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="Observacion"/>
              </div>
            </div>
          
            {/* <div class="row mb-3">
              <label for="inputDate" class="col-sm-2 col-form-label">Plan</label>
              

              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example">
                  <option selected="">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>*/}
            <div class="text-center"> 
            <button type="submit" class="btn btn-primary rounded-pill">
                                    Registrar
                                </button>
                                </div>

          </form>

        </div>
      </div>

    </div>

  </div>
</section>

</main>

    )

}