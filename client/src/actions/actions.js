import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTRO_CONTINENTE,
  FILTRO_ACTIVIDAD,
  ORDEN_NOMBRE,
  ORDEN_POBLACION,
  SEARCH_COUNTRIES_BY_NAME,
  GET_DETAIL,
} from "./actionTypes";

export function getCountries() {
  return async (dispatch) => {
    const obtenerinfo = await axios.get("http://localhost:3001/countries");
    dispatch({ type: GET_COUNTRIES, payload: obtenerinfo.data });
  };
}

export function getActivities() {
  return async (dispatch) => {
    const allActivities = await axios.get(
      "http://localhost:3001/allactivities"
    );
    dispatch({ type: GET_ACTIVITIES, payload: allActivities.data });
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    const infoDetail = await axios.get("http://localhost:3001/countries/" + id);
    dispatch({ type: GET_DETAIL, payload: infoDetail.data });
  };
}

export function filtroActividad(payload) {
  return {
    type: FILTRO_ACTIVIDAD,
    payload,
  };
}

export function filtroContinente(payload) {
  return {
    type: FILTRO_CONTINENTE,
    payload,
  };
}

export function ordenPoblacion(payload) {
  console.log(payload);
  return {
    type: ORDEN_POBLACION,
    payload,
  };
}

export function ordenNombre(payload) {
  return {
    type: ORDEN_NOMBRE,
    payload,
  };
}

export function searchCountriesByName(payload) {
  return {
    type: SEARCH_COUNTRIES_BY_NAME,
    payload,
  };
}

export function postActivities(payload) {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    return response;
  };
}
