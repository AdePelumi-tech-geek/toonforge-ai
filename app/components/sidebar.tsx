"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimationNavigation } from "./animation-navigation-provider";

const navItems = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Create animation", href: "/create-animation", icon: "✦" },
  { label: "Script studio", href: "/script-studio", icon: "✎" },
  { label: "Characters", href: "/characters", icon: "♙" },
  { label: "My projects", href: "/my-projects", icon: "▧" },
];

const animatedRoutes = [
  "/create-animation",
  "/script-studio",
  "/characters",
];

type SidebarProps = {
  onNavigate?: () => void;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function Sidebar({
  onNavigate,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { navigateTo } = useAnimationNavigation();

  function handleNavigation(href: string) {
    onNavigate?.();

    if (animatedRoutes.includes(href)) {
      navigateTo(href);
      return;
    }

    // Home and My Projects navigate without the animation.
    window.location.href = href;
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="mb-10 flex items-center justify-between gap-3 px-2 pt-1">
        <Link
          href="/"
          onClick={(event) => {
            event.preventDefault();
            handleNavigation("/");
          }}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#657166] text-2xl text-white">
            ✦
          </span>

          {!collapsed && (
            <span className="min-w-0">
              <span className="block text-xl font-black tracking-tight text-[#657166]">
                ToonForge
              </span>
              <span className="block text-xs text-[#657166]/70">
                AI animation studio
              </span>
            </span>
          )}
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-xl bg-white px-3 py-2 text-lg text-[#657166] lg:hidden"
            aria-label="Close menu"
          >
            ×
          </button>
        )}
      </div>

      {!collapsed && (
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#657166]/60">
          Workspace
        </p>
      )}

      <nav className="space-y-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          const className = `flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition ${
            active
              ? "bg-[#657166] text-white shadow-md"
              : "text-[#657166] hover:bg-white/70"
          } ${collapsed ? "justify-center px-2" : "text-left"}`;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigation(item.href)}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={className}
            >
              <span className="w-5 shrink-0 text-center text-lg">
                {item.icon}
              </span>

              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <>
          <div className="mt-8 rounded-3xl border border-white/80 bg-white/60 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3C3B2] text-xl">
              ✨
            </div>

            <h3 className="font-bold text-[#657166]">
              Bring your ideas to life
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#657166]/75">
              Turn your imagination into animated stories.
            </p>

            <button
              type="button"
              onClick={() => handleNavigation("/create-animation")}
              className="mt-4 w-full rounded-xl bg-[#FDE8D3] px-3 py-3 text-sm font-bold text-[#657166] transition hover:bg-[#F3C3B2]"
            >
              Start creating →
            </button>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 rounded-2xl border border-[#657166]/10 bg-white/50 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99CDD8] font-bold text-[#657166]">
                TF
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#657166]">
                  My workspace
                </p>
                <p className="text-xs text-[#657166]/65">Free plan</p>
              </div>
            </div>
          </div>
        </>
      )}

      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="mt-6 rounded-xl bg-white/70 px-3 py-3 text-[#657166] hover:bg-white"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      )}
    </div>
  );
}
