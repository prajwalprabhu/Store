import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import axios from "../axios";
import Header from "./Header";
export default function NewItem() {
  const name = useRef<HTMLInputElement>(null);
  const quntity = useRef<HTMLInputElement>(null);
  const mrp = useRef<HTMLInputElement>(null);
  const unit = useRef<HTMLInputElement>(null);
  const search = (query: string) => {};
  const submit = () => {
    if (mrp.current && name.current && quntity.current && unit.current) {
      let _mrp = parseInt(mrp.current.value);
      let _quantity = parseInt(quntity.current.value);
      console.log(_mrp);

      if (!Number.isNaN(_mrp) && !Number.isNaN(_quantity)) {
        axios
          .post(
            "/new",
            {
              name: name.current.value,
              quantity: _quantity,
              unit: unit.current.value,
              mrp: _mrp,
            },

            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
              },
            }
          )
          .catch((er) => {
            alert(`Error :${er}`);
          });
        alert(`Added New Item ${name.current.value}`);
        name.current.value = "";
        quntity.current.value = "";
        unit.current.value = "";
        mrp.current.value = "";
      } else {
        alert("Enter a valid mrp or quantity");
        return;
      }
    }
  };
  return (
    <div>
      <Header shop_name="" fun={search} is_search={false} />
      <table className="table table-primary table-striped table-bordered table-hover">
        <tbody>
          <tr>
            <div className="input-group">
              <span className="input-group-text">Name</span>
              <input type="text" required ref={name} />
            </div>
          </tr>
          <tr>
            <div className="input-group">
              <span className="input-group-text">Quantity</span>
              <input type="text" required ref={quntity} />
            </div>
          </tr>
          <tr>
            <div className="input-group">
              <span className="input-group-text">Mrp</span>
              <input type="text" required ref={mrp} />
            </div>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <span className="input-group-text">Unit</span>
                <input type="text" required ref={unit} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <button className="btn btn-success" onClick={submit}>
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
