// import { baseUrl } from "./constants";

export const register = (email, password, name, avatar) => {
  return new Promise((resolve, reject) => {
    if (email === "user@test.com") {
      resolve({
        email: email,
        password: password,
        name: name,
        avatar: avatar,
      });
    } else {
      reject(`Error: Registration failed :(`);
    }
  });
  // return fetch(`${baseUrl}/signup`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password, name, avatar }),
  // }).then(handleServerResponse);
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === "user@test.com") {
      resolve({
        email: email,
        password: password,
      });
    } else if (password !== "password") {
      reject(`Error: Invalid password :(`);
    } else {
      reject(`Error: Login failed :(`);
    }
  });
  // return fetch(`${baseUrl}/signin`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password }),
  // }).then(handleServerResponse);
};

export const checkTokenValidity = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "valid-token") {
      resolve({
        token: "valid-token",
      });
    } else if (token === "expired-token") {
      reject(`Error: Token expired :(`);
    } else {
      reject(`Error: Invalid token :(`);
    }
  });
  // const token = localStorage.getItem("jwt");
  // return fetch(`${baseUrl}/users/me`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${token}`,
  //   },
  // }).then(handleServerResponse);
};

export function updateUserProfile(_id, email, name, avatar, token) {
  return new Promise((resolve, reject) => {
    if (token === "valid-token") {
      resolve({
        _id: _id,
        email: email,
        name: name,
        avatar: avatar,
        token: token,
      });
    } else {
      reject(`Error: Something went wrong :(`);
    }
  });
  // return fetch(`${baseUrl}/users/me`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({ _id, email, name, avatar }),
  // }).then(handleServerResponse);
}

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
