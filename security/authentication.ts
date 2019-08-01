import { LOCAL_STORAGE } from './consts';

export async function getToken() {
  return localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
}

export async function isLoggedIn() {
  return !!getToken();
}

export async function setToken(token: string) {
  await localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
}

export async function removeToken() {
  await localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
}

export function logout() {
  Object.keys(LOCAL_STORAGE).map((key) =>
    // @ts-ignore
    localStorage.removeItem(LOCAL_STORAGE[key]),
  );
}
