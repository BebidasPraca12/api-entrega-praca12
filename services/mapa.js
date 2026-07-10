const axios = require("axios");

async function buscarCoordenadas(endereco) {
  const url = "https://nominatim.openstreetmap.org/search";

  const resposta = await axios.get(url, {
    params: {
      q: endereco,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "Praca12DeliveryAPI/1.0"
    }
  });

  if (!resposta.data || resposta.data.length === 0) {
    throw new Error("Endereço não encontrado.");
  }

  return {
    lat: Number(resposta.data[0].lat),
    lon: Number(resposta.data[0].lon)
  };
}

async function calcularDistanciaRota(origem, destino) {
  const url = `https://router.project-osrm.org/route/v1/driving/${origem.lon},${origem.lat};${destino.lon},${destino.lat}`;

  const resposta = await axios.get(url, {
    params: {
      overview: "false"
    }
  });

  if (!resposta.data.routes || resposta.data.routes.length === 0) {
    throw new Error("Não foi possível calcular a rota.");
  }

  return {
    distanciaKm: resposta.data.routes[0].distance / 1000,
    duracaoMinutos: Math.round(resposta.data.routes[0].duration / 60)
  };
}

module.exports = {
  buscarCoordenadas,
  calcularDistanciaRota
};