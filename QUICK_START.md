# Quick Start Guide

## 🎯 What's Connected to AWS Amplify?

### ✅ Sign In Page (`sign_in.html`)
- **Service:** AWS Cognito Authentication
- **Features:** User registration, login, email verification
- **Status:** Ready to use

### ✅ Contact Us Page (`Contact_Us.html`)
- **Service:** AWS AppSync + DynamoDB
- **Features:** Form submissions stored in cloud database
- **Status:** Ready to use

---

## 🚀 Start Using It (3 Steps)

### Step 1: Configure AWS (One-time setup)
```powershell
aws configure
```
Enter your AWS credentials when prompted.

### Step 2: Start Amplify Sandbox
```powershell
npm run dev
```
This creates your backend in AWS. **Keep this running!**

### Step 3: Test Your Site
Open your website in a browser and test:
- Sign up on the sign-in page
- Submit the contact form

---

## 📋 Command Cheat Sheet

```powershell
# Start development (creates AWS resources)
npm run dev

# Install dependencies (if needed)
npm install

# Deploy to production
npm run deploy

# Delete AWS resources
npx ampx sandbox delete
```

---

## 🔍 Check Your Data

### View Contact Form Submissions
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **DynamoDB**
3. Find table: `ContactMessage-...`
4. View items

### View Registered Users
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **Cognito**
3. Click your User Pool
4. View Users tab

---

## ⚠️ Important Notes

- **Always run** `npm run dev` before testing
- The sandbox generates `amplify_outputs.json` (don't commit this)
- Use a **local server** to test (not file://)
- Modern browser required (Chrome, Firefox, Edge)

---

## 🆘 Need Help?

- Full setup guide: `AMPLIFY_SETUP.md`
- Integration details: `INTEGRATION_COMPLETE.md`
- Troubleshooting in both files above

---

## 🎉 You're All Set!

Your movie booking site now has:
- ✅ Cloud-based user authentication
- ✅ Persistent data storage
- ✅ Scalable backend infrastructure

**Next:** Run `npm run dev` to start!

