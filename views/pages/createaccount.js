const database = require ('db.db3')
const sqlite3 = require ('sqlite3')


document.addEventListener('DOMContentLoaded', () =>  {
  const express = require('express')
  const button = document.getElementById('create-user-btn');

  button.addEventListener('click', async () => {
    // Get user input from the form fields



    express.application.post('/api', (req, res)=>{
      const username = document.getElementById('username').value; // Hent brgernavn fra input feltet i html
      const password = document.getElementById('password').value; // Hent password fra input feltet i html
    })  

    // Validate input fields
    if (!username || !password) {
      console.error('Please fill in both email and password fields.');
      alert('Please fill in both email and password fields.'); // Display alert to user
      return; // Exit the function if validation fails
    }

    if (error) {
      console.error('Failed to create user:', error.message);
      alert('Failed to create user: ' + error.message); // Display error message to user
    } else {
      console.log('User created:', user);
      // Redirect to profile customization page
      window.location.href = 'profile-customization.html';
    }
  });
});
