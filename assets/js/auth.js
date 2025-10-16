import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

/**
 * Sign up a new user
 */
export async function handleSignUp(email, password) {
  try {
    const { userId } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email
        }
      }
    });
    console.log('Sign up success', userId);
    return { success: true, userId };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign in an existing user
 */
export async function handleSignIn(email, password) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password: password
    });
    console.log('Sign in success', isSignedIn);
    return { success: true, isSignedIn, nextStep };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sign out the current user
 */
export async function handleSignOut() {
  try {
    await signOut();
    console.log('Sign out success');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get the current authenticated user
 */
export async function checkAuthStatus() {
  try {
    const user = await getCurrentUser();
    console.log('Current user:', user);
    return { authenticated: true, user };
  } catch (error) {
    console.log('No authenticated user');
    return { authenticated: false };
  }
}

/**
 * Get the current session
 */
export async function getSession() {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}

