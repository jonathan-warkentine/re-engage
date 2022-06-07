import React from "react";
import { Container, Text, Textarea, Button } from '@nextui-org/react';

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
        <Textarea
          fullWidth="true"
          minRows={3}
          maxRows={15}
          bordered
          color="success"
          placeholder="You can type or paste-in your passage text here."></Textarea>
        <Button color="success">Submit New Passage</Button>
  </Container>
  )
};

export default Dashboard;
