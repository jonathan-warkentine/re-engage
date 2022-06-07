import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Container, Text, Button } from '@nextui-org/react';
import '../../styles/Footer.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <Container className="footer">
        {location.pathname !== "/" && (
          <Button className="footer-back-button" size="sm" onClick={() => navigate(-1)}>&larr; Go Back</Button>
        )}
        <h4>&copy; {new Date().getFullYear()} - ReEngage</h4>
      </Container>
    </footer>
  );
};

export default Footer;
