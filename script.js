// 1. SELECT HTML ELEMENTS

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const moreAboutButton = document.getElementById("more-about-btn");
const moreAboutText = document.getElementById("more-about-text");

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");


// 2. MOBILE NAVIGATION MENU

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show-menu");

    const menuIsOpen = navLinks.classList.contains("show-menu");

    menuToggle.setAttribute("aria-expanded", menuIsOpen);

    menuToggle.textContent = menuIsOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// Close the mobile menu after clicking a navigation link

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show-menu");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});


// 3. DYNAMIC ABOUT-ME CONTENT

moreAboutButton.addEventListener("click", function () {

    if (moreAboutText.hidden) {

        moreAboutText.hidden = false;
        moreAboutButton.textContent = "Show Less";

    } else {

        moreAboutText.hidden = true;
        moreAboutButton.textContent = "Learn More About Me";

    }

});


// 4. CONTACT FORM VALIDATION

contactForm.addEventListener("submit", function (event) {

    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get the values entered by the user
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check whether any field is empty
    if (name === "" || email === "" || message === "") {

        formFeedback.textContent = "Please fill in all fields.";
        formFeedback.className = "error-message";

        return;

    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formFeedback.textContent = "Please enter a valid email address.";
        formFeedback.className = "error-message";

        return;

    }

    // Display a success message
    formFeedback.textContent =
        "Thank you, " + name + "! Your form has passed validation.";

    formFeedback.className = "success-message";

    // Clear the form after successful validation
    contactForm.reset();

});
