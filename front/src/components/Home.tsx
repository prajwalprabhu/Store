import Item from "./Item";
import { DataItem, Item as ItemType } from "../App";
import { useEffect, useState } from "react";
import axios from "../axios";
import Header from "./Header";
//Example Data
// let data = {
//   shop_name: "Shop",
//   items: [
//     {
//       name: "Tomato",
//       quantity: 10,
//       unit: "Kg",
//       mrp: 25,
//     },
//     {
//       name: "Potato",
//       quantity: 15,
//       unit: "Kg",
//       mrp: 35,
//     },
//   ],
// };

export default function Home() {
  const [shop_name, setShop_name] = useState("");
  const [data, setData] = useState<DataItem["items"]>([]);
  function removeData(id: number) {
    if (window.confirm("Do You really want to remove this item")) {
      let _data = data.filter((_, i) => {
        return i !== id;
      });

      setData(_data);
      console.log(JSON.stringify(data));
      axios.post("/rm", {
        id: id,
      });
    }
  }
  function editData(id: number, _data: ItemType) {
    let a = [...data];
    a[id] = _data;
    setData(a);
    axios.post("/edit", {
      id: id,
      data: _data,
    });
  }
  async function getData() {
    try {
      let _data = (await (await axios.get("/init")).data) as DataItem;
      setShop_name(_data.shop_name);
      setData(_data.items);
    } catch {
      alert("Server is Down");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const search = async (query: string) => {
    if (query !== "") {
      try {
        let _data = (await axios.get(`/search/${query}`)).data;
        setData(_data.items);
      } catch {}
    } else {
      getData();
    }
  };
  return (
    <div className="App">
      <Header shop_name={shop_name} fun={search} is_search={true} />
      <br />

      <Item items={data} editFun={editData} rmFun={removeData}></Item>
    </div>
  );
}
