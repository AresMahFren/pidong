// Temporary front-end demo account; use server-backed authentication for real deployment.
const DEMO_ACCOUNT = Object.freeze({ name: "Denise Simbajon", password: "12345" });
const DEMO_STUDENT = Object.freeze({ name: "Reil Telmo", password: "12345", studentId: "Reil Telmo" });
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const roleSelect = document.getElementById("account-role");
const studentHint = document.getElementById("student-login-hint");
const demoCaption = document.getElementById("demo-caption");
const passwordInput = document.getElementById("password-input");
const passwordToggle = document.getElementById("toggle-password");

passwordToggle.addEventListener("click", () => {
  const reveal = passwordInput.type === "password";
  passwordInput.type = reveal ? "text" : "password";
  passwordToggle.textContent = reveal ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-label", `${reveal ? "Hide" : "Show"} password`);
  passwordToggle.setAttribute("aria-pressed", String(reveal));
});

roleSelect.addEventListener("change", () => {
  const isStudent = roleSelect.value === "Student";
  studentHint.hidden = !isStudent;
  demoCaption.hidden = isStudent;
  loginForm.elements.name.value = isStudent ? "" : DEMO_ACCOUNT.name;
  loginForm.elements.name.placeholder = isStudent ? "Full name or student ID" : "Account name";
  loginForm.elements.password.value = "";
  loginForm.elements.name.autocomplete = isStudent ? "name" : "username";
  loginError.textContent = "";
});

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(loginForm);
  const name = form.get("name").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  const password = form.get("password").trim();

  const role = form.get("role").trim();
  const student = role === "Student";
  const expectedName = (student ? DEMO_STUDENT.name : DEMO_ACCOUNT.name).toLocaleLowerCase();
  const expectedPassword = student ? DEMO_STUDENT.password : DEMO_ACCOUNT.password;
  if (name !== expectedName || password !== expectedPassword) {
      loginError.textContent = "Account name or password is incorrect.";
      return;
    }

  try {
    const user = student
      ? { name: DEMO_STUDENT.name, role, studentId: DEMO_STUDENT.studentId }
      : { name: DEMO_ACCOUNT.name, role };
    if (student) localStorage.setItem("amtbench.student", JSON.stringify(user));
    else sessionStorage.setItem("amtbench.user", JSON.stringify(user));
  } catch {
    loginError.textContent = "The sign-in session could not be saved. Please open the site in a regular browser window.";
    return;
  }

  if (student) {
    const tab = window.open("student.html", "_blank");
    if (!tab) window.location.href = "student.html";
  } else {
    window.location.href = "main.html";
  }
});
