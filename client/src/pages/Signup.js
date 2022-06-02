import React, {useState} from "react";
import {Link} from "react-router-dom";

import {useMutation} from "@apollo/client";
import {ADD_READER} from "../utils/mutations";

import Auth from "../utils/auth";

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
      <div>
        <div>
          <h4>Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder="Your username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button style={{cursor: "pointer"}} type="submit">
                  Submit
                </button>
              </form>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
