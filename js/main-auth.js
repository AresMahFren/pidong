let currentUser = null;
try {
  currentUser = JSON.parse(sessionStorage.getItem("amtbench.user") || "null");
} catch {
  currentUser = null;
}

if (!currentUser?.name) {
  window.location.replace("index.html");
} else {
  const initials = currentUser.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
  document.getElementById("staff-name").textContent = currentUser.name;
  document.getElementById("staff-role").textContent = currentUser.role;
  document.querySelector(".avatar").textContent = initials;
  document.getElementById("top-login").textContent = initials;
  document.body.classList.remove("session-locked");

  const signOut = () => {
    sessionStorage.removeItem("amtbench.user");
    window.location.href = "index.html";
  };
  document.getElementById("login-button").addEventListener("click", signOut);
  document.getElementById("top-login").addEventListener("click", signOut);
}
