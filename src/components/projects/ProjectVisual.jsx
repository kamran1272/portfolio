import { useState } from "react";

const SCREENSHOT_BASE = `${import.meta.env.BASE_URL}images/projects/`;

const KEYWORDS = new Set([
  "import", "export", "default", "function", "return", "const", "let", "var",
  "class", "public", "private", "protected", "new", "async", "await",
  "from", "if", "else", "for", "while", "use",
]);

/** Tiny regex highlighter — enough for a stylized preview, not a full parser. */
const highlightLine = (line, lineIndex) => {
  const tokens = [];
  const pattern =
    /(\/\*[\s\S]*?\*\/|\/\/.*$|<!--[\s\S]*?-->|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\];,.<>=!+\-*/|&?:]+|\s+|.)/g;
  let match;
  let key = 0;

  while ((match = pattern.exec(line)) !== null) {
    const token = match[0];
    let className = "text-slate-300";

    if (/^(\/\/|\/\*|<!--)/.test(token)) className = "text-slate-500 italic";
    else if (/^["']/.test(token)) className = "text-amber-300";
    else if (/^\d/.test(token)) className = "text-orange-300";
    else if (KEYWORDS.has(token)) className = "text-secondary";
    else if (/^[A-Z][\w$]*$/.test(token)) className = "text-primary";
    else if (/^[{}()[\];,.<>=!+\-*/|&?:]+$/.test(token))
      className = "text-slate-500";

    tokens.push(
      <span key={`${lineIndex}-${key++}`} className={className}>
        {token}
      </span>
    );
  }

  return tokens;
};

export const CodePreview = ({ project, large = false }) => (
  <div
    className="flex h-full flex-col bg-[#0a1424]"
    aria-label={`Code preview for ${project.title}`}
  >
    <div className="flex items-center gap-1.5 border-b border-slate-700/60 bg-[#0d1929] px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
      <span className="ml-2 truncate font-mono text-[11px] text-slate-400">
        {project.codeFile}
      </span>
      <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-600">
        illustrative
      </span>
    </div>
    <pre
      className={`flex-1 overflow-hidden p-4 font-mono leading-6 ${
        large ? "text-[13px]" : "text-[11px] sm:text-xs"
      }`}
    >
      <code>
        {project.codeLines.map((line, index) => (
          <div key={index} className="flex">
            <span
              className="w-7 shrink-0 select-none text-right text-slate-600"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span className="whitespace-pre-wrap pl-3">
              {line === "" ? "\u00a0" : highlightLine(line, index)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  </div>
);

/**
 * Project visual: a real screenshot when one exists in
 * public/images/projects/, otherwise an honest code preview.
 */
export const ProjectVisual = ({ project, large = false }) => {
  const [screenshotFailed, setScreenshotFailed] = useState(false);
  const showScreenshot =
    project.screenshot && !screenshotFailed;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-slate-700/60 bg-[#0a1424] ${
        large ? "min-h-64 sm:min-h-80" : "h-56 sm:h-64"
      }`}
    >
      {showScreenshot ? (
        <img
          src={`${SCREENSHOT_BASE}${project.screenshot}`}
          alt={`${project.title} — live screenshot`}
          loading="lazy"
          onError={() => setScreenshotFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <CodePreview project={project} large={large} />
      )}
    </div>
  );
};
