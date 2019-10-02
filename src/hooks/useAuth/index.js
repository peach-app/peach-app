import { useContext, useEffect } from 'react';
import axios from 'axios';
import useAxios, { configure } from 'axios-hooks';
import get from 'lodash/fp/get';

import AuthContext from '../../contexts/Auth';

const identity = axios.create({
  baseURL: 'https://peach.netlify.com/.netlify/identity',
});

configure({
  axios: identity,
});

export const useLogin = () => {
  const { setAuth } = useContext(AuthContext);

  const [response, execute] = useAxios(
    {
      method: 'POST',
      url: '/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    { manual: true }
  );

  useEffect(() => {
    if (get('data.access_token', response)) {
      setAuth(get('data.access_token', response));
    }
  }, [response.data]);

  const login = (email, password) => {
    execute({
      data: `grant_type=password&username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
    });
  };

  return [login, response];
};

export const useLogout = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [response, logout] = useAxios(
    {
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    if (response.response) {
      setAuth(null);
    }
  }, [response.response]);

  return [logout, response];
};
