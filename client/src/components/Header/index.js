import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Container, Button, Text } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faEye } from '@fortawesome/free-solid-svg-icons';
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
            <Text h1 css={{ textGradient: "45deg, $pink600 20%, $blue600 100%" }}><FontAwesomeIcon icon={faEye} /><FontAwesomeIcon icon={faBrain} /> Re-Engage</Text>
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
            </Button.Group>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
