function carregarChavesValidas() {
  const apiKeys = process.env.API_KEYS || "";

  return apiKeys
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [nome, chave] = item.split(":");
      return { nome, chave };
    });
}

function verificarApiKey(req, res, next) {
  if (req.path === "/") {
    return next();
  }

  const apiKeyRecebida = req.headers["x-api-key"];

  if (!apiKeyRecebida) {
    return res.status(401).json({
      erro: "API Key não informada."
    });
  }

  const chavesValidas = carregarChavesValidas();

  const chaveEncontrada = chavesValidas.find(
    (item) => item.chave === apiKeyRecebida
  );

  if (!chaveEncontrada) {
    return res.status(401).json({
      erro: "API Key inválida."
    });
  }

  req.apiClient = chaveEncontrada.nome;

  next();
}

module.exports = verificarApiKey;