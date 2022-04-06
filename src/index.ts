import app from "./app";

const PORT = process.env.PORT || 4000;

//Inicializa el servidor
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
