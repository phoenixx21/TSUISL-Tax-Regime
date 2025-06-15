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
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password }),
        });

        if (response.ok) {
            const data = await response.json(); // Assuming your backend sends back user info
            alert("Logged in successfully!");

            // Save the username in localStorage
            localStorage.setItem("userName", data.userName);

            // Redirect to the dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error logging in. Please try again.");
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
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, userName, email, contactNo, password }),
        });

        if (response.ok) {
            alert("User created successfully!");
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
          alert("Password reset link sent (backend integration needed)");
      } else {
          alert("Please provide either email or contact number.");
      }
  });
});
