import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.imagen}>
      <div>
        <h1 className={styles.inicio}>Let's travel around the world</h1>

        <Link to="/home">
          <button className={styles.button}>INGRESAR</button>
        </Link>
      </div>
    </div>
  );
}
//NO PUEDO PONER EL LINKKKKK!!!!1
