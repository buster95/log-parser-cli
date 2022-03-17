export const expectedOutputLogLevelError = [
  {
    err: 'Not found',
    logLevel: 'error',
    timestamp: 1628475171259,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
];

export const expectedOutputLogLevelDebug = [
  {
    additionalInfo: {
      details: 'About to request the user information',
      userId: 10,
    },
    logLevel: 'debug',
    timestamp: 1628475171254,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
  {
    additionalInfo: {
      details: 'About to request user orders list',
      userId: 10,
    },
    logLevel: 'debug',
    timestamp: 1628475171254,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
  {
    additionalInfo: {
      details: 'About to request the user information',
      userId: 16,
    },
    logLevel: 'debug',
    timestamp: 1628475171257,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
  {
    additionalInfo: {
      details: 'User information is gathered',
      user: { id: 10, name: 'Alice' },
    },
    logLevel: 'debug',
    timestamp: 1628475171257,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
  {
    additionalInfo: {
      details: 'About to request user orders list',
      userId: 16,
    },
    logLevel: 'debug',
    timestamp: 1628475171258,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
  {
    additionalInfo: {
      details: 'User information is retrieved',
      user: { id: 16, name: 'Michael' },
    },
    logLevel: 'debug',
    timestamp: 1628475171259,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
  {
    additionalInfo: {
      details: 'User information is retrieved',
      user: {
        id: 16,
        orders: [{ id: 472, items: { id: 7, price: 7.12 } }],
      },
    },
    logLevel: 'debug',
    timestamp: 1628475171262,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
];

export const expectedOutputLogWarn = [
  {
    additionalInfo: {
      code: 404,
      details: 'Service finished with error',
      err: 'Cannot find user orders list',
    },
    logLevel: 'warn',
    timestamp: 1628475171264,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
];

export const expectedOutputLogInfo = [
  {
    additionalInfo: { details: 'Service is started' },
    logLevel: 'info',
    timestamp: 2354321571253,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  },
  {
    additionalInfo: { details: 'Service is started' },
    logLevel: 'info',
    timestamp: 1628475171255,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
  {
    additionalInfo: { details: 'Service is successfully finished' },
    logLevel: 'info',
    timestamp: 1628475171265,
    transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
  },
];
