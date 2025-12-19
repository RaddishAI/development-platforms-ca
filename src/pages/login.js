import { supabase } from "../lib/supabase.js";

export function renderLogin() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main style="padding: 16px;">
      <nav style="margin-bottom: 12px;">
        <a href="#/">Home</a> |
        <a href="#/register">Register</a>
      </nav>

      <h1>Login</h1>

      <form id="login-form" style="max-width: 420px;">
        <label>
          Email<br />
          <input type="email" name="email" required style="width: 100%;" />
        </label>

        <br /><br />

        <label>
          Password<br />
          <input type="password" name="password" required style="width: 100%;" />
        </label>

        <br /><br />

        <button type="submit">Login</button>
        <p id="error" style="color: red; margin-top: 8px;"></p>
      </form>
    </main>
  `;

  const form = document.querySelector("#login-form");
  const errorEl = document.querySelector("#error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    window.location.hash = "#/";
  });
}
