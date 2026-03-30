import { defineConfig } from "astro/config";

const repoName = process.env.PUBLIC_REPO_NAME ?? "MarketResearch";
const site = process.env.PUBLIC_SITE_URL ?? "https://example.github.io";
const rawBase = process.env.PUBLIC_BASE_PATH ?? `/${repoName}/`;
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

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
