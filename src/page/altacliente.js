
import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";


export default function ClienteAlta() {

    const { active } = useContext(AppContext);
    const [registroExitoso, setRegistroExitoso] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      local: formData.get('local'),
      dni: formData.get('dni')
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('http://localhost:8093/api/usuarios/alta', requestOptions);
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
          <h5 class="card-title">Alta Cliente</h5>


          <form onSubmit={handleSubmit}>
            <div class="row mb-3">
              <label for="inputText" class="col-sm-2 col-form-label">Nombre</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="nombre"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputEmail" class="col-sm-2 col-form-label">Apellido</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="apellido"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword" class="col-sm-2 col-form-label">DNI</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" name="dni"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputNumber" class="col-sm-2 col-form-label">Local</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" name="local"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword" class="col-sm-2 col-form-label">Celular</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" name="telefono"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputNumber" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input class="form-control" type="email" name="email"/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputDate" class="col-sm-2 col-form-label">Plan</label>
              

              <div class="col-sm-10">
                <select class="form-select" aria-label="Default select example">
                  <option selected="">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
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