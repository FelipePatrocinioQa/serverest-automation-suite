export const JSON_HEADERS = {
  accept: 'application/json',
  'Content-Type': 'application/json'
};

export const authorizationHeaders = (authorization) => ({
  Authorization: authorization
});

export const bearerAuthorizationHeaders = (token) => ({
  Authorization: token ? `Bearer ${token}` : undefined
});