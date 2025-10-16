# AWS Amplify Integration - Complete

## Overview
Your MyShowz Movie Booking website has been successfully integrated with AWS Amplify Gen2 backend services!

## ✅ What's Been Connected

### 1. Sign In Page (`sign_in.html`)
**Backend Service:** AWS Cognito (via Amplify Auth)

**Features:**
- User registration with email/password
- Email verification
- User sign-in
- Session management
- Automatic redirect if already logged in

**Files Modified:**
- `sign_in.html` - Updated to use Amplify authentication
- `assets/js/sign-in-amplify.js` - New authentication handler
- `assets/js/auth.js` - Authentication helper functions

**How It Works:**
1. User fills in the sign-up form
2. Amplify creates account in AWS Cognito
3. User receives verification email
4. After verification, user can sign in
5. Session is maintained across pages

---

### 2. Contact Us Page (`Contact_Us.html`)
**Backend Service:** AWS AppSync GraphQL API + DynamoDB (via Amplify Data)

**Features:**
- Contact form submissions saved to DynamoDB
- Real-time data storage
- Guest access (no login required to submit)
- Form validation
- Success/error feedback

**Files Modified:**
- `Contact_Us.html` - Updated to use Amplify Data API
- `assets/js/contact-us-amplify.js` - New form handler
- `amplify/data/resource.ts` - Data model definition

**Data Schema:**
```typescript
ContactMessage {
  id: string (auto-generated)
  firstName: string (required)
  lastName: string (required)
  email: string (required)
  phoneNumber: string (optional)
  message: string (required)
  status: string (default: 'new')
  createdAt: datetime
}
```

**How It Works:**
1. User fills in contact form (first name, last name, email, phone, message)
2. JavaScript validates the form
3. Data is sent to AWS AppSync GraphQL API
4. AppSync saves to DynamoDB table
5. User receives confirmation message

---

## 🏗️ Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AWS Amplify Gen2                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐         ┌─────────────────────┐     │
│  │   AWS Cognito    │         │   AWS AppSync       │     │
│  │   User Pool      │         │   GraphQL API       │     │
│  │                  │         │                     │     │
│  │  - User Auth     │         │  - Contact API      │     │
│  │  - Email Verify  │         │  - CRUD Operations  │     │
│  └──────────────────┘         └─────────────────────┘     │
│           │                             │                  │
│           │                             │                  │
│           ▼                             ▼                  │
│  ┌──────────────────┐         ┌─────────────────────┐     │
│  │   sign_in.html   │         │  Contact_Us.html    │     │
│  └──────────────────┘         │  + DynamoDB Table   │     │
│                                └─────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Next Steps to Deploy

### 1. Start the Amplify Sandbox (Required First Step)

This will deploy your backend to AWS:

```powershell
npm run dev
```

This command will:
- Create AWS resources (Cognito User Pool, AppSync API, DynamoDB table)
- Generate `amplify_outputs.json` with configuration
- Watch for changes and auto-deploy

**Keep this running while developing!**

---

### 2. Test Locally

Once the sandbox is running:

1. **Open the website** in a browser (you can use a local server)
2. **Test Sign In Page:**
   - Try signing up with an email
   - Check your email for verification link
   - Sign in with credentials
   
3. **Test Contact Form:**
   - Fill out the contact form
   - Submit and verify success message
   - Check AWS Console → DynamoDB to see your data

---

### 3. View Your Data in AWS

**To view contact form submissions:**

1. Go to AWS Console → DynamoDB
2. Find table named like: `ContactMessage-<amplify-branch>-<id>`
3. Click "Explore table items"
4. See all submitted contact messages

**To view registered users:**

1. Go to AWS Console → Cognito
2. Find User Pool (named after your app)
3. Click "Users" tab
4. See all registered users

---

### 4. Deploy to Production

When ready to deploy:

```powershell
# Option 1: Deploy to Amplify Hosting
# 1. Push your code to GitHub
# 2. Connect repo in AWS Amplify Console
# 3. Auto-deploy on every push

# Option 2: Use Amplify CLI deployment
npm run deploy
```

---

## 📊 Managing Contact Form Data

### Build an Admin Page (Optional)

You can create an admin page to view and manage contact messages:

```javascript
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

// List all messages
const { data: messages } = await client.models.ContactMessage.list();

// Update status to 'read'
await client.models.ContactMessage.update({
  id: message.id,
  status: 'read'
});

// Delete a message
await client.models.ContactMessage.delete({ id: message.id });
```

**Note:** Only authenticated users can read/update/delete messages!

---

## 🔐 Security Features

### Authentication
- Password requirements enforced
- Email verification required
- Secure session tokens
- HTTPS only in production

### Contact Form
- Input validation
- XSS protection
- Rate limiting (via AWS)
- Data encryption at rest

---

## 📁 File Structure

```
MyShowz-Movie-ticket-booking-website-main/
├── amplify/
│   ├── auth/
│   │   └── resource.ts          # Authentication config
│   ├── data/
│   │   └── resource.ts          # Contact form data model
│   ├── backend.ts               # Backend definition
│   └── tsconfig.json
├── assets/
│   └── js/
│       ├── amplify-config.js    # Amplify initialization
│       ├── auth.js              # Auth helpers
│       ├── sign-in-amplify.js   # Sign-in handler
│       └── contact-us-amplify.js # Contact form handler
├── sign_in.html                 # ✅ Connected to Amplify Auth
├── Contact_Us.html              # ✅ Connected to Amplify Data
├── package.json                 # Amplify dependencies
├── .gitignore                   # Amplify files ignored
├── AMPLIFY_SETUP.md            # Setup instructions
└── INTEGRATION_COMPLETE.md     # This file
```

---

## 🛠️ Troubleshooting

### Issue: "Amplify is not configured"
**Solution:** Run `npm run dev` to start the sandbox and generate config

### Issue: Sign up not working
**Solution:** Check AWS Console → Cognito → Email configuration

### Issue: Contact form not saving
**Solution:** 
1. Make sure sandbox is running
2. Check browser console for errors
3. Verify API permissions in `data/resource.ts`

### Issue: Module import errors
**Solution:** 
1. Ensure you're using a modern browser that supports ES modules
2. Serve the site through a local server (not file://)

---

## 📞 AWS Resources Created

When you run `npm run dev`, Amplify creates:

1. **Cognito User Pool** - Stores user accounts
2. **AppSync GraphQL API** - Handles data operations
3. **DynamoDB Table** - Stores contact messages
4. **IAM Roles** - Manages permissions
5. **CloudFormation Stack** - Infrastructure as code

All resources are tagged with your sandbox ID for easy cleanup.

---

## 🧹 Cleanup

To delete all AWS resources:

```powershell
npx ampx sandbox delete
```

This will remove all backend resources but keep your code intact.

---

## 📚 Learn More

- [Amplify Gen2 Docs](https://docs.amplify.aws/react/build-a-backend/)
- [Amplify Auth](https://docs.amplify.aws/react/build-a-backend/auth/)
- [Amplify Data](https://docs.amplify.aws/react/build-a-backend/data/)
- [AWS AppSync](https://docs.aws.amazon.com/appsync/)
- [Amazon Cognito](https://docs.aws.amazon.com/cognito/)

---

## ✨ Congratulations!

Your MyShowz application is now powered by AWS Amplify with:
- ✅ User authentication
- ✅ Contact form data storage
- ✅ Scalable cloud backend
- ✅ Production-ready infrastructure

Ready to build more features? Check out `AMPLIFY_SETUP.md` for advanced options!

