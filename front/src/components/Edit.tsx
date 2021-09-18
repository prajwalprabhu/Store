import { Item } from "../App"
import {useRef} from "react"
interface EditProps {
  item: Item,
  id: number
  done:(item:Item)=>void
}
export default function Edit({ item, id,done }: EditProps) {
  const name = useRef<HTMLInputElement>(null);
  const quntity = useRef<HTMLInputElement>(null);
  const mrp = useRef<HTMLInputElement>(null);
  const unit = useRef<HTMLInputElement>(null);
  const check = ()=>{
    if (mrp.current && name.current && quntity.current && unit.current){
    let _mrp = parseInt(mrp.current.value);
    let _quantity = parseInt(quntity.current.value)
    console.log(_mrp);

    if (!Number.isNaN(_mrp) && !Number.isNaN(_quantity)) {
      done({
        name: name.current.value,
        quantity: _quantity,
        unit: unit.current.value,
        mrp: _mrp,
      })
    } else {
      alert("Enter a valid mrp or quantity");
      return;
    }
  }
  }
  return (
    <div>
      <table >
        <tr>
          <th>S.no</th>
          <th>Name</th>
          <th>MRP</th>
          <th>Quantity</th>
          <th>Edit</th>
        </tr>
        <tr key={id}>
          <td>{id}</td>
          <td>Name : <input type="text" defaultValue={item.name} ref={name}/> </td>
          <td>MRP  : <input type="text" defaultValue={item.mrp} ref={mrp}/> </td>
          <td>Quantity : <input type="text" defaultValue={item.quantity} ref={quntity}/></td>
          <td>Unit  : <input type="text" defaultValue={item.unit} ref={unit}/> </td>
        </tr>
        <button onClick={check}>Done</button>
      </table>
    </div>
  )
}
