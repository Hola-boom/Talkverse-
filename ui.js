// Theme toggle 
const toggleThemeBtn = document.getElementById("toggle-theme"); toggleThemeBtn.addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light"); });

// Apply saved theme 
window.addEventListener("load", () => { const theme = localStorage.getItem("theme"); if (theme === "dark") { document.body.classList.add("dark"); } });

// Animation placeholder for chat transition 
function animateChatOpen() { 
  const chatWindow = document.getElementById("chat-window"); 
  chatWindow.classList.add("slide-in"); setTimeout(() => chatWindow.classList.remove("slide-in"), 500); }

