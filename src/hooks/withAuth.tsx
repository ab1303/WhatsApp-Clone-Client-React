import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { User, useMeQuery } from '../graphql/types';
import { useCacheService } from '../services/cache.service';
import { useSignOut, isSignedIn } from '../services/auth.service';

const MyContext = React.createContext<User | null>(null);

export const useMe = () => {
  return useContext(MyContext);
};

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

    const signOut = useSignOut();
    const { data, error, loading } = useMeQuery();

    useCacheService();

    if (loading) return null;

    if (data === undefined) return null;

    if (error || !data.me) {
      signOut();

      return <Redirect to="/sign-in" />;
    }

    return (
      <MyContext.Provider value={data.me}>
        <Component {...(props as P)} />
      </MyContext.Provider>
    );
  };
};
