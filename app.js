"use strict";

const express = require("express");
const connection = require("./config/mongo");
const app = express();
const port = process.env.PORT || 3000;

(async () => {
  await new Promise((resolve, reject) => {
    if (connection.readyState === 1) {
      resolve();
    } else {
      connection.once("open", resolve);
      connection.once("error", reject);
    }
  });

  // set the view engine to ejs
  app.set("view engine", "ejs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // routes
  app.use("/", require("./routes/profile")());

  // start server
  const server = app.listen(port);
  console.log("Express started. Listening on %s", port);
})();
