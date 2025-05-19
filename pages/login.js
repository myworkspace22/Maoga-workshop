console.clear();

document.addEventListener("DOMContentLoaded", function() {
    // Only declare 'img' once!
    const img = document.getElementById("login-btn");

    img.addEventListener("click", function() {
        window.location.href = "terms.html";
    });
});