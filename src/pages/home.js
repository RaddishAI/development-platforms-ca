import { supabase } from "../lib/supabase.js";
import { getCurrentUser, logout } from "../lib/auth.js";

export async function renderHome() {
  const app = document.querySelector("#app");
  const user = getCurrentUser();

  app.innerHTML = `
    <main style="padding: 16px;">
      <nav style="margin-bottom: 12px;">
        ${
          user
            ? `
              <a href="#/create">Create article</a>
              |
              <button id="logout-btn">Logout</button>
            `
            : `
              <a href="#/login">Login</a>
              |
              <a href="#/register">Register</a>
            `
        }
      </nav>

      <h1>News</h1>
      <div id="articles"></div>
    </main>
  `;

  if (user) {
    document
      .querySelector("#logout-btn")
      ?.addEventListener("click", async () => {
        await logout();
        window.location.hash = "#/";
      });
  }

  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.querySelector("#articles");

  if (!articles.length) {
    container.innerHTML = "<p>No articles yet.</p>";
    return;
  }

  container.innerHTML = articles
    .map(
      (a) => `
        <article style="margin-bottom: 12px;">
          <h3>${a.title}</h3>
          <small>${a.category} – ${new Date(
        a.created_at
      ).toLocaleString()}</small>
          <p>${a.body}</p>
        </article>
      `
    )
    .join("");
}
