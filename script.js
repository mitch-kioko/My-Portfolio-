// 1. SELECT HTML ELEMENTS

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const moreAboutButton = document.getElementById("more-about-btn");
const moreAboutText = document.getElementById("more-about-text");

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("char-count");
const formFeedback = document.getElementById("form-feedback");

const yearSpan = document.getElementById("year");


// 2. MOBILE NAVIGATION MENU

// Opens or closes the menu and keeps the button in sync
function setMenu(open) {

    navLinks.classList.toggle("show-menu", open);

    menuToggle.setAttribute("aria-expanded", String(open));

    menuToggle.textContent = open ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
    );

}

// Only set up the menu if its elements exist on the page
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        setMenu(!navLinks.classList.contains("show-menu"));

    });

    // Close the mobile menu after clicking a navigation link
    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            setMenu(false);

        });

    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            setMenu(false);

        }

    });

    // Reset the menu when the window grows past the mobile breakpoint (600px, same as the CSS)
    window.addEventListener("resize", function () {

        if (window.innerWidth > 600) {

            setMenu(false);

        }

    });

}


// ABOUT ME

// Shows or hides the extra About text and updates the button label
function toggleAbout() {

    if (moreAboutText.hidden) {

        moreAboutText.hidden = false;
        moreAboutButton.textContent = "Show Less";
        moreAboutButton.setAttribute("aria-expanded", "true");

    } else {

        moreAboutText.hidden = true;
        moreAboutButton.textContent = "Learn More About Me";
        moreAboutButton.setAttribute("aria-expanded", "false");

    }

}

if (moreAboutButton && moreAboutText) {

    moreAboutButton.addEventListener("click", toggleAbout);

}


// 4. CONTACT FORM VALIDATION

// Shows (or clears) the error under one field and colours its border
function setFieldError(input, message) {

    const errorElement = document.getElementById(input.id + "-error");

    errorElement.textContent = message;

    input.classList.toggle("invalid", message !== "");
    input.classList.toggle("valid", message === "");

}

// Validator returns true when the field is fine, false when it is not
function validateName() {

    const value = nameInput.value.trim();

    if (value === "") {

        setFieldError(nameInput, "Please enter your name.");
        return false;

    }

    if (value.length < 2) {

        setFieldError(nameInput, "Name must be at least 2 characters.");
        return false;

    }

    setFieldError(nameInput, "");
    return true;

}

function validateEmail() {

    const value = emailInput.value.trim();

    // Basic email format: something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {

        setFieldError(emailInput, "Please enter your email address.");
        return false;

    }

    if (!emailPattern.test(value)) {

        setFieldError(emailInput, "Please enter a valid email address.");
        return false;

    }

    setFieldError(emailInput, "");
    return true;

}

function validateMessage() {

    const value = messageInput.value.trim();

    if (value === "") {

        setFieldError(messageInput, "Please enter a message.");
        return false;

    }

    if (value.length < 10) {

        setFieldError(messageInput, "Message must be at least 10 characters.");
        return false;

    }

    setFieldError(messageInput, "");
    return true;

}

if (contactForm) {

    // Check each field as soon as the user leaves it
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);

    // Live character counter for the message box
    messageInput.addEventListener("input", function () {

        charCount.textContent = messageInput.value.length + "/300";

    });

    contactForm.addEventListener("submit", function (event) {

        // Prevent the form from refreshing the page
        event.preventDefault();

        // Run all three checks so every problem is shown at once
        const nameOk = validateName();
        const emailOk = validateEmail();
        const messageOk = validateMessage();

        if (!nameOk || !emailOk || !messageOk) {

            formFeedback.textContent = "Please fix the errors above and try again.";
            formFeedback.className = "error-message";

            return;

        }

        // Display a success message
        formFeedback.textContent =
            "Thank you, " + nameInput.value.trim() + "! Your message has passed validation.";

        formFeedback.className = "success-message";

        // Clear the form and its colours after successful validation
        contactForm.reset();
        charCount.textContent = "0/300";

        nameInput.classList.remove("valid", "invalid");
        emailInput.classList.remove("valid", "invalid");
        messageInput.classList.remove("valid", "invalid");

    });

}


// 5. FOOTER YEAR

if (yearSpan) {

    yearSpan.textContent = new Date().getFullYear();

}