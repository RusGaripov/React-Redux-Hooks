import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
        <div className="container">
          <Link to="/cities" className="navbar-brand">
            Погода в городе
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
