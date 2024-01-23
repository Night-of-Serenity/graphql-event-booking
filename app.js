const express = require("express");
const graphqlHttp = require("express-graphql");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server runing on port 3000");
});
