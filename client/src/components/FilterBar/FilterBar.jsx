import { useDispatch, useSelector } from "react-redux";
import { filtroContinente } from "../../actions/actions";
import { Link } from "react-router-dom";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  activities,
  handleOrdenPoblacion,
  handelFiltroActividad,
  handleOrdenNombre,
}) {
  const dispatch = useDispatch();

  function handleFiltroContinente(e) {
    dispatch(filtroContinente(e.target.value));
  }

  return (
    <div>
      <div className={styles.flex}>
        <div style={{ display: "flex" }}>
          <select
            className={styles.order}
            onChange={(e) => handleOrdenNombre(e)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className={styles.order}
            onChange={(e) => handleOrdenPoblacion(e)}
          >
            <option value="todos">POBLACIÓN</option>
            <option value="mayorpopulation">+ Población</option>
            <option value="menorpopulation">- Población</option>
          </select>
        </div>
        <div>
          <Link to="/create">
            <button className={styles.button}>crear actividad</button>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          <select
            className={styles.filtro}
            onChange={(e) => handleFiltroContinente(e)}
          >
            <option value="All">CONTINENTE</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">America</option>
            <option value="Antarctic">Antartida</option>
          </select>
          <select
            className={styles.filtro}
            onChange={(e) => handelFiltroActividad(e)}
          >
            <option value="actividad">ACTIVIDADES TURISTICAS</option>
            {activities.map((act) => {
              return (
                <option key={act.id} value={act.name}>
                  {act.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
