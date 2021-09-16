import React from "react";
import {DataItem} from "../App"
import "./itemStyle.css"
interface ItemProp{
  items:DataItem["items"]
}
export default function Item({ items }:ItemProp) {
  return (
    <table >
      <tr>
        <th>Name</th>
        <th>MRP</th>
        <th>Quantity</th>
      </tr>
      {items.map((item, i) => {
        return (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.mrp}</td>
            <td>{`${item.quantity} ${item.unit}`}</td>
          </tr>
        );
      })}
    </table>
  );
}
