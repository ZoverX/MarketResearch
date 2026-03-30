import { defineConfig } from "astro/config";

const repoName = process.env.PUBLIC_REPO_NAME ?? "MarketResearch";
const site = process.env.PUBLIC_SITE_URL ?? "https://example.github.io";
const base = process.env.PUBLIC_BASE_PATH ?? `/${repoName}`;

export default defineConfig({
  site,
  base,
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
