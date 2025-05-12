document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('create-user-btn');

  button.addEventListener('click', () => {
    console.error("prut");
    // Create user
    const user = {
      username: 'Pernille',
      profile_picture_url: 'https://i.pinimg.com/736x/06/98/be/0698bea1d9a09764e8db94f1dab3f7f5.jpg',
      bio: "Hey I’m Pernille 👋 I just looooove playing Tetris. Who doesn’t am I right? RødGrødMedFløde 🇩🇰"
    };

    fetch('http://localhost:3000/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('✅ User created:', data);
      // Redirect after user is created
      window.location.href = 'terms.html';
    })
    .catch(err => {
      console.error('❌ Failed to create user:', err);
    });
  });
});