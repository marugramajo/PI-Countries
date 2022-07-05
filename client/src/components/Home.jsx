import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  filtroContinente,
  getActivities,
  getCountries,
  searchCountriesByName,
} from "../actions/actions";
import CountryCards from "./CountryCards/CountryCards";
import Detail from "./Detail/Detail";
import FilterBar from "./FilterBar/FilterBar";
import SearchBar from "./SearchBar/SearchBar";
import Paginado from "./Paginado/Paginado";

export default function Home() {
  //vamos a hacer un pedido de estado a redux
  //guardamos nuestro estado de paises.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const estadoPaises = useSelector((state) => state.filteredCountries);
  const estadoActividad = useSelector((state) => state.activities);

  const [currentPage, setCurrentPage] = useState(1);
  const paisesPorPagina = 10;

  const indexUltimoPais = currentPage * paisesPorPagina;
  const indexPrimerPais = indexUltimoPais - paisesPorPagina;
  const currentPaises = estadoPaises.slice(indexPrimerPais, indexUltimoPais);

  function paginar(numeroDePagina) {
    setCurrentPage(numeroDePagina);
  }

  function handleSearch(e) {
    dispatch(searchCountriesByName(e.target.value));
    setCurrentPage(1);
  }

  function handleFiltroContinente(e) {
    dispatch(filtroContinente(e.target.value));
    setCurrentPage(1);
  }
  //FUNCION PARA RECARGAR Y VOLVER A CARGAR TODOS LOS PAISES.
  // function handleClick(e){
  //   e.preventDefault() //el prevent default es para que justamente no se recargue la pagina y no se borren las cosas
  //   dispatch(getCountries())
  // }

  return (
    <div>
      <FilterBar
        activities={estadoActividad}
        handleFiltroContinente={handleFiltroContinente}
      />
      <Paginado
        paisesPorPagina={paisesPorPagina}
        totalPaises={estadoPaises.length}
        paginar={paginar}
      />
      <SearchBar handleSearch={handleSearch} />
      <CountryCards paises={currentPaises} />
    </div>
  );
}
// filtrar por continente, POR TIPO DE ACT TURISTICA, asendent y descendt y por poblacion
