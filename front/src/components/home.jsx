import Item from "./item";
import { useEffect, useRef, useState } from "react";
import axios from "../axios";
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
  const searchRef = useRef(null);
  const [shop_name, setShop_name] = useState("");
  const [data, setData] = useState([]);
  async function getData() {
    try {
      let _data = await (await axios.get("/init")).data;
      setShop_name(_data.shop_name);
      setData(_data.items);
    } catch {
      alert("Server is Down");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const search = async () => {
    let searchText = searchRef.current.value;
    if (searchText !== "") {
      try {
        let _data = (await axios.get(`/search/${searchRef.current.value}`))
          .data;
        setData(_data.items);
      } catch {}
    } else if (data.length === 0) {
      getData();
    }
  };
  return (
    <div className='App'>
      <h1>
        <b>
          <u>
            <center>
              Welcome <br />
              to <br />
              {shop_name}
            </center>
          </u>
        </b>
      </h1>
      <a href='/new'>New</a>
      <br />
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search'
        ref={searchRef}
        onKeyDown={search}
      />
      <button onClick={search}>Search</button>
      <br />

      <Item items={data}></Item>
    </div>
  );
}