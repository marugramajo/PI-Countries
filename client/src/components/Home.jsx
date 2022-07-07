import React, { useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  filtroActividad,
  getActivities,
  getCountries,
  ordenNombre,
  ordenPoblacion,
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
  function handleOrdenPoblacion(e) {
    dispatch(ordenPoblacion(e.target.value));
    setCurrentPage(1);
  }

  function handleOrdenNombre(e) {
    dispatch(ordenNombre(e.target.value));
    setCurrentPage(1);
  }

  function handelFiltroActividad(e) {
    dispatch(filtroActividad(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={styles.homeContainer}>
      <FilterBar
        activities={estadoActividad}
        handleOrdenNombre={handleOrdenNombre}
        handelFiltroActividad={handelFiltroActividad}
        handleOrdenPoblacion={handleOrdenPoblacion}
      />
      <SearchBar handleSearch={handleSearch} />
      <CountryCards paises={currentPaises} />
      <Paginado
        paisesPorPagina={paisesPorPagina}
        totalPaises={estadoPaises.length}
        paginar={paginar}
      />
    </div>
  );
}
