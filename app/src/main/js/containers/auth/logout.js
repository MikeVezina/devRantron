import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ROUTES from '../../consts/routes';
import { logout } from '../../actions/auth';

function Logout(props) {
  if (props.key) {
    console.log("loggin out")
    props.logout();
    return (
      <Redirect to={ROUTES.main.rants} />
    );
  }
  return (
    <Redirect to={ROUTES.auth.login} />
  );
}

Logout.propTypes = {
  key: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    key: state.auth.key,
  };
}

export default connect(
  mapStateToProps,
  { logout },
)(Logout);
