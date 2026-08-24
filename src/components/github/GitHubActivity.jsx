import { githubConfig, githubRepositories } from "../../data/githubData";

const GitHubActivity = () => (
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
      A curated snapshot of the projects and technologies behind my work.
    </p>

    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {githubRepositories.map((repository) => (
        <article
          key={repository.name}
          className="group rounded-xl border border-slate-700/70 bg-surface p-5 transition-colors duration-300 hover:border-primary/50"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-mono text-sm font-semibold text-white group-hover:text-primary">
              {repository.name}
            </h3>
            <span className="text-slate-500" aria-hidden="true">
              &lt;/&gt;
            </span>
          </div>
          <p className="mt-4 min-h-12 text-sm leading-6 text-muted-text">
            {repository.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            {repository.language}
          </span>
          <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-slate-500">
            {repository.status}
          </span>
        </article>
      ))}
    </div>
  </section>
);

export default GitHubActivity;
