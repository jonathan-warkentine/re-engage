import React from "react";
import { Link } from "react-router-dom";
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
           <Button.Group color="gradient">
            <Button onClick={logout} auto ghost >Logout</Button>
            <Button auto ghost as={Link} to='/bucket'>Bucket</Button>
            <Button auto ghost as={Link} to='/dashboard'>Dashboard</Button>
          </Button.Group>
          ) : (
            <Button.Group color="gradient">
              <Button auto ghost as={Link} to='/login'>Login</Button>
              <Button auto ghost as={Link} to='/signup'>Signup</Button>
              <Button auto ghost as={Link} to='/bucket'>Bucket</Button>
              <Button auto ghost as={Link} to='/dashboard'>Dashboard</Button>
            </Button.Group>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
