import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADD_READER} from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Text, Input, Button, Spacer } from '@nextui-org/react';
import '../styles/LoginAndSignup.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addReader, {error, data}] = useMutation(ADD_READER);

  // update state based on form input changes
  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const {data} = await addReader({
        variables: {...formState},
      });

      Auth.login(data.addReader.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <Container align='center'>
        <div>
          <h2>Sign Up</h2>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  underlined
                  success
                  placeholder="Your username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <Input
                  underlined
                  secondary
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Input
                  underlined
                  warning
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Spacer y={1} />
                <Button
                  flat
                  style={{cursor: "pointer"}}
                  type="submit">
                  Submit
                </Button>
              </form>
            )}

            <Spacer y={3} />

            {error && <Text blockquote color="error" className="error-message">{error.message}</Text>}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Signup;
