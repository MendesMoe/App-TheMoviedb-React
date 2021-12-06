import React from "react";
import "./App.scss";
import Home from "./components/home";
import Header from "./components/header";
import Detail from "./components/detail";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
