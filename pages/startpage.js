console.clear();

document.addEventListener("DOMContentLoaded", function() {
    // Only declare 'img' once!
    const img = document.getElementById("startpageImg");

    img.addEventListener("click", function() {
        window.location.href = "login.html";
    });
});