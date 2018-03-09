import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const publicRoute = ({ loggedIn, component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
          if (loggedIn === false) {
            return (<Component {...props} />);
          }
          return (<Redirect to='/' />);
        }
      }
    />
);

publicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default publicRoute;
