
import React, { useContext, useState, useEffect } from 'react';

import axios from "axios";
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import '../assets/css/sb-admin-2.css';
import '../assets/vendor/datatables/dataTables.bootstrap4.css';
import AppContext from "../context/AppContext";
import { Link } from 'react-router-dom';



export default function UsuariosTable() {



    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { active } = useContext(AppContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8093/api/usuarios');

            return response.data;


        } catch (error) {

            console.log(error)
        }


    };
    const eliminarusuario = async (id) => {

        try {

            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`¿Desea eliminar el usuario ${id}?`)) {

                return;
            }
            // const response = await fetch('http://localhost:8093/api/usuarios/delete/' + id, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     }
            // });
            // if (response.ok) {
            //     const data = await getData();
            //     setData(data);
            // }

        } catch (error) {

            console.log(error);
        }
    }


    const columns = React.useMemo(
        () => [{
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Nombre',
            accessor: 'nombre',
        },
        {
            Header: 'Apellido',
            accessor: 'apellido',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Acciones',
            // Cell: ({ row }) => (
            //     <i className="bi bi-trash3-fill" onClick={() => eliminarusuario(row.original.id)}></i>
            // ),
            Cell: ({ row }) => (
               <Link to={'/editarcliente/'+row.original.id} ><i class="bi bi-pencil-square"></i></Link> 
            ),
        },


        ],
        []
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


        <main id="main" class={active === 'active' ? 'main active' : 'main'}>

            <h2 class="h3 mb-2 text-gray-800">Gestión de Usuarios</h2>
<div  class="center">
    <Link to="/clientealta"
              class="btn btn-primary rounded-pill"> <i class="bi bi-person-add"></i> Alta</Link></div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Listado de Usuarios</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
        
                        <div class="row">  <div class="col-sm-12 col-md-6"><div class="dataTables_length" id="usuarios_length">
                        <label>
                            Mostrar{' '}
                            <select    disabled={data.length < pageSize} value={pageSize} onChange={handlePageSizeChange} class="custom-select custom-select-sm form-control form-control-sm">
                            
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
                            <div class="col-sm-12 col-md-6"><div id="usuarios_filter" class="dataTables_filter">
                                <label>Buscar:
                                    <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="usuarios"  value={filterInput}
          onChange={handleFilterChange}
          className="form-control"/></label></div></div></div>



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

                    <div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                        <ul class="pagination">
                            <li class={(pageIndex + 1) !==1 ? "paginate_button page-item previous" : "paginate_button page-item previous disabled" } disabled={!canPreviousPage}>
                                <button aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link" onClick={() => previousPage()} >Previous</button></li>

            
                            <li class="paginate_button page-item page-link">{pageIndex + 1} de {pageOptions.length}</li>




                            <li class="paginate_button page-item next" id="dataTable_next"><a onClick={() => nextPage()} aria-controls="dataTable" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div>
                </div>
                </div>
                
                </main>
                );
      }
