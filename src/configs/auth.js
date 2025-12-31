export default {
  meEndpoint: '/user/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken,
  // refreshTokenEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
};
