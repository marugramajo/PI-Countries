import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function SearchBar({ handleSearch }) {
  return (
    <div>
      <input
        type="SEARCH"
        placeholder="Ingrese un pais"
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}
