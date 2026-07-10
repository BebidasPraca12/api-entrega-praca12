function verificarApiKey(req, res, next) {
  // Permite acessar a página inicial sem autenticação
  if (req.path === "/") {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      erro: "API Key não informada."
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      erro: "API Key inválida."
    });
  }

  next();
}

module.exports = verificarApiKey;