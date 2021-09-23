import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import NewItem from "./components/NewItem";
export interface Item {
  name: string;
  quantity: number;
  unit: string;
  mrp: number;
}

export interface DataItem {
  shop_name: string;
  items: Item[];
}

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/new">
        <NewItem />
      </Route>
    </Router>
  );
}

export default App;
