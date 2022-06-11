import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Container, Text, Button } from '@nextui-org/react';
import '../../styles/Footer.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
      <Container className="footer">
        {location.pathname !== "/" && (
          <Button color="secondary" ghost className="footer-back-button" size="xs" onClick={() => navigate(-1)}>&larr; Go Back</Button>
        )}
        <Text h4 css={{
          textGradient: "45deg, $blue600 -20%, $red600 50%",
        }}
        weight="bold">&copy; {new Date().getFullYear()} - ReEngage</Text>
        <Text h5 css={{
          textGradient: "45deg, $red600 -20%, $yellow600 50%",
        }}
        weight="bold">brought to you by WWHAMM!</Text>
      </Container>
  );
};

export default Footer;
