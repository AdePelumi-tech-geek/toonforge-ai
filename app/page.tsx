"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const quickActions = [
  {
    number: "01",
    icon: "✦",
    title: "Create animation",
    description: "Turn a simple idea into an animated story.",
    href: "/create-animation",
    color: "bg-[#DAEBE3]",
  },
  {
    number: "02",
    icon: "✎",
    title: "Script studio",
    description: "Write scenes, dialogue, and storylines.",
    href: "/script-studio",
    color: "bg-[#FDE8D3]",
  },
  {
    number: "03",
    icon: "♙",
    title: "Characters",
    description: "Build memorable characters for your stories.",
    href: "/characters",
    color: "bg-[#F3C3B2]",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [launching, setLaunching] = useState(false);

  function launchAnimation() {
    if (launching) return;

    setLaunching(true);

    window.setTimeout(() => {
      router.push("/create-animation");
    }, 5000);
  }
  return (
          <div className="space-y-8 sm:space-y-10">
            
      {launching && (
        <div
          className="cartoon-launch-overlay"
          role="status"
          aria-live="polite"
        >
          <div className="cartoon-launch-scene">
            <div className="cartoon-launch-stars">
              ✦ <span>✧</span> ✨ <span>✦</span>
            </div>

            <div className="cartoon-launch-orbit">
              <div className="cartoon-launch-character">
                <div className="cartoon-character-face">
                  <span className="cartoon-eye">●</span>
                  <span className="cartoon-eye">●</span>
                </div>
                <div className="cartoon-character-smile" />
                <div className="cartoon-character-body">TF</div>
                <div className="cartoon-character-foot foot-left" />
                <div className="cartoon-character-foot foot-right" />
              </div>
            </div>

            <div className="cartoon-launch-title">
              LET'S MAKE MAGIC!
            </div>

            <p className="cartoon-launch-caption">
              Your imagination is taking off...
            </p>

            <div className="cartoon-launch-progress">
              <div />
            </div>
          </div>
        </div>
      )}

      {/* Welcome hero */}
      <section className="relative isolate overflow-hidden rounded-[32px] bg-[#DAEBE3] p-6 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-[#99CDD8]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-64 w-64 rounded-full bg-[#F3C3B2]/60 blur-3xl" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-bold text-[#657166]">
              <span className="h-2 w-2 rounded-full bg-[#657166]" />
              YOUR CREATIVE SPACE
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-[#354239] sm:text-5xl lg:text-6xl">
              Your imagination.
              <br />
              Your next <span className="text-[#657166]">masterpiece.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#526054] sm:text-base">
              Dream up characters, shape incredible stories, and bring your
              animation ideas to life — all from one creative workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">         
              <button
                type="button"
                onClick={launchAnimation}
                disabled={launching}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#657166] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#657166]/15 transition hover:-translate-y-0.5 hover:bg-[#526054] disabled:cursor-wait"
              >
                <span className="text-lg">✦</span>
                {launching ? "Magic is happening..." : "Create an animation"}
                <span>{launching ? "✨" : "→"}</span>
              </button>

              <Link
                href="/my-projects"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/90 bg-white/70 px-6 py-4 text-sm font-bold text-[#526054] transition hover:bg-white"
              >
                Explore my projects
              </Link>
            </div>

            <p className="mt-5 text-xs text-[#657166]/70">
              One idea is all it takes to get started.
            </p>
          </div>

          
          {/* Animated galaxy artwork */}
          <div className="relative mx-auto flex min-h-[320px] w-full max-w-md items-center justify-center overflow-hidden sm:min-h-[380px]">
            <div className="galaxy-glow absolute h-48 w-48 rounded-full bg-[#99CDD8]/50 blur-3xl sm:h-64 sm:w-64" />

          {/* Orbiting rings */}
          <div className="galaxy-orbit galaxy-orbit-outer">
            <span className="galaxy-planet galaxy-planet-mint" />
          </div>

          <div className="galaxy-orbit galaxy-orbit-middle">
            <span className="galaxy-planet galaxy-planet-blue" />
          </div>

          <div className="galaxy-orbit galaxy-orbit-inner">
            <span className="galaxy-planet galaxy-planet-peach" />
          </div>

          {/* Floating decorations */}
          <div className="galaxy-float galaxy-float-star absolute right-[12%] top-[12%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-[#FDE8D3]/90 text-2xl shadow-lg backdrop-blur-sm">
            ✨
          </div>

          <div className="galaxy-float-delayed absolute bottom-[12%] left-[8%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-[#F3C3B2]/90 text-2xl shadow-lg backdrop-blur-sm">
            🎨
          </div>

          <div className="galaxy-float absolute bottom-[20%] right-[12%] text-xl">
            ✦
          </div>

          <div className="absolute left-[14%] top-[19%] h-2.5 w-2.5 rounded-full bg-[#657166]" />
          <div className="absolute right-[19%] top-[33%] h-2 w-2 rounded-full bg-[#99CDD8]" />

          {/* Central floating studio card */}
          <div className="galaxy-center relative z-10 flex h-52 w-52 flex-col items-center justify-center rounded-[34px] border border-white/90 bg-white/80 shadow-[0_25px_70px_rgba(101,113,102,0.18)] backdrop-blur-xl sm:h-60 sm:w-60">
            <div className="galaxy-clapper text-7xl drop-shadow-lg sm:text-8xl">
              🎬
            </div>

            <span className="mt-4 text-sm font-black tracking-[0.2em] text-[#657166]">
              TOONFORGE
            </span>

            <span className="mt-2 text-xs text-[#657166]/70">
              Imagine it. Create it.
            </span>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#657166]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#99CDD8]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F3C3B2]" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
              YOUR WORKSPACE
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#354239] sm:text-3xl">
              Where shall we begin?
            </h2>
          </div>

          <span className="text-sm text-[#657166]/65">
            Pick your next creative move
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-w-0 flex-col rounded-[26px] border border-[#657166]/10 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#99CDD8] hover:shadow-xl hover:shadow-[#657166]/5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-[#526054] ${action.color}`}
                >
                  {action.icon}
                </span>

                <span className="text-xs font-bold tracking-widest text-[#657166]/40">
                  {action.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold text-[#354239]">
                {action.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-[#657166]/70">
                {action.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#657166]">
                Open workspace
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="rounded-[28px] border border-[#657166]/10 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
              YOUR CREATIONS
            </p>
            <h2 className="mt-2 text-xl font-black text-[#354239] sm:text-2xl">
              Recent projects
            </h2>
            <p className="mt-2 text-sm text-[#657166]/70">
              Your creative journey starts with your first project.
            </p>
          </div>

          <Link
            href="/my-projects"
            className="rounded-xl bg-[#DAEBE3] px-4 py-3 text-sm font-bold text-[#526054] transition hover:bg-[#CFD6C4]"
          >
            View all projects →
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#657166]/20 bg-[#F7F5EF]/60 px-5 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDE8D3] text-2xl">
            🎞️
          </div>

          <h3 className="mt-4 font-bold text-[#354239]">
            Your story starts here
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#657166]/70">
            You haven't added any projects yet. Create your first animation
            and begin building your collection.
          </p>

          <Link
            href="/create-animation"
            className="mt-5 rounded-xl bg-[#657166] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#526054]"
          >
            Create your first project
          </Link>
        </div>
      </section>
    </div>
  );
}
