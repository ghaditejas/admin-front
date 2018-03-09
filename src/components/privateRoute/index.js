import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, children, ...rest }) => (
    <Route
      {...rest}
      render={() => {
          if (loggedIn) {
            return (<div className="layOutWrapper">{children}</div>);
          }
          return (<Redirect to='/login' />);
        }
      }
    />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default PrivateRoute;
