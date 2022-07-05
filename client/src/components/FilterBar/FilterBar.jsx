import { useDispatch, useSelector } from "react-redux";
import {
  filtroActividad,
  filtroContinente,
  getActivities,
  ordenNombre,
  ordenPoblacion,
} from "../../actions/actions";
import { Link } from "react-router-dom";
import { styles } from "./FilterBar.module.css";

export default function FilterBar({ activities, handleFiltroContinente }) {
  const dispatch = useDispatch();

  function handleOrdenPoblacion(e) {
    dispatch(ordenPoblacion(e.target.value));
  }

  function handleOrdenNombre(e) {
    dispatch(ordenNombre(e.target.value));
  }

  function handelFiltroActividad(e) {
    console.log(e.target.value);
    dispatch(filtroActividad(e.target.value));
  }

  return (
    <div>
      <select onChange={(e) => handleOrdenNombre(e)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select onChange={(e) => handleOrdenPoblacion(e)}>
        <option value="todos">POPULATION</option>
        <option value="mayorpopulation">+ Population</option>
        <option value="menorpopulation">- Population</option>
      </select>
      <select onChange={(e) => handleFiltroContinente(e)}>
        <option value="All">todos</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">America</option>
        <option value="Antarctic">Antartida</option>
      </select>
      <select onChange={(e) => handelFiltroActividad(e)}>
        <option value="actividad">ACTIVIDADES TURISTICAS</option>
        {activities.map((act) => {
          return (
            <option key={act.id} value={act.name}>
              {act.name}
            </option>
          );
        })}
      </select>
      <div>
        <Link to="/create">crear actividad</Link>
      </div>
    </div>
  );
}
