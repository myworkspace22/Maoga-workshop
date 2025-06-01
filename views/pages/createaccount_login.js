document.addEventListener("DOMContentLoaded", function () {
    
    // Vi finder knappen med id'et "login-user-btn" og gemmer den i en variabel
    const loginBtn = document.getElementById("login-user-btn");

    // Denne funktion forsøger at logge brugeren ind
    function loginUser() {
        // Vi henter værdien fra inputfelterne for brugernavn og kodeord
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Hvis et af felterne er tomme, viser vi en advarsel og stopper funktionen
        if (!username || !password) {
            alert("Indtast både brugernavn og kodeord.");
            return; // stopper her
        }

        // Vi sender en POST-anmodning til serveren med login-data
        fetch('/login', {
            method: 'POST', // HTTP-metoden vi bruger (POST = vi sender data)
            headers: {
                'Content-Type': 'application/json' // Vi fortæller serveren, at vi sender JSON-data
            },
            body: JSON.stringify({ username, password }) // Vi laver dataen om til en JSON string
        }).then(response => {
            // Hvis serveren svarer OK (statuskode 200), går vi videre til "profile.html"
            if (response.ok) {
                localStorage.setItem('loggedInUser', username); // Gem bruger-navnet lokalt til profil-siden
                window.location.href = "profile.html";
            } else {
                // Hvis login mislykkes (fx forkert kode), viser vi en fejlbesked
                alert("Forkert brugernavn eller kodeord.");
            }
        });
    }

    // Hvis login-knappen findes, sætter vi en event listener på den
    if (loginBtn) {
        loginBtn.addEventListener("click", loginUser); // Når knappen klikkes, kalder vi loginUser()
    }

    // Vi lytter også efter om brugeren trykker på Enter-tasten
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            loginUser(); // Hvis Enter trykkes, kalder vi også loginUser()
        }
    });
});
