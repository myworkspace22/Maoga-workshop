console.clear();

document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("startpageImg");
  
    // Attach a click event to the image
    img.addEventListener("click", function() {
      // Redirect to the desired page
      window.location.href = "login.html";
    });
  });
