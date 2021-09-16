import { useRef } from "react";
import axios from "../axios";
export default function NewItem() {
  const name = useRef<HTMLInputElement>(null);
  const quntity = useRef<HTMLInputElement>(null);
  const mrp = useRef<HTMLInputElement>(null);
  const unit = useRef<HTMLInputElement>(null);
  const submit = () => {
    if (mrp.current && name.current && quntity.current && unit.current){
    let _mrp = parseInt(mrp.current.value);
    console.log(_mrp);

    if (!Number.isNaN(_mrp)) {
      console.log(_mrp);
    } else {
      alert("Enter a valid mrp");
      return;
    }
    axios.post("/new", {
      name: name.current.value,
      quntiy: quntity.current.value,
      unit: unit.current.value,
      mrp: _mrp,
    });
  }
  };
  return (
    <div>
      <table>
        <tr>
          <td>
            <h2>Name</h2>
          </td>
          <td>
            <input type='text' required ref={name} />
          </td>
        </tr>
        <tr>
          <td>
            <h2>Quantity</h2>
          </td>
          <td>
            <input type='text' required ref={quntity} />
          </td>
        </tr>
        <tr>
          <td>
            <h2>MRP</h2>
          </td>
          <td>
            <input type='text' required ref={mrp} />
          </td>
        </tr>
        <tr>
          <td>
            <h2>unit</h2>
          </td>
          <td>
            <input type='text' required ref={unit} />
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={submit}>Submit</button>
          </td>
        </tr>
      </table>
    </div>
  );
}
