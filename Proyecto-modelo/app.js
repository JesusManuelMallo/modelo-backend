require("dotenv/config");

require("./db");
//
const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const projectName = "Proyecto-modelo";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = "LAS MEJORES CANCIONES DE LA HISTORIA";

app.locals.subtitle =
  "Elige tus canciones favoritas de las 20 mejores canciones de la historia";

require("./routes/index")(app);

// const index = require("./routes/index");
// app.use("/", index);

// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

// const charRoutes = require("./routes/characters.routes");
// app.use("/", charRoutes);

require("./error-handling")(app);

module.exports = app;
