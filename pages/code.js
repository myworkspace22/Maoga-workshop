console.clear();

document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("startpageImg");
    const createAccountBtn = document.getElementById("create-account-btn"); // Button for creating an account

    // Attach a click event to the image for login
    img.addEventListener("click", function() {
        // Redirect to the login page
        window.location.href = "login.html";
    });

    // Attach a click event to the create account button
    createAccountBtn.addEventListener("click", function() {
        // Redirect to the create account page
        window.location.href = "createaccount.html"; // Redirect to the create account page
    });

    // Handle image uploads
    async function handleImageUpload(inputId, imageId, updateField) {
        const input = document.getElementById(inputId);
        const image = document.getElementById(imageId);

        input.addEventListener("change", async function () {
            const file = this.files[0];
            if (file) {
                // Show image preview
                const previewURL = URL.createObjectURL(file);
                image.src = previewURL;

                const formData = new FormData();
                const userId = await getCurrentUserId(); // Function to dynamically get userId
                formData.append('userId', userId);
                formData.append('image', file);
                formData.append('field', updateField);

                try {
                    const response = await fetch('/upload-image', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    console.log(`✅ Uploaded ${updateField}:`, data);
                } catch (err) {
                    console.error(`❌ Upload failed for ${updateField}:`, err);
                }
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

    // Fetch user data
    async function fetchUserData(userId) {
        try {
            const response = await fetch(`/get-userdata/${userId}`, {
                method: "GET"
            });
            const json = await response.json();
            const image = document.getElementById("profileImage");
            image.src = json.imagePath;
            console.log(json);
        } catch (err) {
            console.error('❌ Failed to fetch user data:', err);
        }
    }

    // Call fetchUserData with the current user ID
    fetchUserData(1); // Replace with dynamic user ID as needed
});

// Function to get the current user ID (placeholder)
async function getCurrentUserId() {
    // Implement logic to retrieve the current user ID dynamically
    return 1; // Placeholder return value
}