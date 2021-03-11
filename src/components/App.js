import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar";
import CitiiesList from "./CitiesList/CitiiesList";
import { Provider } from "react-redux";
import store from "../store/index";
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/cities" component={CitiiesList} />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
