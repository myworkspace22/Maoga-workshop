document.addEventListener("DOMContentLoaded", function() {
    // Handle create account button
    const createBtn = document.getElementById("create-user-btn");
    if (createBtn) {
        createBtn.addEventListener("click", function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/api', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(response => { // lambda funktion
                if (response.ok) {
                    window.location.href = "profile.html";
                } else {
                    alert("Account creation failed.");
                }
            });
        });
    }

    // Handle login button (if needed)
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function() {
            window.location.href = "profile.html";
        });
    }
});