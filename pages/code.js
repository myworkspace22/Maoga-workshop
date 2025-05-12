console.clear();

document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("startpageImg");
  
    // Attach a click event to the image
    img.addEventListener("click", function() {
      // Redirect to the desired page
      window.location.href = "login.html";
    });
  });

  function handleImageUpload(inputId, imageId) {
    const input = document.getElementById(inputId);
    const image = document.getElementById(imageId);

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          image.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  handleImageUpload("uploadProfileImage", "profileImage");
  handleImageUpload("uploadBannerImage", "bannerImage");

  const bio = document.querySelector('.bio');

  document.addEventListener('click', function (event) {
    if (!bio.contains(event.target)) {
      bio.blur();
    }
  });