import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ handleSearch }) {
  return (
    <div>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchBar}
          type="SEARCH"
          placeholder="Ingrese un pais"
          onChange={(e) => handleSearch(e)}
        ></input>
      </div>
    </div>
  );
}
