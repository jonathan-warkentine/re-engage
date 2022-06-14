import React from "react";
import { Container, Text, Spacer } from '@nextui-org/react';
import '../../styles/Footer.css'

const Footer = () => {
  return (
      <Container className="footer">
        <Spacer y={2} />
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
