const axios = require("axios");
const { Country } = require("../db");

//AQUI ME TRAIGO LA INFO DE LA API. LA MAPEO, Y LA ENVIO A LA BD
const infoApi = async () => {
  try {
    const info = await axios(`https://restcountries.com/v3/all`);

    info.data.map(async (pais) => {
      await Country.findOrCreate({
        where: {
          id: pais.cca3,
          name: pais.name.common,
          flag: pais.flags[1],
          continent: pais.region,
          capital: pais.capital
            ? pais.capital[0]
            : "Esta capital no está registrada.",
          subregion: pais.subregion
            ? pais.subregion
            : "Esta subregión no está registrada.",
          area: pais.area,
          population: pais.population,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { infoApi };
