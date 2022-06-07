import React from "react";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import { Container, Text, Button } from '@nextui-org/react';
import '../../styles/Header.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <Container className="header" css={{ marginBottom: "40px" }}>
        <div className="title-and-subtitle">
          <Link to="/">
            <h1>Re-Engage</h1>
          </Link>
          <h4>Slow down... Engage with what you read.</h4>
        </div>
        <div className="nav-buttons">
          {Auth.loggedIn() ? (
            <>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Button.Group color="gradient">
              <Button auto ghost onClick={(e) => {e.preventDefault(); window.open('/login');}}>Login</Button>
              <Button auto ghost onClick={(e) => {e.preventDefault(); window.open('/signup');}}>Signup</Button>
              <Button auto ghost onClick={(e) => {e.preventDefault(); window.open('/bucket');}}>Bucket</Button>
              <Button auto ghost onClick={(e) => {e.preventDefault(); window.open('/dashboard');}}>Dashboard</Button>
            </Button.Group>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
