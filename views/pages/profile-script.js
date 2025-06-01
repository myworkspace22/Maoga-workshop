document.addEventListener("DOMContentLoaded", function () {
    // Hent brugernavnet fra localStorage
    const username = localStorage.getItem('loggedInUser');
    console.log("Brugernavn fundet:", username);

    // Hvis brugernavn findes, vis det
    if (username) {
        const welcomeEl = document.getElementById("profile-name");
        welcomeEl.innerHTML = `
        <span style="color:white;">${username}</span> 
        <span style="color:#7E7EE9;">@${username}1425</span>`;
    }
});