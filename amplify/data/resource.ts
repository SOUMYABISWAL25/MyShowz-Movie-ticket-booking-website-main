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
      allow.authenticated('userPools').to(['read', 'update', 'delete']), // Authenticated users can manage
    ]),
  TicketBooking: a
    .model({
      movie: a.string().required(),
      userEmail: a.email().required(),
      seats: a.string().required(),
      price: a.float().required(),
      bookingTime: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner('userEmail').to(['create', 'read', 'update', 'delete']),
      allow.groups(['admin']).to(['read', 'update', 'delete']),
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
