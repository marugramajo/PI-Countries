import React from "react";

export default function Paginado({ paisesPorPagina, totalPaises, paginar }) {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(totalPaises / paisesPorPagina); i++) {
    numeroDePaginas.push(i);
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        {numeroDePaginas.map((pagina) => {
          return (
            <button onClick={() => paginar(pagina)} key={pagina}>
              {pagina}
            </button>
          );
        })}
      </div>
    </div>
  );
}
