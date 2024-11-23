import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoginButtonDisabled()) return;
    else {
      const credentials = { username, password };
      props.onLogin(credentials);
    }
  };

  const isLoginButtonDisabled = () => {
    const emailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (username === "" || password === "" || !emailRegex.test(username)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoginButtonDisabled()}
          >
            Login
          </Button>
          <Link className="btn btn-danger mx-2 my-2" to={"/"}>
            Cancel
          </Link>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
