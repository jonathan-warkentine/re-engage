import React from "react";
import {Link} from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <Link to="/">
          <h1>Re-Engage</h1>
        </Link>
        <p>Slow down and engage with what you read</p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
