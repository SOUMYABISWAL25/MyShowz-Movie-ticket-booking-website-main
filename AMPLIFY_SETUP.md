# AWS Amplify Gen2 Setup Guide

This project has been configured to use AWS Amplify Gen2 for backend services including authentication and hosting.

## Prerequisites

- Node.js 18.x or later
- AWS Account
- AWS CLI configured with your credentials
- npm or yarn package manager

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `aws-amplify` - Amplify JavaScript library
- `@aws-amplify/backend` - Amplify Gen2 backend
- `@aws-amplify/backend-cli` - Amplify CLI tools
- `typescript` - TypeScript compiler

### 2. Configure AWS Credentials

Make sure your AWS credentials are configured:

```bash
aws configure
```

Or set environment variables:
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
```

### 3. Start Amplify Sandbox (Development)

The sandbox creates a development environment in the cloud:

```bash
npm run dev
```

This will:
- Deploy your backend resources to AWS
- Generate `amplify_outputs.json` with your backend configuration
- Watch for changes and auto-deploy updates
- Provide you with authentication endpoints

### 4. Deploy to Production

For production deployment using Amplify Hosting:

1. **Create an Amplify App in AWS Console:**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Note your App ID

2. **Deploy using CLI:**
   ```bash
   npm run deploy
   ```

   Or set the APP_ID environment variable:
   ```bash
   export APP_ID=your_amplify_app_id
   npm run deploy
   ```

## Project Structure

```
├── amplify/
│   ├── auth/
│   │   └── resource.ts        # Authentication configuration
│   ├── backend.ts              # Main backend definition
│   └── tsconfig.json           # TypeScript config for backend
├── assets/
│   └── js/
│       ├── amplify-config.js   # Amplify initialization
│       ├── auth.js             # Authentication helpers
│       └── sign-in-amplify.js  # Sign-in page integration
├── amplify_outputs.json        # Generated config (git-ignored)
└── package.json
```

## Features Enabled

### Authentication
- Email/Password authentication
- User sign up with email verification
- User sign in
- Session management

### Data & API
- Contact form submissions stored in DynamoDB
- GraphQL API for data access
- Guest access for creating contact messages
- Authenticated access for managing messages

### Frontend Integration
The following files have been set up for Amplify integration:
- `assets/js/amplify-config.js` - Initializes Amplify
- `assets/js/auth.js` - Authentication helper functions
- `assets/js/sign-in-amplify.js` - Sign-in page with Amplify auth
- `assets/js/contact-us-amplify.js` - Contact form with Amplify Data API

## Using Authentication in Your App

### Import and Use Auth Functions

```javascript
import { handleSignIn, handleSignUp, handleSignOut, checkAuthStatus } from './assets/js/auth.js';

// Sign up a new user
const result = await handleSignUp('user@example.com', 'Password123!');

// Sign in
const signInResult = await handleSignIn('user@example.com', 'Password123!');

// Check if user is authenticated
const authStatus = await checkAuthStatus();

// Sign out
await handleSignOut();
```

## Using Contact Form Data

### Querying Contact Messages (Requires Authentication)

```javascript
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

// List all contact messages
const { data: messages } = await client.models.ContactMessage.list();

// Get a specific message
const { data: message } = await client.models.ContactMessage.get({ id: 'message-id' });

// Update message status
const { data: updated } = await client.models.ContactMessage.update({
  id: 'message-id',
  status: 'read'
});

// Delete a message
await client.models.ContactMessage.delete({ id: 'message-id' });
```

## Updating HTML Files to Use Amplify

To use the new Amplify authentication in your HTML files, add this script tag:

```html
<script type="module" src="assets/js/sign-in-amplify.js"></script>
```

Replace the old sign-in script with the Amplify version.

## Environment Files

The following files are git-ignored and generated automatically:
- `amplify_outputs.json` - Contains your backend configuration
- `.amplify/` - Local Amplify cache and state
- `node_modules/` - Dependencies

## Cleanup

To delete your sandbox environment:

```bash
npx ampx sandbox delete
```

## Additional Resources

- [Amplify Gen2 Documentation](https://docs.amplify.aws/react/build-a-backend/)
- [Amplify Authentication](https://docs.amplify.aws/react/build-a-backend/auth/)
- [Amplify Hosting](https://docs.amplify.aws/react/deploy-and-host/)

## Troubleshooting

### Issue: Module not found errors
**Solution:** Make sure to install dependencies with `npm install`

### Issue: AWS credentials not found
**Solution:** Configure AWS CLI with `aws configure` or set environment variables

### Issue: amplify_outputs.json not found
**Solution:** Run `npm run dev` to start the sandbox and generate the config file

### Issue: CORS errors
**Solution:** Make sure you're running the sandbox with `npm run dev` to get the correct API endpoints

