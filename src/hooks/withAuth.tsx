import React from 'react';
import { Redirect } from 'react-router-dom';

import { useCacheService } from '../services/cache.service';

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: any) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === '/sign-in') {
        return null;
      }

      return <Redirect to="/sign-in" />;
    }

    useCacheService();

    return <Component {...(props as P)} />;
  };
};

export const isSignedIn = () => {
  return /currentUserId=.+(;|$)/.test(document.cookie);
};
