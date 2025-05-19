console.clear();

document.addEventListener("DOMContentLoaded", function() {
    // Only declare 'img' once!
    const img = document.getElementById("accept-terms-btn");

    img.addEventListener("click", function() {
        window.location.href = "createaccount.html";
    });
});