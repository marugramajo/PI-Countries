import React from "react";
import { Link, Route } from "react-router-dom";
import styles from "./CountryCard.module.css";
import Detail from "../Detail/Detail";

export default function CountryCard({ id, flag, name, continent }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLogo}>
        <img src={flag} alt="bandera" className={styles.flag} />
      </div>
      <div className={styles.cardContent}>
        <Link to={`/countries/${id}`}>
          <button className={styles.button}>{name}</button>
        </Link>
        <h4 className={styles.continent}>{continent}</h4>
      </div>
    </div>
  );
}
