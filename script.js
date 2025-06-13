document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const responseMsg = document.getElementById("response");

  // Create loader
  const loader = document.createElement("div");
  loader.textContent = "Submitting...";
  loader.style.display = "none";
  loader.style.color = "#007bff";
  loader.style.fontWeight = "bold";
  form.appendChild(loader);

  document.addEventListener("DOMContentLoaded", () => {
  // ... your form code already here

  const toggleBtn = document.getElementById("toggle-btn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

  // Smooth scroll on submit
  function scrollToMessage() {
    responseMsg.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Form submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    loader.style.display = "block";
    responseMsg.textContent = "";

    const formData = new FormData(form);

    fetch("https://sheetdb.io/api/v1/3c6581vfdm1vi", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        loader.style.display = "none";
        responseMsg.style.color = "green";
        responseMsg.textContent = "🎉 Message sent successfully!";
        form.reset();
        scrollToMessage();
      })
      .catch(err => {
        loader.style.display = "none";
        responseMsg.style.color = "red";
        responseMsg.textContent = "❌ Submission failed. Please try again.";
        scrollToMessage();
        console.error(err);
      });
  });

  // Input interaction
  form.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("focus", () => {
      field.style.borderColor = "#007bff";
    });
    field.addEventListener("blur", () => {
      field.style.borderColor = "#ccc";
    });
  });
});
