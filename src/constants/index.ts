export const saltOrRounds = 10;

export const BASE_URL_API = 'api/v1'

export const roles = [
  {
    name: 'ADMIN',
    type: 0,
  },
  {
    name: 'BASE',
    type: 1,
  },
  {
    name: 'COMPANY',
    type: 2,
  },
];

export const jwtSecret = process.env.JWT_SECRET;
