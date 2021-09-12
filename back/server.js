import express from "express";
import { readFileSync, writeFile } from "fs";
let app = express();
app.use(cors());
import cors from "cors";
import { parse } from "path";
const getData = () => {
  return JSON.parse(readFileSync("./data.json"));
};
const writeData = (obj) => {
  writeFile("./data.json", JSON.stringify(obj));
};
const searchData = (search) => {
  let { items } = getData();
  let result = items.map((value) => {
    if (value.name.match(search) != null) {
      return value;
    }
  });

  return {
    items: result.filter((a) => {
      return a != null;
    }),
  };
};

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/init", (req, res) => {
  res.send(getData());
});
app.get("/search/:pattern", (req, res) => {
  console.log(req.params);
  res.send(searchData(req.params.pattern));
});
app.get("/new/:_data", (req, res) => {
  let { _data } = req.params;
  _data = JSON.parse(_data);
  if (
    _data.name !== undefined &&
    _data.quantity !== undefined &&
    _data.mrp !== undefined &&
    _data.unit !== undefined
  ) {
    let oldData = getData();
    oldData.push(data);
    writeData(oldData);
    res.send("");
  } else {
    res.status(404);
  }
});
app.listen(8000, () => {
  console.log("Started Server");
});
