import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ContactMessage: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phoneNumber: a.string(),
      message: a.string().required(),
      status: a.string().default('new'), // new, read, resolved
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(['create']), // Allow anyone to submit
      allow.authenticated().to(['read', 'update', 'delete']), // Authenticated users can manage
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

