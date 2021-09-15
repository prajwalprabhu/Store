import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home'
import NewItem from './components/newITem'

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/new'>
        <NewItem />
      </Route>
    </Router>
  );
}

export default App;
