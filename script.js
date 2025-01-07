document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a[data-page]");
    const content = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");

            content.innerHTML = "<p>Loading</p>";
            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No response");
                    }
                    return response.text();
                })
                .then(html => {
                    content.innerHTML = html;
                    if (page.includes("pages/AboutMe.html")) {
                        updateAboutMePage();
                    }
                    if (page.includes("pages/Contact.html")) {
                        // Event listener for the submit button to check validation.
                        document.getElementById("submitButton").addEventListener("click", function(event) {
                            const captcha = document.getElementById("contactCaptcha").value;
                            if (captcha !== "5"){
                                event.preventDefault();
                                alert("Please solve the captcha to submit the form.");
                            }
                        });
                    } else if (!page.includes("pages/Contact.html")){
                        // to avoid multiple event listeners (does it even do that though?)
                        const submitListener = document.getElementById("submitButton");
                        if (submitListener) {
                            submitListener.removeEventListener("click", function(event){});
                        }
                    }
                })
                .catch(error => {
                    console.error("Error loading page:", error);
                    content.innerHTML = "<p>Failed to load content.</p>";
                });
        });
    });
});

function updateAboutMePage() {
    // Chooses a name, and calculates age from birthday.
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
    const nameArray = ["Daniel", "Nunya Bizness", "Why do you ask?"];
    name.textContent = nameArray[Math.floor(Math.random() * nameArray.length)];
    age.textContent = ageValue;
}

// Function to toggle the text body of the experience page.
function toggleBody(id) {
    var body = document.getElementById(id);
    body.style.display = body.style.display === "none" ? "block" : "none";
}

function toggleInterest(id) {
    const validIds = ["gamingCard", "bakingCard", "teaCard", "3dCard"];
    if (!validIds.includes(id)) {
        console.warn("Invalid ID:", id);
        return;
    }
    var body = document.getElementById(id);
    validIds.forEach(validId => {
        const element = document.getElementById(validId);
        if (validId === id) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}