document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const signinForm = document.getElementById("signinForm");
  const tabSignUp = document.getElementById("tabSignUp");
  const tabSignIn = document.getElementById("tabSignIn");
  const sectionSignUp = document.getElementById("sectionSignUp");
  const sectionSignIn = document.getElementById("sectionSignIn");
  const emailInput = document.getElementById("signupEmail");
  const usernameInput = document.getElementById("signupUsername");
  const passwordInput = document.getElementById("signupPassword");
  const confirmInput = document.getElementById("signupConfirm");
  const errorBox = document.getElementById("signupError");

  if (!form) return;

  function setError(message) {
    if (errorBox) {
      errorBox.textContent = message || "";
    }
  }

  function readUsers() {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function writeUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function validateEmail(email) {
    return /.+@.+\..+/.test(email);
  }

  async function hashPassword(password) {
    if (window.crypto && window.crypto.subtle) {
      const enc = new TextEncoder();
      const data = enc.encode(password);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      const bytes = new Uint8Array(digest);
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    return btoa(unescape(encodeURIComponent(password)));
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setError("");

    const email = emailInput.value.trim().toLowerCase();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (!validateEmail(email)) {
      setError("Введите корректный email.");
      return;
    }
    if (username.length < 3) {
      setError("Имя пользователя должно быть от 3 символов.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть от 6 символов.");
      return;
    }
    if (password !== confirm) {
      setError("Пароли не совпадают.");
      return;
    }

    const users = readUsers();
    if (users[email]) {
      setError("Пользователь с таким email уже существует.");
      return;
    }

    const passwordHash = await hashPassword(password);
    users[email] = {
      email,
      username,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    writeUsers(users);

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email, username, signedInAt: Date.now() })
    );

    window.location.href = "./DOOM.html";
  });

  // Переключение вкладок
  function showSignUp() {
    sectionSignUp.classList.remove("hidden");
    sectionSignIn.classList.add("hidden");
    tabSignUp.classList.add("bg-zinc-800");
    tabSignUp.classList.remove("bg-zinc-900");
    tabSignIn.classList.add("bg-zinc-900");
    tabSignIn.classList.remove("bg-zinc-800");
  }
  function showSignIn() {
    sectionSignUp.classList.add("hidden");
    sectionSignIn.classList.remove("hidden");
    tabSignIn.classList.add("bg-zinc-800");
    tabSignIn.classList.remove("bg-zinc-900");
    tabSignUp.classList.add("bg-zinc-900");
    tabSignUp.classList.remove("bg-zinc-800");
  }
  if (tabSignUp && tabSignIn) {
    tabSignUp.addEventListener("click", showSignUp);
    tabSignIn.addEventListener("click", showSignIn);
  }

  // Логика входа
  if (signinForm) {
    const inEmail = document.getElementById("signinEmail");
    const inPassword = document.getElementById("signinPassword");
    const inError = document.getElementById("signinError");
    function setInError(msg) {
      if (inError) inError.textContent = msg || "";
    }
    signinForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      setInError("");
      const email = inEmail.value.trim().toLowerCase();
      const pass = inPassword.value;
      const users = readUsers();
      const user = users[email];
      if (!user) {
        setInError("Пользователь не найден.");
        return;
      }
      const hash = await hashPassword(pass);
      if (hash !== user.passwordHash) {
        setInError("Неверный пароль.");
        return;
      }
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email, username: user.username, signedInAt: Date.now() })
      );
      window.location.href = "./DOOM.html";
    });
  }
});
