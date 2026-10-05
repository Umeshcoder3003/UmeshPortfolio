import { ExternalLink } from "lucide-react";
import { featuredRepos } from "@/data/github";
import { site } from "@/data/site";
import { githubUsername, isPlaceholder } from "@/lib/utils";
import type { Repo } from "@/types";
import { ButtonLink } from "./ui/ButtonLink";
import { Section } from "./ui/Section";
import { GithubIcon } from "./ui/BrandIcons";

/** Optional live data: public, non-fork repos from the GitHub API (revalidated hourly). */
async function fetchRepos(username: string): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {
      name: string; description: string | null; html_url: string; language: string | null; fork: boolean;
    }[];
    return data
      .filter((r) => !r.fork)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "No description provided.",
        url: r.html_url,
        language: r.language ?? undefined,
      }));
  } catch {
    return [];
  }
}

export async function GitHubSection() {
  const configured = !isPlaceholder(site.github);
  const username = githubUsername(site.github);
  const repos = featuredRepos.length > 0 ? featuredRepos : username ? await fetchRepos(username) : [];

  return (
    <Section
      id="github"
      title="GitHub"
      intro="Code behind the case studies: pipelines, transformations and data quality checks."
      tone="alt"
    >
      {repos.length > 0 ? (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <li key={r.url} className="flex flex-col rounded-xl border border-line bg-surface p-5">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm font-medium text-accent hover:underline"
              >
                {r.name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <p className="mt-2 text-sm text-ink/85">{r.description}</p>
              {r.language && <p className="mt-auto pt-4 text-xs text-muted">{r.language}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="max-w-xl rounded-xl border border-dashed border-line bg-surface p-6 text-muted">
          {configured
            ? "Repositories will appear here as projects are published."
            : "Add your GitHub URL in src/data/site.ts and your repositories will be listed here."}
        </p>
      )}

      {configured && (
        <div className="mt-8">
          <ButtonLink href={site.github} icon={<GithubIcon className="h-4 w-4" />}>
            View GitHub profile
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}
