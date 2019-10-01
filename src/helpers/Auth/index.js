import axios from 'axios';

const identity = axios.create({
  baseURL: 'https://peach.netlify.com/.netlify/identity',
});

const login = async (email, password) => {
  return identity({
    method: 'POST',
    url: '/token',
    data: `grant_type=password&username=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export default {
  login,
};
