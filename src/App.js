import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';

export const LoggedInUserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser.name);
  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>



          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <h1>Signed in user: {loggedInUser.name} </h1>
    </LoggedInUserContext.Provider>
  );
}

export default App;
