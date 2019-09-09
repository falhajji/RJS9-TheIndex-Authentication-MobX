import React from "react";
import { Link, NavLink } from "react-router-dom";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";

import authStore from "./stores/AuthStore";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <img src={logo} className="logo" alt="the index logo" />
      <section>
        <h4 className="menu-item active">
          <NavLink to="/authors">AUTHORS</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/books">BOOKS</NavLink>
        </h4>
        <Link to="/signupform">
          <button className="btn btn-primary">Sign Up</button>
        </Link>
        {authStore.user ? (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => authStore.logout()}
          >
            Logout
          </button>
        ) : (
          <Link to="/loginform">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default observer(Sidebar);
