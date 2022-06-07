import React from "react";
import { Container, Text } from '@nextui-org/react';

function Dashboard(props) {
  return (
  <Container className="dashboard-container">
    <h2>Welcome to your Dashboard</h2>
      <h3>My Contributions</h3>
        <div></div>
        <button>Delete</button>
      <h3>My Current Engagments</h3>
        <div></div>
      <h3>Submit New Passage</h3>
        <textarea></textarea>
        <button>Submit New Passage</button>
  </Container>
  )
};

export default Dashboard;
