const verificarApiKey = require("./middleware/auth");
const express = require("express");
const cors = require("cors");

const entregaRoutes = require("./routes/entrega");

const app = express();

app.use(cors());
app.use(express.json());
app.use(verificarApiKey);
app.get("/", (req, res) => {
  res.send("API de entrega Praça12 funcionando.");
});

app.use("/", entregaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});