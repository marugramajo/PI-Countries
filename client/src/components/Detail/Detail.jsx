import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  //me traigo el detalle de reducer
  const estadoDetalle = useSelector((state) => state.detail);
  return (
    <div className={styles.cardsGrid}>
      {estadoDetalle ? (
        <div className={styles.card}>
          <div>
            <img className={styles.flag} src={estadoDetalle.flag} />
            <h1 className={styles.nombre}>{estadoDetalle.name}</h1>
            <h2>{estadoDetalle.continent}</h2>
            <h3>ID:{estadoDetalle.id}</h3>
            <h3>CAPITAL:{estadoDetalle.capital}</h3>
            <h3>REGIÓN:{estadoDetalle.subregion}</h3>
            <h3>AREA:{estadoDetalle.area}</h3>
            <h3>POBLACIÓN:{estadoDetalle.population}</h3>
          </div>
          <h5 className={styles.actividad}>
            {estadoDetalle.activities &&
              estadoDetalle.activities.map((e) => {
                return (
                  <div key={e.id}>
                    <h2>ACTIVIDADES: {e.name}</h2>
                    <h2>TEMPORADA: {e.season}</h2>
                    <h2>DIFICULTAD: {e.difficulty}</h2>
                    <h2>DURACIÓN: {e.duration} HS</h2>
                  </div>
                );
              })}
          </h5>
        </div>
      ) : (
        <p> loading...</p>
      )}
      <Link to="/home">
        <button>volver</button>
      </Link>
    </div>
  );
}
