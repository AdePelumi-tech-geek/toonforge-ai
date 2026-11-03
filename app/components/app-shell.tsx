"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { AnimationLaunchProvider } from "./animation-launcher";

const pageTitles: Record<string, string> = {
  "/": "Welcome to your studio",
  "/create-animation": "The Future of Animation",
  "/script-studio": "The Future of Storytelling",
  "/characters": "The Future of Character Design",
  "/my-projects": "My projects",
};

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = pageTitles[pathname] ?? "Your creative studio";

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <AnimationLaunchProvider>
      <main className="min-h-screen bg-[#F7F5EF] text-[#657166]">
        {/* Desktop sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 hidden overflow-y-auto overscroll-contain border-r border-[#657166]/10 bg-[#DAEBE3] px-4 py-5 transition-[width,transform] duration-200 lg:block ${
            sidebarOpen
              ? "w-[250px] translate-x-0 xl:w-[270px] xl:px-5"
              : "w-[76px] translate-x-0 px-3"
          }`}
        >
          <Sidebar
            collapsed={!sidebarOpen}
            onToggleCollapse={() => setSidebarOpen(true)}
          />
        </aside>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              className="absolute inset-0 h-full w-full bg-[#181D18]/40"
              onClick={closeMobileMenu}
              aria-label="Close mobile navigation"
            />

            <aside className="absolute inset-y-0 left-0 flex w-[min(290px,85vw)] flex-col overflow-y-auto overscroll-contain bg-[#DAEBE3] px-4 py-5 shadow-2xl">
              <Sidebar
                onNavigate={closeMobileMenu}
                onClose={closeMobileMenu}
              />
            </aside>
          </div>
        )}

        {/* Main workspace */}
        <div
          className={`min-h-screen min-w-0 ${
            sidebarOpen
              ? "lg:ml-[250px] xl:ml-[270px]"
              : "lg:ml-[76px]"
          }`}
        >
          {/* Header
              Keep the `sticky` class: the create-animation dropdown measures
              `header.sticky` to size its menu. */}
          <header className="sticky top-0 z-30 border-b border-[#657166]/15 bg-gradient-to-r from-[#DAEBE3]/95 via-[#E6F0E8]/95 to-[#F2F6EE]/95 shadow-[0_8px_28px_-14px_rgba(45,55,45,0.28)] backdrop-blur-2xl">
            {/* Soft light edge + green accent line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#789C83]/45 to-transparent" />

            <div className="relative flex min-h-[76px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              {/* Left: Navigation + Page identity */}
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                {/* Desktop sidebar toggle */}
                <button
                  onClick={() => setSidebarOpen((open) => !open)}
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#657166]/20 bg-white/85 text-[#657166] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#657166]/35 hover:bg-white active:scale-95 lg:flex"
                  aria-label={
                    sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                  }
                  title={
                    sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect
                      x="3.5"
                      y="4"
                      width="17"
                      height="16"
                      rx="3"
                    />
                    <path d="M9 4v16" />
                  </svg>
                </button>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#657166]/20 bg-white/85 text-[#657166] shadow-sm transition hover:bg-white active:scale-95 lg:hidden"
                  aria-label="Open mobile navigation"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>

                {/* Page identity */}
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#789C83] shadow-[0_0_8px_rgba(120,156,131,0.7)]" />

                    <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6354] sm:text-[11px]">
                      TOONFORGE AI
                    </p>

                    <span className="hidden text-[#657166]/40 sm:inline">
                      /
                    </span>

                    <p className="hidden truncate text-xs font-medium text-[#4F6354]/85 sm:block">
                      Creative Studio
                    </p>
                  </div>

                  <h2 className="truncate text-xl font-black tracking-tight text-[#252B26] sm:text-2xl">
                    {pageTitle}
                  </h2>
                </div>
              </div>

              {/* Right: Studio status */}
              <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#657166]/15 bg-white/85 px-3 py-2 shadow-[0_2px_12px_rgba(45,55,45,0.06)] sm:gap-2.5 sm:px-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8BA995] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#789C83]" />
                </span>

                <span className="text-[11px] font-semibold text-[#46564A] sm:text-xs">
                  <span className="sm:hidden">Studio</span>
                  <span className="hidden sm:inline">
                    Your creative space
                  </span>
                </span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
            {children}

            <footer className="py-8 text-center text-xs text-[#657166]/55">
              ToonForge AI · A little imagination goes a long way.
            </footer>
          </div>
        </div>
      </main>
    </AnimationLaunchProvider>
  );
}