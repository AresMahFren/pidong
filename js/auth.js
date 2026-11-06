// Temporary front-end demo account; use server-backed authentication for real deployment.
const DEMO_ACCOUNT = Object.freeze({ name: "Luke Aton", password: "12345" });
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(loginForm);
  const name = form.get("name").trim();
  const password = form.get("password");

  if (name.toLowerCase() !== DEMO_ACCOUNT.name.toLowerCase() || password !== DEMO_ACCOUNT.password) {
    loginError.textContent = "Account name or password is incorrect.";
    return;
  }

  try {
    sessionStorage.setItem("amtbench.user", JSON.stringify({ name: DEMO_ACCOUNT.name, role: form.get("role") }));
  } catch {
    loginError.textContent = "The sign-in session could not be saved. Please open the site in a regular browser window.";
    return;
  }

  window.location.href = "main.html";
});
