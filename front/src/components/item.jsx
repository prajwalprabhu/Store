import React from "react";

export default function Item({ items }) {
  return (
    // <div>
    //   <h1>Hello World</h1>

    // </div>
    <table border={1}>
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
