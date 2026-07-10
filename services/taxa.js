const configuracaoTaxas = require("../config/taxas.json");

function calcularTaxa(distanciaKm) {
  const distanciaMaxima = configuracaoTaxas.distancia_maxima_km;

  if (distanciaKm > distanciaMaxima) {
    return {
      permitido: false,
      taxa: null,
      mensagem: `Entrega indisponível. Distância acima de ${distanciaMaxima} km.`
    };
  }

  const faixaEncontrada = configuracaoTaxas.faixas.find(
    (faixa) => distanciaKm <= faixa.ate_km
  );

  if (!faixaEncontrada) {
    return {
      permitido: false,
      taxa: null,
      mensagem: "Não foi possível calcular a taxa para essa distância."
    };
  }

  return {
    permitido: true,
    taxa: faixaEncontrada.taxa,
    mensagem: `A taxa de entrega é R$ ${faixaEncontrada.taxa.toFixed(2).replace(".", ",")}.`
  };
}

module.exports = {
  calcularTaxa
};