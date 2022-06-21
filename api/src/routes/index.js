const { Router } = require("express");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");
const { infoApi } = require("../apiData/apiData");
// const { apiData } = require("../apiData/apiData");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

//ejemplo para modularizar despues
//const getCountriesRouter = require("./getCountries")
//router.use("/countries", getCountriesRouter);

router.get("/countries", async (req, res) => {
  await infoApi();
  try {
    const { name } = req.query;
    if (name) {
      const unPais = await Country.findOne({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      });
      if (unPais) {
        res.json(unPais);
      } else {
        res.json({ noExiste: 404 });
      }
    } else {
      const todosPaises = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      });
      if (todosPaises) {
        return res.json(todosPaises);
      } else {
        return res.status(404).json({ message: "No se encontraron paises." });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// ruta para crear una actividad

router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  if (!name || !difficulty || !duration || !season || !countries)
    res.status(400).json({ msg: "Faltan datos importantes" });
  try {
    const obj = { name, difficulty, duration, season };
    const nuevaActividad = await Activity.create(obj);

    await nuevaActividad.addCountry(countries);
    console.log("AQUUUUUUUIIII", nuevaActividad);

    const activYpais = await Activity.findOne({
      where: { name: name },
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });
    res.json(activYpais);
  } catch (error) {
    console.log(error);
  }
});

//ruta para traernos paises por id
router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ msg: "Falta ID" });
  try {
    const country = await Country.findByPk(id.toUpperCase(), {
      include: [{ model: Activity }],
    });
    res.json(country);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
