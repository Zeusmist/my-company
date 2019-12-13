import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Authenticated from "./COMPONENTS/Authenticated";
import AdminAuthenticated from "./COMPONENTS/AdminAuthenticated";
import UserApp from './COMPONENTS/UserApp';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminAuthenticated}/>
          <Route path="/user" component={Authenticated}/>
          <Route path="/" component={UserApp}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
