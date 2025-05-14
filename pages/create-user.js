// Import Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://bvwhbsfcaneqvcymopdu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2d2hic2ZjYW5lcXZjeW1vcGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDI0MTksImV4cCI6MjA2MjYxODQxOX0.dJipEwAYxXdKltgxScA_YbJhKgyELO8gnL1Jm5PFDY0';
const supabase = createClient(supabaseUrl, supabaseKey);


document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('create-user-btn');

  button.addEventListener('click', async () => {
    // Get user input from the form fields
    const email = document.getElementById('email').value; // Get email from input field
    const password = document.getElementById('password').value; // Get password from input field

    // Create user
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('❌ Failed to create user:', error.message);
    } else {
      console.log('✅ User created:', user);
      // Redirect to profile customization page
      window.location.href = 'profile-customization.html';
    }
  });
});