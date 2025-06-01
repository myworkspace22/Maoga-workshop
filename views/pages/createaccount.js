document.addEventListener("DOMContentLoaded", function() { // Vi venter på at DOM er fuldt loadet. Så laver vi en funktion
    // Handle create account button
    const createBtn = document.getElementById("create-user-btn");
    // Vi laver en konstant kaldet "createBtn" som knyttet op på en dims kaldet "create-user-btn"
    if (createBtn) { // Hvis knappen eksisterer
        createBtn.addEventListener("click", function() { // Så giver vi den en even listener
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Vi sætter en konstant, som leder efter elementet username/password

            fetch('/api', { // Vi opretter profilen
                method: 'post', // vi kalder vi på metoden POST
                headers: { // leder efter headers ved navn  : 'Content-Type' og 'application/json'
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // vi laver body om til en JSON string 
                    username: username, // body
                    password: password // body
                })
            }).then(response => { // Error handler
                if (response.ok) { // Hvis ikke der er problemer går vi videre
                    window.location.href = "profile.html"; // destination hvis ingen fejl
                } else { // hvis fejl
                    alert("Account creation failed."); // får følgende error
                }
            });
        });
    }
    
});