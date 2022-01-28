import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any): void => {
  return cookies.set(name, value, { ...option });
}

export const getCookie = (name: string): string => {
  return cookies.get(name);
}

export const getRefreshToken = (): string => {
  return getCookie('Authorization');
}