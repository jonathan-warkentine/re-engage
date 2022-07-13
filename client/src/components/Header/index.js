import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Container, Button, Text, Spacer } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faEye } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Header.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Container align="center" display="flex" fluid className="header">
      <Container>
        <Text h1 css={{ textGradient: "45deg, $pink600 20%, $blue600 100%" }}>
          <Link to="/"><FontAwesomeIcon icon={faEye} />
            <FontAwesomeIcon icon={faBrain} /> 
            Re-Engage
          </Link>
        </Text>
        <Text h4>Slow down... Engage with what you read.</Text>
      </Container>
      <Container align="center" >
        <Spacer></Spacer>
        {Auth.loggedIn() ? (
          <Button.Group color="gradient">
          <Button onClick={logout} auto ghost >Logout</Button>
          <Button auto ghost as={Link} to='/bucket'>Others' Passages</Button>
          <Button auto ghost as={Link} to='/dashboard'>Your Passages</Button>
        </Button.Group>
        ) : (
          <Button.Group color="gradient">
            <Button auto ghost as={Link} to='/login'>Login</Button>
            <Button auto ghost as={Link} to='/signup'>Signup</Button>
          </Button.Group>
        )}
      </Container>
      <Spacer/>
    </Container>
  );
};

export default Header;
