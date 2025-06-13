document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const response = document.getElementById("response");
  const toggleBtn = document.getElementById("toggle-btn");
  const progressBar = document.getElementById("progress-bar");

  // Scroll progress
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / height) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });

  // Theme toggle
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    toggleBtn.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    response.textContent = "Sending...";

    fetch("https://sheetdb.io/api/v1/3c6581vfdm1vi", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        response.textContent = "✅ Message sent successfully!";
        form.reset();
      })
      .catch(err => {
        console.error(err);
        response.textContent = "❌ Submission failed. Try again.";
      });
  });
});
