import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./COMPONENTS/Nav";
import Index from "./COMPONENTS/Index";
import Register from "./COMPONENTS/Register";
import Login from "./COMPONENTS/Login";
import Authenticated from "./COMPONENTS/Authenticated";
import MyInfo from "./COMPONENTS/MyInfo";
import Staffs from "./COMPONENTS/Staffs";
import StaffsPositions from "./COMPONENTS/StaffsPosition";
import SearchPage from "./COMPONENTS/SearchPage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Authenticated>
            <Nav/>
            <Route exact path="/my-info" component={MyInfo}/>
            <Route exact path="/staffs" component={Staffs}/>
            <Route exact path="/engineers" render={(props) => <StaffsPositions {...props} position="engineer"/>}/>
            <Route exact path="/ceo" render={(props) => <StaffsPositions {...props} position="CEO"/>}/>
            <Route exact path="/other" render={(props) => <StaffsPositions {...props} position="other"/>}/>
            <Route exact path="/search" component={SearchPage}/>
          </Authenticated>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
