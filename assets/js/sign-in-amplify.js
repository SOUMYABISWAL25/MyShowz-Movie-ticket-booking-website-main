import './amplify-config.js';
import { handleSignIn, handleSignUp, checkAuthStatus } from './auth.js';

// Toggle between sign in and sign up
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container_signup_signin');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Check authentication status on page load
window.addEventListener('DOMContentLoaded', async () => {
  const authStatus = await checkAuthStatus();
  if (authStatus.authenticated) {
    // User is already signed in, redirect to home
    window.location.href = 'index.html';
  }
});

// Handle Sign Up Form
const signUpForm = document.querySelector('form[name=\"sign-up-form\"]');
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = signUpForm.querySelector('input[name=\"sign-up-name\"]').value;
  const email = signUpForm.querySelector('input[name=\"sign-up-email\"]').value;
  const password = signUpForm.querySelector('input[name=\"sign-up-passwd\"]').value;
  
  if (!email || !password || !name) {
    alert('Please fill in all fields');
    return;
  }
  
  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }
  
  const result = await handleSignUp(email, password);
  
  if (result.success) {
    alert('Sign up successful! Please check your email to verify your account.');
    // Switch to sign in form
    container.classList.remove('right-panel-active');
  } else {
    alert('Sign up failed: ' + result.error);
  }
});

// Handle Sign In Form
const signInForm = document.querySelector('form[name=\"sign-in-form\"]');
signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = signInForm.querySelector('input[name=\"sign-in-email\"]').value;
  const password = signInForm.querySelector('input[name=\"sign-in-passwd\"]').value;
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  const result = await handleSignIn(email, password);
  
  if (result.success) {
    alert('Sign in successful!');
    // Redirect to home page
    window.location.href = 'index.html';
  } else {
    alert('Sign in failed: ' + result.error);
  }
});

