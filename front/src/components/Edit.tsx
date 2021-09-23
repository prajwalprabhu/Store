import { Item } from "../App";
import { useRef } from "react";
import { Table } from "react-bootstrap";
interface EditProps {
  item: Item;
  id: number;
  done: (item: Item) => void;
  cancel: () => void;
}
export default function Edit({ item, id, done, cancel }: EditProps) {
  const name = useRef<HTMLInputElement>(null);
  const quntity = useRef<HTMLInputElement>(null);
  const mrp = useRef<HTMLInputElement>(null);
  const unit = useRef<HTMLInputElement>(null);
  const check = () => {
    if (mrp.current && name.current && quntity.current && unit.current) {
      let _mrp = parseInt(mrp.current.value);
      let _quantity = parseInt(quntity.current.value);
      console.log(_mrp);

      if (!Number.isNaN(_mrp) && !Number.isNaN(_quantity)) {
        done({
          name: name.current.value,
          quantity: _quantity,
          unit: unit.current.value,
          mrp: _mrp,
        });
      } else {
        alert("Enter a valid mrp or quantity");
        return;
      }
    }
  };
  return (
    <div>
      <table className="table table-secondary table-striped table-bordered table-hover">
        <tr key={id}>
          <tr>
            <td>
              <div className="input-group">
                <span className="input-group-text">Name </span>
                <input type="text" defaultValue={item.name} ref={name} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <span className="input-group-text">MRP</span>
                <input type="text" defaultValue={item.mrp} ref={mrp} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <span className="input-group-text">Quantity</span>
                <input type="text" defaultValue={item.quantity} ref={quntity} />
              </div>
            </td>
          </tr>
          <tr>
            <div className="input-group">
              <span className="input-group-text">Unit</span>
              <input type="text" defaultValue={item.unit} ref={unit} />
            </div>
          </tr>
          <tr>
            <div className="input-group">
              <button onClick={check} className="btn btn-primary">
                Done
              </button>
              <button onClick={cancel} className="btn btn-danger">
                cancel
              </button>
            </div>
          </tr>
        </tr>
      </table>
    </div>
  );
}
