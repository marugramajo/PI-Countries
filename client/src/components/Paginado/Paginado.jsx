import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ paisesPorPagina, totalPaises, paginar }) {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(totalPaises / paisesPorPagina); i++) {
    numeroDePaginas.push(i);
  }
  return (
    <div className={styles.paginado}>
      <div style={{ display: "flex" }}>
        {numeroDePaginas.map((pagina) => {
          return (
            <button
              onClick={() => paginar(pagina)}
              key={pagina}
              className={styles.btn}
            >
              {pagina}
            </button>
          );
        })}
      </div>
    </div>
  );
}
