import React from "react";
import { Link } from "react-router-dom";
import { Container, Text, Spacer, Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Footer.css'

const Footer = () => {
  return (
      <Container fluid display="flex" wrap='wrap' direction="column" justify="center" alignItems = "center" className="footer">
        <Spacer></Spacer>
        <Spacer></Spacer>
        <Spacer></Spacer>
        <Text align="center">
          &copy; {new Date().getFullYear()}
        </Text>
        <Text align="center" css={{textGradient: "45deg, $red600 -20%, $yellow600 50%"}} weight="bold">
          Brought to you by WWHaM!
        </Text>
        <Button auto size="xs" color="secondary" ghost as={Link} to="/team" >
          <FontAwesomeIcon icon={faPeopleGroup} /> 
          ... Meet the Team
        </Button>
        <Spacer></Spacer>
      </Container>
  )
}

export default Footer;
