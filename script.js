document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a[data-page]");
    const content = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");

            content.innerHTML = "<p>Loading...</p>";
            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then(html => {
                    content.innerHTML = html;
                    if (page.includes("pages/AboutMe.html")) {
                        updateAboutMePage();
                    }
                })
                .catch(error => {
                    console.error("Error loading page:", error);
                    content.innerHTML = "<p>Failed to load content. Please try again later.</p>";
                });
        });
    });
});

function updateAboutMePage() {
    // Dynamically populate the About Me page
    const name = document.getElementById("nameValue");
    const age = document.getElementById("ageValue");

    const bday = new Date("1992-02-22");
    const today = new Date();
    let ageValue = today.getFullYear() - bday.getFullYear();
    const isBirthdayPassed = 
        today.getMonth() > bday.getMonth() || 
        (today.getMonth() === bday.getMonth() && today.getDate() >= bday.getDate());

    if (!isBirthdayPassed) {
        ageValue--; // Adjust age if birthday has not yet occurred this year
    }
    const nameArray = ["Daniel Carlsen", "Nunya Bizness", "Why do you ask?"];
    name.textContent = nameArray[Math.floor(Math.random() * nameArray.length)];
    age.textContent = ageValue;
}