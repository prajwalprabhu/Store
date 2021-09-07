import express from "express";
import { readFileSync, writeFile } from "fs";
let app = express();
app.use(cors())
import cors from 'cors'
const getData = () => {
  return JSON.parse(readFileSync("./data.json"));
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
app.listen(8000, () => {
  console.log("Started Server");
});
