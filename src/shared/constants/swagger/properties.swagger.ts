export const SWAGGER_PROPERTIES = {
  USER: {
    DEVICE_ID: {
      name: 'deviceId',
      description: 'Enter a deviceId. It has to be unique.',
      example:
        'f0uqBYgMnUGDgBNmyBTN7C:APA91bGgu4xahW8h0LqadEKnLdW2pRAp9AokzZKPzByArV7Qr6uRSXguZPy9KURA7Nk-WPcTryv7UwRhwkEtGvDQQah0iVPdIPboJGBrGr6-F5-uawH1VZ9LompM_095k45NrZhSsi3x',
      required: true,
    },
    FIAT_CURRENCY_ID: {
      name: 'fiatCurrencyId',
      description:
        'Enter a valid fiat currency id, select from fiat currency list.',
      example: 'f5eb8def-8732-4c4d-b7d0-ec63c7dfe14e',
      required: true,
    },
    DEVICE_TOKEN: {
      name: 'deviceToken',
      description: 'Enter a deviceToken. It has to be unique.',
      example: 'f0utGvDQQah0iVPdIPboJGBrGr6-F5-uawH1VZ9LompM_095k45NrZhSsi3x',
      required: true,
    },
    LOGIN_TYPE: {
      name: 'loginType',
      description: 'Enter a value => IOS or ANDROID',
      example: 'IOS',
      required: true,
    },
    LANGUSGE_ID: {
      name: 'languageId',
      description: 'Enter a valid language UUID.',
      example: '8f971599-2c0d-420d-a684-38a722cd437d',
      required: false,
    },
    FIAT_CURRENCY: {
      name: 'fiatCurrency',
      description: 'Enter a valid language.',
      example: 'IND',
      required: false,
    },
  },
};
