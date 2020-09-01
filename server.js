const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const products = [];

app.post("/create/", (req, res) => {
  try {
    console.log(req.body);
    products.push(req.body);
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.get("/read/", (req, res) => {
  try {
    res.sendStatus(200).send(JSON.stringify(products));
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.patch("/update/", (req, res) => {
  try {
    const index = products.findIndex((item) => item.name === req.body.name);
    products[index] = req.body;
    res.sendStatus(200).send();
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.delete("/delete", (req, res) => {
  try {
    const newarray = products.filter((item) => item.name !== req.body.name);
    products = newarray;
    res.sendStatus(200).send();
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
