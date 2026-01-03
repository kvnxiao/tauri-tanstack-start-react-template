import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useCallback, useState } from "react";
import { RoundedButton } from "../components/RoundedButton";

export const Home: React.FC = () => {
  const [greeted, setGreeted] = useState<string | null>(null);

  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-2 items-center">
          <img
            className="dark:invert"
            src="/tanstack.svg"
            alt="TanStack logo"
            width={180}
            height={38}
          />
          <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-cyan-500">
            Start
          </span>
        </div>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/routes/index.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex flex-col gap-2 items-start">
          <RoundedButton onClick={greet} title='Call "greet" from Rust' />
          <p className="wrap-break-word w-md">
            {greeted ?? "Click the button to call the Rust function"}
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://tanstack.com/start/latest/docs/framework/react/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://tanstack.com/start/latest/docs/framework/react/examples/basic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://tanstack.com/start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to tanstack.com/start →
        </a>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
