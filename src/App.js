import React from "react";
import logo from "./logo.svg";
import Ghostpost from "./Ghostpost";
import NewPost from "./newpost";
import BoastPost from "./BoastPost";
import RoastPost from "./RoastPost";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import TopPost from "./TopScore";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Ghostpost} />
          <Route exact path="/newpost" component={NewPost} />
          <Route exact path="/boasts" component={BoastPost} />
          <Route exact path="/roasts" component={RoastPost} />
          <Route exact path="/top" component={TopPost} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
