import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_READER } from '../utils/mutations';
import { Container, Input, Button, Spacer, Text } from '@nextui-org/react';
import '../styles/LoginAndSignup.css';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_READER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container align='center' xs>
      <Spacer></Spacer>
      <>
        <>
          <Text h2>Login</Text>
          <>
            {data ? (
              <Text>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </Text>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Container display='flex' direction='column'>
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
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Spacer></Spacer>
                  <Button
                    flat
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Container>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </>
        </>
      </>
    </Container>
  );
};

export default Login;
