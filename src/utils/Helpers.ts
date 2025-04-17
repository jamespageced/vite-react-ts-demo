import { jwtDecode } from 'jwt-decode';

type AccessTokenPayload = {
  DNSDomainName: string;
  SAMAccountName: string;
  aio: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nbf: number;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
};

export function sleep(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getAccessTokenPayload = (token: string): AccessTokenPayload => {
  return jwtDecode(token);
};
