import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs);

// Export Amplify instance for use in other modules
export { Amplify };

