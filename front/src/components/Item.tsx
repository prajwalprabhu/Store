import { useState } from "react";

import { DataItem, Item as ItemType } from "../App";
import Edit from "./Edit";
import "./itemStyle.css";
interface ItemProp {
  items: DataItem["items"];
  editFun: (id: number, _data: ItemType) => void;
  rmFun: (id: number) => void;
}

export default function Item({ items, editFun, rmFun }: ItemProp) {
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);
  // const [itemState, setItemState] = useState<ItemType>()
  const done = (data: ItemType) => {
    setShowEdit(false);
    editFun(id, data);
  };
  const cancel = () => {
    setShowEdit(false);
  };
  return (
    <div>
      {showEdit && (
        <Edit item={items[id]} id={id} done={done} cancel={cancel} />
      )}
      <table className="table table-info table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>MRP</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{item.name}</td>
                <td>{item.mrp}</td>
                <td>{`${item.quantity} ${item.unit}`}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowEdit(true);
                      setId(i);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      rmFun(i);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
