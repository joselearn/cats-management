import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Cats management 
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <NavLink className="nav-link nav-item" to="/">
            Cats
          </NavLink>
          <NavLink className="nav-link nav-item" to="/cat/new">
            Create Cat
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
