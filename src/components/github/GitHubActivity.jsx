import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { githubConfig, githubRepositories } from "../../data/githubData";

const LANGUAGE_COLORS = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-sky-500",
  PHP: "bg-indigo-400",
  Blade: "bg-red-400",
  CSS: "bg-purple-400",
  HTML: "bg-orange-400",
};

const pickRepositories = (repos) =>
  repos
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.pushed_at) - new Date(a.pushed_at)
    )
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "No description yet.",
      language: repo.language || "Code",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      live: true,
    }));

const fallbackRepositories = githubRepositories.map((repo) => ({
  ...repo,
  stars: null,
  forks: null,
  url: `https://github.com/${githubConfig.username}/${repo.name}`,
  live: false,
}));

const RepositoryCard = ({ repository }) => (
  <a
    href={repository.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col rounded-xl border border-slate-700/70 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
    aria-label={`${repository.name} on GitHub`}
  >
    <div className="flex items-start justify-between gap-4">
      <h3 className="break-all font-mono text-sm font-semibold text-white group-hover:text-primary">
        {repository.name}
      </h3>
      <span className="shrink-0 text-slate-500" aria-hidden="true">
        &lt;/&gt;
      </span>
    </div>
    <p className="mt-4 min-h-12 flex-1 text-sm leading-6 text-muted-text">
      {repository.description}
    </p>
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
      <span className="inline-flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${LANGUAGE_COLORS[repository.language] || "bg-secondary"}`}
          aria-hidden="true"
        />
        {repository.language}
      </span>
      {repository.stars !== null && (
        <span className="inline-flex items-center gap-1.5">
          <FontAwesomeIcon icon={faStar} className="text-[10px]" aria-hidden="true" />
          {repository.stars}
        </span>
      )}
      {repository.forks !== null && (
        <span className="inline-flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCodeFork} className="text-[10px]" aria-hidden="true" />
          {repository.forks}
        </span>
      )}
    </div>
    {repository.status && (
      <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-slate-500">
        {repository.status}
      </span>
    )}
  </a>
);

const SkeletonCard = () => (
  <div
    className="animate-pulse rounded-xl border border-slate-700/70 bg-surface p-5"
    aria-hidden="true"
  >
    <div className="h-4 w-2/3 rounded bg-slate-700/60" />
    <div className="mt-4 h-3 rounded bg-slate-700/40" />
    <div className="mt-2 h-3 w-5/6 rounded bg-slate-700/40" />
    <div className="mt-5 h-3 w-1/3 rounded bg-slate-700/40" />
  </div>
);

const GitHubActivity = () => {
  const [repositories, setRepositories] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.github.com/users/${githubConfig.username}/repos?sort=pushed&per_page=30`
    )
      .then((response) => {
        if (!response.ok) throw new Error("GitHub API unavailable");
        return response.json();
      })
      .then((repos) => {
        if (!cancelled && Array.isArray(repos) && repos.length > 0) {
          setRepositories(pickRepositories(repos));
          setIsLive(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRepositories(fallbackRepositories);
          setIsLive(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = repositories || fallbackRepositories;

  return (
    <section id="github" className="content px-4 py-24 lg:px-8 lg:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Open source &amp; code
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            My portfolio shows the result. GitHub shows how I build it.
          </h2>
        </div>
        <a
          href={githubConfig.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-primary/50 px-4 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/10"
        >
          View GitHub Profile
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>

      <p className="mt-4 text-sm text-muted-text">
        {isLive
          ? "Live from GitHub — my most recently updated repositories."
          : "A curated snapshot of the projects and technologies behind my work."}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repositories === null ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          cards.map((repository) => (
            <RepositoryCard key={repository.name} repository={repository} />
          ))
        )}
      </div>
    </section>
  );
};

export default GitHubActivity;
