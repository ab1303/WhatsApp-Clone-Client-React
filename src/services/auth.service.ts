import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { useSignInMutation, useSignUpMutation } from '../graphql/types';

export const useSignIn = useSignInMutation;
export const useSignUp = useSignUpMutation;

export const useSignOut = () => {
  const client = useApolloClient();

  return useCallback(() => {
    // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
    // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
    document.cookie = `authToken=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client]);
};

export const isSignedIn = () => {
  return /authToken=.+(;|$)/.test(document.cookie);
};
