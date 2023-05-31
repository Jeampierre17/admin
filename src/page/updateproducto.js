
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useParams } from 'react-router-dom';


export default function ProductoEditar(props) {

  const { id } = useParams();
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const { active, user } = useContext(AppContext);
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({ 
    id: '',
    nombre: '',
    ingredientes: '',
    precio: '',
    stock: '',
    idcategoria: '',
    idusuario: '',
    img: selectedImage,
    activo: '',
    sintacc: '',
   
   
  });
  useEffect(() => {

    async function fetchProducto() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      };
  
      const response = await fetch('http://localhost:8093/api/productos/producto', requestOptions);
      const data = await response.json();
      setValues(data); 
      
    }

    fetchProducto();
console.log(values.idcategoria)
   

  }, [id]);

  const handleSubmit =  async (event) =>{
    event.preventDefault();

    const formData = new FormData();
   formData.append('imgs', selectedImage); // Agrega la imagen al formData
  
   formData.append('id', values.id);
    formData.append('nombre', values.nombre);
    formData.append('ingredientes', values.ingredientes);
    formData.append('precio', values.precio);
    formData.append('idcategoria', values.idcategoria);
    formData.append('idusuario', user);
   // formData.append('stock', values.stock);

    const getData = async () => {


      try {
        const response = await axios.post(`http://localhost:8093/api/productos/editar`, formData);
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          setRegistroExitoso(true);
          //event.target.reset();
        }
      } catch (error) {
        console.log(error);
      }
    }


    await getData();
  };

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

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      setSelectedImage(event.target.files[0]);
    setValues((prevState) => ({ ...prevState, img: event.target.files[0] }));
    } else {
      setValues((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <main id="main" class={active === 'active' ? 'main active' : 'main'}>

      <div class="pagetitle">
        <h1>Editar Producto</h1>
        {/* <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item">Forms</li>
            <li class="breadcrumb-item active">Elements</li>
          </ol>
        </nav> */}
      </div>
      {registroExitoso && (
        <div class="alert alert-success" role="alert">
          ¡Actualización exitosa!
        </div>
      )}
      <section class="section">
        <div class="row">
          <div class="col-lg-6">

            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Editar Producto</h5>


                <form onSubmit={handleSubmit}>
                  <div class="row mb-3">
                    <label for="inputText" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="nombre" value={values.nombre}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Ingredientes</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="ingredientes" value={values.ingredientes}
                        onSubmit={handleSubmit} onChange={handleChange} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Precio</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="precio" required 
                      value={values.precio} onSubmit={handleSubmit} onChange={handleChange}/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="formFile" class="col-sm-2 col-form-label">Imagén</label>
                    <div class="col-sm-10">
                      <input class="form-control" type="file" id="formFile" name="img" accept="image/*"   
                      onSubmit={handleSubmit} onChange={handleChange}/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNumber" class="col-sm-2 col-form-label">Stock</label>
                    <div class="col-sm-10">
                      <input type="number" class="form-control" name="stock"
                      value={values.stock} onSubmit={handleSubmit} onChange={handleChange}/>
                    </div>
                    <input type="hidden" name="idUsuario" value="17" />
                  </div>

                  <div class="row mb-3">
                    <label for="inputDate" class="col-sm-2 col-form-label">Categoría</label>
                    <div class="col-sm-10">
                      <select class="form-select" aria-label="Default select example" name="idcategoria"   onSubmit={handleSubmit} onChange={handleChange} required defaultValue={values.idcategoria}>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id} selected={categoria.id === values.idcategoria}>
                          {categoria.id === values.idcategoria ? categoria.nombre : ''}
                        </option>
                      ))}
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id} defaultValue={categoria.id === values.idcategoria}>{categoria.nombre}</option>
                        ))}
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
