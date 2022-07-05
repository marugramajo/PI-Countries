// importamos las acciones
import {
  FILTRO_CONTINENTE,
  GET_COUNTRIES,
  ORDEN_POBLACION,
  ORDEN_NOMBRE,
  SEARCH_COUNTRIES_BY_NAME,
  GET_ACTIVITIES,
  FILTRO_ACTIVIDAD,
  GET_DETAIL,
  POST_ACTIVITIES,
} from "../actions/actionTypes";

const initialState = {
  countries: [],
  filteredCountries: [],
  detail: [],
  activities: [],
};
//El PARAMETRO STATE LE ASIGNAMOS EL VALOR DE INICIALSTATE, Y VA A RECIBIR UNA ACCION
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case FILTRO_ACTIVIDAD:
      const allCount = state.countries;
      const filtremos =
        action.payload === "actividad"
          ? allCount
          : allCount.filter((p) =>
              p.activities.some((act) => act.name === action.payload)
            );
      return {
        ...state,
        filteredCountries: filtremos,
      };

    case FILTRO_CONTINENTE:
      const allCountries = state.countries;
      const filter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((pais) => pais.continent === action.payload);
      return {
        ...state,
        filteredCountries: filter,
      };

    case ORDEN_POBLACION:
      let ordenados;
      if (action.payload === "todos") {
        ordenados = state.filteredCountries;
      } else if (action.payload === "mayorpopulation") {
        ordenados = state.filteredCountries.sort((a, b) => {
          return b.population - a.population;
        });
      } else if (action.payload === "menorpopulation") {
        ordenados = state.filteredCountries.sort((a, b) => {
          return a.population - b.population;
        });
      }
      return {
        ...state,
        filteredCountries: [...ordenados],
      };

    case ORDEN_NOMBRE:
      let ordenNombre;
      if (action.payload === "asc") {
        ordenNombre = state.filteredCountries.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return 1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
          }
        });
        console.log(ordenNombre);
      } else if (action.payload === "desc") {
        ordenNombre = state.filteredCountries.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return -1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return 1;
          }
        });
      }
      console.log(ordenNombre);
      return {
        ...state,
        filteredCountries: [...ordenNombre],
      };

    case SEARCH_COUNTRIES_BY_NAME:
      const busquedaNombre = action.payload;
      const filtrados = state.countries.filter((country) =>
        country.name.toLowerCase().startsWith(busquedaNombre.toLowerCase())
      );
      return {
        ...state,
        filteredCountries: filtrados,
      };

    case POST_ACTIVITIES:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
