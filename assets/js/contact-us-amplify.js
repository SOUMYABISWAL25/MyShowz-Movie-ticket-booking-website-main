import './amplify-config.js';
import { generateClient } from 'aws-amplify/data';

// Generate the Amplify Data client
const client = generateClient();

// Form animation functions
window.triggerAnim = function(fieldName) {
  const inputBox = document.getElementById(`${fieldName}-inputBox`);
  const line = document.getElementById(`${fieldName}-line`);
  
  if (inputBox) {
    inputBox.classList.add('focused');
  }
  if (line) {
    line.classList.add('active');
  }
};

// Handle form submission
const contactForm = document.querySelector('form[name="contact-us-form"]');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const firstName = contactForm.querySelector('input[name="fname"]').value.trim();
    const lastName = contactForm.querySelector('input[name="lname"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const phoneNumber = contactForm.querySelector('input[name="m-num"]').value.trim();
    const message = contactForm.querySelector('textarea[name="msg"]').value.trim();
    
    // Validation
    if (!firstName) {
      alert('Please enter your first name');
      return;
    }
    
    if (!lastName) {
      alert('Please enter your last name');
      return;
    }
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (!message) {
      alert('Please enter your message');
      return;
    }
    
    try {
      // Show loading state
      const submitButton = contactForm.querySelector('.submitbtn');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Create contact message in Amplify backend
      const response = await client.models.ContactMessage.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber || null,
        message: message,
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      
      if (response.data) {
        // Success
        alert('Thank you for contacting us! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Remove focused states
        document.querySelectorAll('.inputBox.focused').forEach(box => {
          box.classList.remove('focused');
        });
        document.querySelectorAll('.line.active').forEach(line => {
          line.classList.remove('active');
        });
      } else if (response.errors) {
        console.error('Error submitting form:', response.errors);
        alert('There was an error submitting your message. Please try again.');
      }
      
      // Restore button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again later.');
      
      // Restore button state
      const submitButton = contactForm.querySelector('.submitbtn');
      submitButton.textContent = 'Submit';
      submitButton.disabled = false;
    }
  });
}

// Handle input blur events to remove animation
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('blur', function() {
    if (!this.value) {
      const inputBox = this.closest('.inputBox');
      if (inputBox) {
        inputBox.classList.remove('focused');
        const line = inputBox.querySelector('.line');
        if (line) {
          line.classList.remove('active');
        }
      }
    }
  });
});

