import { useState } from "react"
import { DataItem, Item as ItemType } from "../App"
import Edit from "./Edit"
import "./itemStyle.css"
interface ItemProp {
  items: DataItem["items"]
  editFun:(id:number,_data:ItemType)=>void
}

export default function Item({ items ,editFun}: ItemProp) {
  const [showEdit, setShowEdit] = useState(false)
  const [id, setId] = useState(0)
  // const [itemState, setItemState] = useState<ItemType>()
  const done = (data:ItemType) => {
    console.log("Done"+ JSON.stringify(data))
    editFun(id,data)
  }

  return (
    <div>
      {showEdit && <Edit item={items[id]} id={id} done={done} />}
      <table >
        <tr>
          <th>S.no</th>
          <th>Name</th>
          <th>MRP</th>
          <th>Quantity</th>
          <th>Edit</th>
        </tr>
        {items.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{item.name}</td>
              <td>{item.mrp}</td>
              <td>{`${item.quantity} ${item.unit}`}</td>
              <td><button onClick={() => {
                setShowEdit(true)
                setId(i)
                }}>Edit</button></td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
