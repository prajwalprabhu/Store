import express from "express"
import {readFileSync,writeFileSync} from "fs"
import bodyParser from "body-parser"
import cors from "cors"


interface item
  {
    name: string,
    quantity: number,
    unit: string,
    mrp: number,
  }

export interface DataItem {
shop_name: string,
  items:item[]

}

let app = express();
app.use(cors());
app.use(bodyParser.json());
// import { parse } from "path";
const getData = ():DataItem => {
  return JSON.parse(readFileSync("./data.json").toString());
};
const writeData = (obj:DataItem) => {
  writeFileSync("./data.json", JSON.stringify(obj));
};
const searchData = (search:string) => {
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
app.post("/new/", (req, res) => {
  console.log(req.body);
  let _data = getData();
  _data.items.push(req.body);

  writeData(_data);
});
app.listen(8000, () => {
  console.log("Started Server");
});
