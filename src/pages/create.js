import { supabase } from "../lib/supabase.js";
import { getCurrentUser } from "../lib/auth.js";

export async function renderCreate() {
  const user = getCurrentUser();

  if (!user) {
    window.location.hash = "#/login";
    return;
  }

  const app = document.querySelector("#app");

  app.innerHTML = `
    <main style="padding: 16px;">
      <nav style="margin-bottom: 12px;">
        <a href="#/">Home</a>
      </nav>

      <h1>Create article</h1>

      <form id="create-form" style="max-width: 600px;">
        <label>
          Title<br />
          <input type="text" name="title" required style="width: 100%;" />
        </label>

        <br /><br />

        <label>
          Category<br />
          <input type="text" name="category" required style="width: 100%;" />
        </label>

        <br /><br />

        <label>
          Body<br />
          <textarea name="body" required rows="8" style="width: 100%;"></textarea>
        </label>

        <br /><br />

        <button type="submit">Publish</button>
        <p id="error" style="color: red; margin-top: 8px;"></p>
        <p id="success" style="color: green; margin-top: 8px;"></p>
      </form>
    </main>
  `;

  const form = document.querySelector("#create-form");
  const errorEl = document.querySelector("#error");
  const successEl = document.querySelector("#success");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    successEl.textContent = "";

    const formData = new FormData(form);
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const body = String(formData.get("body") || "").trim();

    const { error } = await supabase.from("articles").insert([
      {
        title,
        category,
        body,
        submitted_by: user.id,
      },
    ]);

    if (error) {
      errorEl.textContent = error.message;
      return;
    }

    successEl.textContent = "Article published!";
    form.reset();

    // Go back to home after a short delay
    setTimeout(() => {
      window.location.hash = "#/";
    }, 500);
  });
}
