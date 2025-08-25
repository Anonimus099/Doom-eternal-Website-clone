document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("signinEmail");
  const passwordInput = document.getElementById("signinPassword");
  const errorBox = document.getElementById("signinError");

  function setError(message) {
    if (errorBox) errorBox.textContent = message || "";
  }

  function readUsers() {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
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

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setError("");

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const users = readUsers();
    const user = users[email];
    if (!user) {
      setError("Пользователь не найден.");
      return;
    }

    const passwordHash = await hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      setError("Неверный пароль.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: user.email,
        username: user.username,
        signedInAt: Date.now(),
      })
    );
    window.location.href = "./DOOM.html";
  });
});
