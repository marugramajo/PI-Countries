import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  getActivities,
  getCountries,
  postActivities,
} from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateActivity.module.css";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  //VALIDACION
  function validate(input) {
    let errors = [];
    if (!input.name) {
      errors.name = "se requiere un nombre";
    }
    if (Number(input.difficulty) > 5 || Number(input.difficulty) < 1) {
      errors.difficulty = "el nivel de dificultad es de 1 a 5";
    }
    if (!input.season) {
      errors.season = "se requiere que especifique la temporada";
    }
    if (Number(input.duration) < 1) {
      errors.duration = "la duracion de la actividad debe ser como min de 1hr";
    }
    if (!input.countries) {
      errors.countries = "debe seleccionar al menos un pais";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //me refiero a e.target.name del name de cada input
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
    console.log(errors);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countries: input.countries.includes(e.target.value) //esto ee para que no se repitan los paises
        ? [...input.countries]
        : [...input.countries, e.target.value], //le paso lo que ya habia y concatenale el target value.
      //esto va a guardar todo lo que yo vaya seleccionando.
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postActivities(input));
    alert("¡Actividad creada con exito!");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((count) => count !== e), //aqui le digo filtramelo por todo lo que NO sea ese elemento
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>VOLVER</button>
      </Link>
      <h1>Creá tu actividad</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Nombre de la actividad:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.name && <p className={styles.errors}>{errors.name}</p>}
        </div>
        <div>
          <label>Dificultad:</label>
          <input
            type="number"
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.difficulty && (
            <p className={styles.errors}>{errors.difficulty}</p>
          )}
        </div>
        <div>
          <label>Duracion:</label>
          <input
            type="number"
            value={input.duration}
            name="duration"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.duration && (
            <p className={styles.errors}>{errors.duration}</p>
          )}
        </div>
        <div>
          <label>Temporada:</label>
          <label>
            <input
              type="radio"
              name="Verano"
              value="Verano"
              onChange={(e) => handleCheck(e)}
            />
            Verano
          </label>
          <label>
            <input
              type="radio"
              name="Primavera"
              value="Primavera"
              onChange={(e) => handleCheck(e)}
            />
            Primavera
          </label>
          <label>
            <input
              type="radio"
              name="Invierno"
              value="Invierno"
              onChange={(e) => handleCheck(e)}
            />
            Invierno
          </label>
          <label>
            <input
              type="radio"
              name="Otoño"
              value="Otoño"
              onChange={(e) => handleCheck(e)}
            />
            Otoño
          </label>
          {errors.season && <p className={styles.errors}>{errors.season}</p>}
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {countries.map((pais) => {
            return (
              <option key={pais.id} value={pais.id}>
                {pais.name}
              </option>
            );
          })}
        </select>
        <ul>
          <li key={countries.id}>{input.countries.map((e) => e + " ,")}</li>
        </ul>
        <button
          type="submit"
          disabled={
            !Object.values(errors).every((o) => o === null) ? true : false
          }
        >
          crear actividad
        </button>
      </form>
      {input.countries.map((e) => (
        <div className="divCountries">
          <p>{e}</p>
          <button className="botonX" onClick={() => handleDelete(e)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
