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
              <button id="logout-btn" type="button">Logout</button>
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
    .map((a) => {
      const canDelete = user && a.submitted_by === user.id;

      return `
        <article style="margin-bottom: 12px;">
          <h3>${a.title}</h3>
          <small>${a.category} – ${new Date(
        a.created_at
      ).toLocaleString()}</small>
          <p>${a.body}</p>

          ${
            canDelete
              ? `<button class="delete-article-btn" data-id="${a.id}" type="button">Delete</button>`
              : ""
          }
        </article>
      `;
    })
    .join("");

  container.querySelectorAll(".delete-article-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;

      const ok = window.confirm("Delete this article?");
      if (!ok) return;

      const { error: deleteError } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(deleteError);
        alert(deleteError.message);
        return;
      }

      renderHome();
    });
  });
}
