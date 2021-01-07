import React from "react";
import Joi from "joi-browser";
import Form from "../components/Form";
import * as userService from "../services/userService";

export default class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "autoFocus", "email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
