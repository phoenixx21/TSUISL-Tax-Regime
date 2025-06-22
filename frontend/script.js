document.addEventListener("DOMContentLoaded", () => {
  // Navigation between sections
  const loginSection = document.getElementById("login");
  const signupSection = document.getElementById("signup");
  const forgotPasswordSection = document.getElementById("forgot-password");

  document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function(event) {
          event.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));

          // Hide all sections
          [loginSection, signupSection, forgotPasswordSection].forEach(section => {
              section.classList.add("hidden");
          });

          // Show the target section
          target.classList.remove("hidden");
      });
  });

  // Login form validation (simplified for demonstration)
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const keepLoggedIn = document.getElementById("keepLoggedIn").checked;

    try {
        const response = await fetch("https://tsuisl-tax-regime.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password }),
        });

        if (response.ok) {
            const data = await response.json(); // Backend returns user info
            // alert("Login successful!");

            // Store user data
            
                localStorage.setItem("userName", data.userName); // Persistently store username            

            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            const errorMessage = await response.text();
            alert("Login failed: " + errorMessage);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
});




  // Sign-up form validation
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = document.getElementById("signupUserId").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const contactNo = document.getElementById("contactNo").value;
    const password = document.getElementById("signupPassword").value;

    console.log("Sign-up form values:", { userId, userName, email, contactNo, password });


    try {
        const response = await fetch("https://tsuisl-tax-regime.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, userName, email, contactNo, password }),
        });

        if (response.ok) {
            // alert("User created successfully!");
            document.querySelector("a[href='#login']").click(); // Redirect to login
        } else {
            const errorMessage = await response.text();
            alert("Sign-up failed: " + errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Sign-up failed. Please try again.");
    }
});


  // Forgot password form submission
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  forgotPasswordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("fpEmail").value;
      const contactNo = document.getElementById("fpContactNo").value;

      if (email || contactNo) {
          alert("Password reset link sent");
      } else {
          alert("Please provide either email or contact number.");
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    // Prevent back navigation after logout
    history.pushState(null, null, location.href);
    window.onpopstate = () => {
        history.pushState(null, null, location.href); // Push the current state again
        // alert("You've been logged out!");
    };
});

