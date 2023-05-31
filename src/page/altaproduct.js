
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";


export default function ProductsAlta() {


  const { active, user } = useContext(AppContext);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");

  const number = Number(17)
    ;

  useEffect(() => {
    async function fetchCategorias() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idusuario: user })
      };
  
      const response = await fetch('http://localhost:8093/api/categorias/', requestOptions);
      const data = await response.json();
      setCategorias(data);
    }

    fetchCategorias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre', event.target.nombre.value);
    formData.append('ingredientes', event.target.ingredientes.value);
    formData.append('precio', event.target.precio.value);
    formData.append('imgs', event.target.img.files[0]);
    formData.append('stock', event.target.stock.value);
    formData.append('idcategoria', event.target.idcategoria.value);
    formData.append('idusuario', user);

    const getData = async () => {


      try {
        const response = await axios.post(`http://localhost:8093/api/productos/alta`, formData);
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          setRegistroExitoso(true);
          event.target.reset();
        }
      } catch (error) {
        console.log(error);
      }
    }


    await getData();

  };

  return (
    <main id="main" class={active === 'active' ? 'main active' : 'main'}>

      <div class="pagetitle">
        <h1>Altas Productos</h1>
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
                <h5 class="card-title">Alta Producto</h5>


                <form onSubmit={handleSubmit}> 
                <div class="row mb-3">
                 <div class=" form-check form-switch">
                  
                 <label for="inputText" class="col-sm-2 col-form-label">Activo</label>
            
                      <input class="form-check-input" type="checkbox" id="gridCheck2" />
              
                    </div>
                    </div>
                  <div class="row mb-3">

                  

                    <label for="inputText" class="col-sm-2 col-form-label" >Nombre</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="nombre" required />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-2 col-form-label" >Ingredientes</label>

                    <div class="col-sm-10">
                      <textarea class="form-control" id="floatingTextarea" name="ingredientes" required ></textarea>
                      {/* placeholder="Descripciones"  */}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Precio</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="precio" required />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="formFile" class="col-sm-2 col-form-label">Imagén</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="file" id="formFile" name="img" accept="image/*" required />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNumber" class="col-sm-2 col-form-label">Stock</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="stock"/>
                    </div>
                    {/* <input type="hidden" name="idUsuario" value="17" /> */}
                  </div>

                  <div class="row mb-3">
                    <label for="inputDate" class="col-sm-2 col-form-label">Categoría</label>
                    <div class="col-sm-10">
                      <select class="form-select" aria-label="Default select example" name="idcategoria" onChange={(e) => setCategoriaId(e.target.value)} required >
                      <option value="" className="gris">Escoge una categoría</option>
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                        ))}
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

