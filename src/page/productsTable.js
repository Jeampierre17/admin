
import React, { useContext, useState, useEffect } from 'react';

import axios from "axios";
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import '../assets/css/sb-admin-2.css';
import '../assets/vendor/datatables/dataTables.bootstrap4.css';
import AppContext from "../context/AppContext";
import { Link } from 'react-router-dom';
import { encode } from 'base-64';

export default function ProductsTable() {

    const [imageUrls, setImageUrls] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { active, user } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const fetchData = async () => {
        const result = await getData();
      
        setData(result);
        };



const getData = async () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idusuario: user })
          };
        
        const response = await fetch("http://localhost:8093/api/productos/", requestOptions);
        const result = await response.json();

        async function fetchCategorias() {
                 
                
            const response = await fetch('http://localhost:8093/api/categorias/', requestOptions);
            const data = await response.json();
            setCategorias(data);
          }


      
          fetchCategorias();
        const dataWithImageUrls = await Promise.all(
            result.map(async (item) => { 
                
                return item;
              })
            );        
          return dataWithImageUrls;
 
   
    } catch (error) {
        console.log(error);
    }
};

      useEffect(() => {
        fetchData();
    }, []);
    // const eliminarusuario = async (id) => {

    //     try {

    //         // eslint-disable-next-line no-restricted-globals
    //         if (!confirm(`¿Desea eliminar el usuario ${id}?`)) {

    //             return;
    //         }
    //         const response = await fetch('http://localhost:8093/api/productos/delete/' + id, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }) ;
    //         if (response.ok) {
    //             fetchData();
              
    //         }

    //     } catch (error) {

    //         console.log(error);
    //     }
    // }


    const columns = React.useMemo(
        () => [ {
            Header: 'Id',
            accessor: 'id',
        },{
            Header: 'Activo',
            Cell: ({ row }) => (
                <div className="col-sm-10">
            <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={row.original.activo}/>
                    </div>
                    </div>
            )
          }, 
        {
            Header: 'Nombre',
            accessor: 'nombre',
        },
        {
            Header: 'Imagen',
            Cell: ({ row }) => {
        
                return   <img alt={row.original.nombre} className="img"           src={row.original.img} 
                 />
            },
          },
         
        {
            Header: 'Ingredientes',
            accessor: 'ingredientes',
        },
        {
            Header: 'Precio',
            accessor: 'precio',
        },
        {
            Header: 'Stock',
            accessor: 'stock',
        },
        {
            Header: 'Categoria',
            Cell: ({ row }) => {
                let categoria = categorias.find(categoria => categoria.id === row.original.idcategoria);
                return categoria ? categoria.nombre : '';
              }
        },
        {
            Header: 'Acciones',
            // Cell: ({ row }) => (
            //     <i className="bi bi-trash3-fill" onClick={() => eliminarusuario(row.original.id)}></i>
            // ),
            Cell: ({ row }) => (
               <Link to={'/editarproducto/'+row.original.id} ><i className="bi bi-pencil-square"></i></Link> 
            ),
        },


        ],
        [imageUrls, categorias] 
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        setGlobalFilter,
        searchTerm,
        setSearchTerm,
         pageOptions
    } = useTable(
        {
            // eslint-disable-next-line no-undef
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
   
      
       
      
    
    
      const { globalFilter, pageIndex, pageSize } = state;
    
      const [filterInput, setFilterInput] = useState('');
    
      const handleFilterChange = (e) => {
        const value = e.target.value || '';
        setGlobalFilter(value);
        setFilterInput(value);
      };


    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
    };

    React.useEffect(() => {
        setGlobalFilter(filterInput);
      }, [filterInput, setGlobalFilter]);



    return (


        <main id="main" className={active === 'active' ? 'main active' : 'main'}>

            <h2 className="h3 mb-2 text-gray-800">Gestión de Productos</h2>
<div  className="center">
    <Link to="/productoalta"
              className="btn btn-primary rounded-pill"> <i className="bi bi-person-add"></i> Alta</Link></div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Listado de Productos</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
        
                        <div className="row">  <div className="col-sm-12 col-md-6"><div className="dataTables_length" id="usuarios_length">
                        <label>
                            Mostrar{' '}
                            <select    disabled={data.length < pageSize} value={pageSize} onChange={handlePageSizeChange} className="custom-select custom-select-sm form-control form-control-sm">
                            
             { [5, 10, 20, 30, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>{' '}
                            entries
                        </label>
                        {data.length > 0 && (
  <span>
    Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length} entries
  </span>
)}
                        </div>
                        </div>
                            <div className="col-sm-12 col-md-6"><div id="usuarios_filter" className="dataTables_filter">
                                <label>Buscar:
                                    <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="usuarios"  value={filterInput}
          onChange={handleFilterChange}
          class="form-control"/></label></div></div></div>



                    </div>
                    <table {...getTableProps()} className="table table-bordered">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={
                                                column.isSorted
                                                    ? column.isSortedDesc
                                                        ? 'sort-desc'
                                                        : 'sort-asc'
                                                    : ''
                                            }
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                        <ul className="pagination">
                            <li className={(pageIndex + 1) !==1 ? "paginate_button page-item previous" : "paginate_button page-item previous disabled" } disabled={!canPreviousPage}>
                                <button aria-controls="dataTable" data-dt-idx="0" tabindex="0" className="page-link" onClick={() => previousPage()} >Previous</button></li>

            
                            <li className="paginate_button page-item page-link">{pageIndex + 1} de {pageOptions.length}</li>




                            <li className="paginate_button page-item next" id="dataTable_next"><a onClick={() => nextPage()} aria-controls="dataTable" data-dt-idx="7" tabindex="0" className="page-link">Next</a></li></ul></div></div>
                </div>
                </div>
                
                </main>
                );
      }
