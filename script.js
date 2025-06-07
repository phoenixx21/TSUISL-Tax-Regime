document.addEventListener("DOMContentLoaded", () => {
    // Navigation between sections
    const loginSection = document.getElementById("login");
    const signupSection = document.getElementById("signup");
    const forgotPasswordSection = document.getElementById("forgot-password");
    const dashboardSection = document.getElementById("dashboard");

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            // Hide all sections
            [loginSection, signupSection, forgotPasswordSection, dashboardSection].forEach(section => {
                section.classList.add("hidden");
            });

            // Show the target section
            target.classList.remove("hidden");
        });
    });

    // Login form validation (simplified for demonstration)
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userId = document.getElementById("userId").value;
        const password = document.getElementById("password").value;

        if (userId === "admin" && password === "admin") {
            alert("Logged in successfully.");
            document.querySelector("a[href='#dashboard']").click();
        } else {
            alert("Invalid UserID or Password.");
        }
    });

    // Sign-up form validation
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password === confirmPassword && password.length >= 6) {
            alert("User created successfully (backend integration needed).");
        } else {
            alert("Passwords do not match or are less than 6 characters.");
        }
    });

    // Forgot password form submission
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    forgotPasswordForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("fpEmail").value;
        const contactNo = document.getElementById("fpContactNo").value;

        if (email || contactNo) {
            alert("Password reset link sent (backend integration needed).");
        } else {
            alert("Please provide either email or contact number.");
        }
    });

    // Dashboard section functionality
    const taxForm = document.getElementById("taxForm");
    taxForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Form submitted successfully.");
    });

    const checkbox1 = document.getElementById('confirm1');
    const checkbox2 = document.getElementById('confirm2');
    const submitBtn = document.getElementById('submitBtn');

    function validateCheckboxes() {
        submitBtn.disabled = !(checkbox1.checked && checkbox2.checked);
    }

    checkbox1.addEventListener('change', validateCheckboxes);
    checkbox2.addEventListener('change', validateCheckboxes);

    function openPDF(fileName) {
        window.open(fileName, '_blank');
    }

    window.openPDF = openPDF;

    const loggedInUser = localStorage.getItem("loggedInUsername") || "User";
    document.getElementById("username").textContent = loggedInUser;
});
