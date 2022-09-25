export const BASE_URL = 'https://anna-b.nomorepartiesxyz.ru';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Something went wrong');
    }
  });
}; 


export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => {
      if (response.status === 200) {
          return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .then((data) => {
        return data.token;
    });
  };
  
  export const userinfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
    })
    .then((response) => {
      if (response.status === 200) {
          return response.json()
            .then(data => data.data);
      } else {
          throw new Error('Something went wrong');
      }
    })
    .then((res) => {
        return res.data;
    });
  };
