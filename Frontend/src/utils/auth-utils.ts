import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from 'ordercloud-javascript-sdk';
import { NextApiRequest } from 'next';
import { AUTH_TOKEN, REFRESH_TOKEN } from 'src/config';

export const setToken = (accessToken: string, refreshToken?: string) => {
  Cookies.set(AUTH_TOKEN, accessToken);
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN, refreshToken);
  }
};

export const getAccessToken = () => Cookies.get(AUTH_TOKEN);

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);

export const getTokens = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
});

export const clearTokens = () => {
  Cookies.remove(AUTH_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

export const parseJwt = (token: string): DecodedToken => jwtDecode<DecodedToken>(token);

export function isTokenExpired(token?: string): boolean {
  if (token) {
    const decodedToken = parseJwt(token);
    const currentSeconds = Date.now() / 1000;
    const currentSecondsWithBuffer = currentSeconds - 10;
    return decodedToken.exp < currentSecondsWithBuffer;
  }

  return true;
}

export const getTokenFromHeaders = (req: NextApiRequest) =>
  req.headers.authorization?.replace('Bearer ', '');
