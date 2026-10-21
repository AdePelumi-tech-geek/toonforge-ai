
"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

const pageTitles: Record<string, string> = {
  "/": "Welcome to your studio",
  "/create-animation": "Create animation",
  "/script-studio": "Script studio",
  "/characters": "Characters",
  "/my-projects": "My projects",
};

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = pageTitles[pathname] ?? "Your creative studio";

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
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
            <Sidebar onNavigate={closeMobileMenu} onClose={closeMobileMenu} />
          </aside>
        </div>
      )}

      {/* Main workspace */}
      <div
        className={`min-h-screen min-w-0 ${
          sidebarOpen ? "lg:ml-[250px] xl:ml-[270px]" : "lg:ml-[76px]"
        }`}
      >
        <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between gap-4 border-b border-[#657166]/10 bg-[#F7F5EF]/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="hidden h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#657166]/15 bg-white px-3 text-sm font-semibold transition hover:bg-[#DAEBE3] lg:flex"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              ☰
              <span>{sidebarOpen ? "Collapse" : "Expand"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#657166]/15 bg-white text-xl lg:hidden"
              aria-label="Open mobile navigation"
            >
              ☰
            </button>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#657166]/60">
                ToonForge AI / {pageTitle}
              </p>
              <h2 className="truncate text-lg font-extrabold sm:text-xl">
                {pageTitle}
              </h2>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#657166]/10 bg-white px-4 py-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#99CDD8]" />
            <span className="text-xs font-semibold">Your creative space</span>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          {children}

          <footer className="py-8 text-center text-xs text-[#657166]/55">
            ToonForge AI · A little imagination goes a long way.
          </footer>
        </div>
      </div>
    </main>
  );
}
