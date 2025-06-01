document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const uploadProfileImage = document.getElementById("uploadProfileImage");

    const bannerImage = document.getElementById("bannerImage");
    const uploadBannerImage = document.getElementById("uploadBannerImage");

    // Når brugeren vælger et nyt profilbillede
    uploadProfileImage.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file); // Laver billedet om til data-URL
        }
    });

    // Når brugeren vælger et nyt bannerbillede
    uploadBannerImage.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                bannerImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const username = localStorage.getItem('loggedInUser');

    if (username) {

        const nameDiv = document.getElementById('display-name');
        const tagDiv = document.getElementById('display-tag');

        // Sæt brugernavn og tag
        if (nameDiv) {
            nameDiv.textContent = username;
        }

        if (tagDiv) {
            tagDiv.textContent = `@${username}1425`;
        }
    }
});

function saveProfileChanges() {
    const username = document.getElementById('display-name').textContent;

    // Gem i localStorage
    localStorage.setItem('loggedInUser', username);
}