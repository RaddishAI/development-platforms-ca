import { supabase } from "../lib/supabase.js";

export async function renderHome() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <main style="padding: 16px;">
      <h1>News Platform</h1>
      <p id="status">Loading articles...</p>
      <section id="articles"></section>
    </main>
  `;

  const { data, error } = await supabase
    .from("articles")
    .select("id,title,body,category,created_at,submitted_by")
    .order("created_at", { ascending: false });

  const statusEl = document.querySelector("#status");
  const listEl = document.querySelector("#articles");

  if (error) {
    statusEl.textContent = "Failed to load articles.";
    listEl.innerHTML = `<pre>${error.message}</pre>`;
    return;
  }

  if (!data || data.length === 0) {
    statusEl.textContent = "No articles yet.";
    return;
  }

  statusEl.textContent = "";

  listEl.innerHTML = data
    .map(
      (a) => `
        <article style="border:1px solid #ddd; padding:12px; margin:12px 0;">
          <h2 style="margin:0 0 8px;">${a.title}</h2>
          <p style="margin:0 0 8px;">${a.body}</p>
          <p style="margin:0; font-size: 14px;">
            <strong>Category:</strong> ${a.category} —
            <strong>Date:</strong> ${new Date(a.created_at).toLocaleString()}
          </p>
        </article>
      `
    )
    .join("");
}
