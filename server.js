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
    res.send(JSON.stringify(products));
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.patch("/update/", (req, res) => {
  try {
    const index = products.findIndex((item) => item.name === req.body.name);
    products[index] = req.body;
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
});

app.delete("/delete", (req, res) => {
  try {
    const index = products.findIndex((item) => item.title === req.body.title);

    if (index < 0) {
      res.sendStatus(404);
    } else if (index >= 0 && products.length == 1) {
      products.length = 0;
      res.sendStatus(200);
    } else if (index >= 0 && products.length > 1) {
      delete products.splice(index, 1);
      res.sendStatus(200);
    }
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
