//aqui puedo hacer el map, la paginacion, la logica para pedir el estado.
//esto nos ahorra que el home tenga menos lineas y que solo renderize el CountryCards.

import React from "react";
import CountryCard from "../CountryCard/CountryCard";

import styles from "./CountryCards.module.css";

export default function CountryCards({ paises }) {
  return (
    <div className={styles.cardsGrid}>
      {paises.length > 0 ? (
        paises.map((pais) => (
          //   <Link to={`/details/${pais.id}`}>
          <CountryCard
            key={pais.id}
            flag={pais.flag}
            name={pais.name}
            continent={pais.continent}
            id={pais.id}
          />
          //   </Link>
        ))
      ) : (
        <div className={styles.loader}>
          <span>LOADING...</span>
          <span>LOADING...</span>
        </div>
      )}
    </div>
  );
}
