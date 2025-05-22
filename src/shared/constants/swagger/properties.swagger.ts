export const SWAGGER_PROPERTIES = {
  USER: {
    EMAIL: {
      name: 'email',
      description: 'User email address. Must be unique.',
      example: 'user@example.com',
      required: true,
    },
    PASSWORD: {
      name: 'password',
      description: 'User password (min 6 characters).',
      example: 'P@ssw0rd123',
      required: true,
    },
  },
};
