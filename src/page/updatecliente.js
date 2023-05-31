
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useParams } from 'react-router-dom';


export default function ClienteEditar() {

  const { id } = useParams();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const { active } = useContext(AppContext);
  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    local: '',
    telefono: '',
    email: '',
    plan: '',
  });
  useEffect(() => {
    axios.post(`http://localhost:8093/api/usuarios/${id}`)
      .then((response) => {
        setValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8093/api/usuarios/editar/${id}`, values)
      .then((response) => {
        console.log(response);
        setRegistroExitoso(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
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
                      <input type="text" class="form-control" name="nombre" value={values.nombre}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Apellido</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="apellido" value={values.apellido}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">DNI</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="dni" value={values.dni}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNumber" class="col-sm-2 col-form-label">Local</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="local" value={values.local}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Celular</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="telefono" value={values.telefono}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNumber" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="email" name="email" value={values.email}
                        onSubmit={handleSubmit} onChange={handleChange} />
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
                      Actualizar
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
