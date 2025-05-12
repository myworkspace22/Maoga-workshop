console.clear();

document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("startpageImg");
  
    // Attach a click event to the image
    img.addEventListener("click", function() {
      // Redirect to the desired page
      window.location.href = "login.html";
    });
  });

  function handleImageUpload(inputId, imageId, updateField) {
    const input = document.getElementById(inputId);
    const image = document.getElementById(imageId);
  
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        // Show image preview
        const previewURL = URL.createObjectURL(file);
        image.src = previewURL;
  
        const formData = new FormData();
        formData.append('userId', 1); // or dynamically set userId
        formData.append('image', file); // send the actual file
        formData.append('field', updateField); // tell backend what field to update
  
        fetch('http://localhost:3000/upload-image', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          console.log(`✅ Uploaded ${updateField}:`, data);
        })
        .catch(err => {
          console.error(`❌ Upload failed for ${updateField}:`, err);
        });
      }
    });
  }  

  handleImageUpload("uploadProfileImage", "profileImage", "profile_picture_url");
  handleImageUpload("uploadBannerImage", "bannerImage", "banner_url");  

  const bio = document.querySelector('.bio');

  document.addEventListener('click', function (event) {
    if (!bio.contains(event.target)) {
      bio.blur();
    }
  });