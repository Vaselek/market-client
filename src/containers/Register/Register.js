import React, {Component, Fragment} from 'react';
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
  state = {
    username: '',
    password: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();

    this.props.registerUser({...this.state});
  };

  getFieldError = fieldName => {
    return this.props.error && this.props.error.errors &&
      this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
  };

  render() {
    return (
      <Fragment>
        <h2>Register new user</h2>
        {this.props.error && this.props.error.global && (
          <Alert color="danger">
            {this.props.error.global}
          </Alert>
        )}

        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            type="text"
            value={this.state.username}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('username')}
            placeholder="Enter your unique username"
            autoComplete="new-username"
          />

          <FormElement
            propertyName="displayName"
            title="Display Name"
            type="text"
            value={this.state.displayName}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('displayName')}
            placeholder="Enter your desired display name"
            autoComplete="new-displayName"
          />

          <FormElement
              propertyName="phone"
              title="Phone Number"
              type="text"
              value={this.state.phone}
              onChange={this.inputChangeHandler}
              error={this.getFieldError('phone')}
              placeholder="Enter your phone number"
              autoComplete="new-phone"
          />

          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('password')}
            placeholder="Enter new secure password"
            autoComplete="new-password"
          />

          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button type="submit" color="primary">
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
