import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Textarea,
  Text,
  Button,
  Table,
  Tooltip,
  Progress,
  Grid,
  Spacer,
  Modal,
  Collapse,
  Col,
  Card
} from "@nextui-org/react";
import {IconButton} from "../components/Icons/IconButton";
import {EyeIcon} from "../components/Icons/EyeIcon";
import {EditIcon} from "../components/Icons/EditIcon";
import {DeleteIcon} from "../components/Icons/DeleteIcon";
import {ResumeIcon} from "../components/Icons/ResumeIcon";
import {AddIcon} from "../components/Icons/AddIcon";
import {RemoveIcon} from "../components/Icons/RemoveIcon";
import "../styles/Team.css";


const Team = () => {
  return (
      <Container>
        <Col>
          
          <Text h2>The WHAMM! team:</Text>

          <Container id="container-for-cards">

            <Card>

            </Card>

          </Container>

        </Col>
      </Container>
  );
};

export default Team;
