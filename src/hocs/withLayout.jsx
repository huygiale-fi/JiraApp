
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const withLayout = WrappedComponent => {
  return ({ component: Component, isPrivate, ...rest }) => {
    const user = localStorage.getItem('user')
    const content = (
      <Route
        {...rest}
        render={routeProps => (
          <WrappedComponent>
            <Component {...routeProps} />
          </WrappedComponent>
        )}
      />
    );

    // Protect private routes
    if (isPrivate) {
      if (user) {
        return content;
      }
      return <Redirect to="/" />;
    }
    return content;
  };
};

export default withLayout;