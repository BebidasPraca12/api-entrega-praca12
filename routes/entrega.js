const express = require("express");
const router = express.Router();

const { calcularTaxa } = require("../services/taxa");
const { buscarCoordenadas, calcularDistanciaRota } = require("../services/mapa");

const ENDERECO_LOJA = "Praça Ataliba Leonel, 12, Piraju, SP, Brasil";

router.post("/calcular-entrega", async (req, res) => {
  try {
    const { endereco_cliente } = req.body;

    if (!endereco_cliente) {
      return res.status(400).json({
        erro: "Informe o endereço do cliente."
      });
    }

   const origem = {
  lat: -23.1936,
  lon: -49.3839
};

const destino = await buscarCoordenadas(endereco_cliente);

    const rota = await calcularDistanciaRota(origem, destino);

    const distanciaKm = Number(rota.distanciaKm.toFixed(2));
    const resultadoTaxa = calcularTaxa(distanciaKm);

    res.json({
  entrega_permitida: resultadoTaxa.permitido,
  endereco_loja: ENDERECO_LOJA,
  endereco_cliente,
  distancia_km: distanciaKm,
  tempo_estimado_minutos: rota.duracaoMinutos,
  taxa_entrega: resultadoTaxa.taxa,
  mensagem: resultadoTaxa.permitido
    ? `${resultadoTaxa.mensagem} Distância aproximada: ${distanciaKm} km.`
    : resultadoTaxa.mensagem
});
  } catch (error) {
    res.status(500).json({
      erro: error.message
    });
  }
});

module.exports = router;