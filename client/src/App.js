import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/DisplayEmployee";
import AddEmployee from "./Pages/AddEmployee"

function App() {

  //specify routes: path to correct page when click on the navigation bar accordingly
  return (
    <>
      <Router>
        <Navbar />
        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addEmp" component={AddEmployee} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
