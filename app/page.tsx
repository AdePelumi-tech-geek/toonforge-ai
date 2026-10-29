"use client";

import Link from "next/link";

const quickActions = [
  {
    number: "01",
    icon: "🎬",
    title: "Create Animation",
    description: "Turn your ideas into animated scenes and unforgettable stories.",
    href: "/create-animation",
    label: "BRING IDEAS TO LIFE",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85",
    background: "bg-[#DAEBE3]",
    accent: "bg-[#A8C6B5]",
    tagColor: "text-[#526C5A]",
  },
  {
    number: "02",
    icon: "✍️",
    title: "Script Studio",
    description: "Develop your ideas into compelling scripts and storylines.",
    href: "/script-studio",
    label: "WRITE YOUR STORY",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
    background: "bg-[#FDE8D3]",
    accent: "bg-[#EAC6AC]",
    tagColor: "text-[#936C50]",
  },
  {
    number: "03",
    icon: "🦊",
    title: "Characters",
    description: "Create memorable characters for your animated universe.",
    href: "/characters",
    label: "MEET YOUR CAST",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=85",
    background: "bg-[#E9E3F5]",
    accent: "bg-[#C7B9E4]",
    tagColor: "text-[#75658F]",
  },
  {
    number: "04",
    icon: "🎞️",
    title: "My Projects",
    description: "Revisit your workspace and keep your creative journey moving.",
    href: "/my-projects",
    label: "YOUR CREATIVE LIBRARY",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85",
    background: "bg-[#F5EBCB]",
    accent: "bg-[#E8D59C]",
    tagColor: "text-[#8B7545]",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-10 pb-6 sm:space-y-12 lg:space-y-14">
      {/* Welcome hero */}
      <section
        className="relative isolate overflow-hidden rounded-[28px] bg-cover bg-center bg-no-repeat p-6 shadow-sm shadow-[#657166]/5 sm:rounded-[32px] sm:p-9 lg:p-12"
        style={{
          backgroundImage: "url('/images/toonforge-hero.jpg')",
        }}
      >
        {/* Background image overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#DAEBE3]/75" />

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-[#99CDD8]/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-64 w-64 rounded-full bg-[#F3C3B2]/60 blur-3xl" />

        <div className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-56 w-56 rounded-full bg-white/50 blur-3xl" />

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-5">
          {/* Hero content */}
          <div className="min-w-0 py-2 sm:py-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-[#657166] shadow-sm sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8A9D8C] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#657166]" />
              </span>
              YOUR CREATIVE SPACE
            </span>

            <h1 className="mt-6 max-w-2xl text-[2.65rem] font-black leading-[1.04] tracking-[-0.045em] text-[#354239] sm:text-5xl lg:text-[4.2rem]">
              Your imagination.
              <br />
              Your next{" "}
              <span className="relative inline-block text-[#657166]">
                masterpiece.
                <span className="absolute -bottom-1 left-0 h-1.5 w-2/3 rounded-full bg-[#F3C3B2]/80 sm:h-2" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#526054] sm:text-base sm:leading-8">
              Dream up characters, shape incredible stories, and bring your
              animation ideas to life — all from one creative workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create-animation"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#657166] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#657166]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#526054] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#657166]/25"
              >
                <span className="text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  ✦
                </span>
                Create an animation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/my-projects"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/90 bg-white/75 px-6 py-4 text-sm font-bold text-[#526054] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#657166]/20"
              >
                <span>▧</span>
                Explore my projects
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#657166]/80">
              <span className="inline-flex items-center gap-2">
                <span className="text-sm">✦</span>
                Your ideas, your stories
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#8A9D8C] sm:block" />

              <span>One idea is all it takes.</span>
            </div>
          </div>

          {/* Existing galaxy artwork preserved */}
          <div className="relative mx-auto flex min-h-[290px] w-full max-w-md items-center justify-center overflow-hidden sm:min-h-[380px]">
            <div className="galaxy-glow absolute h-48 w-48 rounded-full bg-[#99CDD8]/50 blur-3xl sm:h-64 sm:w-64" />

            <div className="galaxy-orbit galaxy-orbit-outer">
              <span className="galaxy-planet galaxy-planet-mint" />
            </div>

            <div className="galaxy-orbit galaxy-orbit-middle">
              <span className="galaxy-planet galaxy-planet-blue" />
            </div>

            <div className="galaxy-orbit galaxy-orbit-inner">
              <span className="galaxy-planet galaxy-planet-peach" />
            </div>

            <div className="galaxy-float absolute right-[9%] top-[10%] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-[#FDE8D3]/90 text-xl shadow-lg backdrop-blur-sm sm:right-[12%] sm:h-14 sm:w-14 sm:text-2xl">
              ✨
            </div>

            <div className="galaxy-float-delayed absolute bottom-[10%] left-[5%] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-[#F3C3B2]/90 text-xl shadow-lg backdrop-blur-sm sm:bottom-[12%] sm:left-[8%] sm:h-14 sm:w-14 sm:text-2xl">
              🎨
            </div>

            <div className="galaxy-float absolute bottom-[20%] right-[9%] text-xl text-[#657166]">
              ✦
            </div>

            <div className="absolute left-[14%] top-[19%] h-2.5 w-2.5 rounded-full bg-[#657166]" />

            <div className="absolute right-[19%] top-[33%] h-2 w-2 rounded-full bg-[#99CDD8]" />

            <div className="galaxy-center relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-[30px] border border-white/90 bg-white/80 shadow-[0_25px_70px_rgba(101,113,102,0.18)] backdrop-blur-xl sm:h-60 sm:w-60 sm:rounded-[34px]">
              <div className="galaxy-clapper text-6xl drop-shadow-lg sm:text-8xl">
                🎬
              </div>

              <span className="mt-3 text-xs font-black tracking-[0.2em] text-[#657166] sm:mt-4 sm:text-sm">
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

      {/* Creative studio */}
      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
              YOUR WORKSPACE
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#354239] sm:text-3xl">
              Where shall we begin?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#657166]/75">
              Everything you need to bring your next big idea to life, all in
              one place.
            </p>
          </div>

          <span className="hidden items-center gap-2 text-sm font-medium text-[#657166]/65 sm:inline-flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DAEBE3]">
              ✦
            </span>
            Pick your next creative move
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#657166]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#99CDD8]/70 hover:shadow-xl hover:shadow-[#657166]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#657166]/20"
            >
              {/* Artwork */}
              <div
                className={`relative mx-3 mt-3 h-40 overflow-hidden rounded-[20px] ${action.background} sm:h-44`}
              >
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url("${action.image}")` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#25352C]/55 via-[#25352C]/5 to-transparent" />

                  <div className="absolute inset-0 bg-white/10 transition-colors duration-300 group-hover:bg-transparent" />
                </div>

                {/* Number badge */}
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/50 bg-white/85 text-xs font-black text-[#354239] shadow-sm backdrop-blur-md">
                  {action.number}
                </span>

                {/* Icon */}
                <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/85 text-2xl shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {action.icon}
                </div>

                {/* Category label */}
                <span className="absolute bottom-4 right-3 max-w-[65%] rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.12em] text-[#354239] shadow-sm backdrop-blur-md sm:text-[10px]">
                  {action.label}
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5 pt-4 sm:p-5">
                <h3 className="text-base font-extrabold text-[#354239] transition-colors duration-300 group-hover:text-[#657166]">
                  {action.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-[#657166]/80">
                  {action.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#657166]/10 pt-4">
                  <span
                    className={`text-xs font-bold ${action.tagColor}`}
                  >
                    Open workspace
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F5EF] text-sm text-[#526054] transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-[#657166] group-hover:text-white">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent projects */}
      <section className="overflow-hidden rounded-[28px] border border-[#657166]/10 bg-white p-5 shadow-sm shadow-[#657166]/5 sm:rounded-[32px] sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
              YOUR CREATIONS
            </p>

            <h2 className="mt-2 text-xl font-black tracking-tight text-[#354239] sm:text-2xl">
              Recent projects
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#657166]/70">
              Your creative journey starts with your first project.
            </p>
          </div>

          <Link
            href="/my-projects"
            className="inline-flex items-center gap-2 rounded-xl bg-[#DAEBE3] px-4 py-3 text-sm font-bold text-[#526054] transition-all duration-300 hover:bg-[#CFD6C4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#657166]/20"
          >
            View all projects
            <span className="transition-transform duration-300 hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Empty state */}
        <div className="projects-galaxy relative mt-6 overflow-hidden rounded-[24px] border border-[#657166]/20 px-5 py-10 text-center sm:py-12">

        {/* Animated galaxy background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="projects-galaxy-core" />

          <div className="projects-galaxy-orbit">
            <span className="projects-galaxy-particle" style={{ top: "12%", left: "48%" }} />
            <span className="projects-galaxy-particle" style={{ top: "47%", right: "8%" }} />
            <span className="projects-galaxy-particle" style={{ bottom: "14%", left: "24%" }} />
          </div>

          <div className="projects-galaxy-orbit projects-galaxy-orbit-two">
            <span className="projects-galaxy-particle" style={{ top: "28%", right: "12%" }} />
            <span className="projects-galaxy-particle" style={{ bottom: "18%", left: "15%" }} />
          </div>

          <div className="projects-galaxy-orbit projects-galaxy-orbit-three">
            <span className="projects-galaxy-particle" style={{ top: "50%", right: "-5px" }} />
          </div>
        </div>

        {/* Keep the empty-state content above the animation for visual pleasantries */}
        <div className="projects-galaxy-content">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/80 bg-[#FDE8D3]/90 text-3xl shadow-lg backdrop-blur-md">
            🎞️
          </div>

          <h3 className="mt-5 text-lg font-extrabold text-[#354239]">
            Your story starts here
          </h3>

          <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-[#526054]">
            You haven&apos;t added any projects yet. Create your first animation
            and begin building your collection.
          </p>

          <Link
            href="/create-animation"
            className="relative mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#657166] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#657166]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#526054] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#657166]/25"
          >
            <span>✦</span>
            Create your first project
            <span>→</span>
          </Link>
        </div>
      </div>
      </section>

      {/* Closing callout */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#354239] px-6 py-8 sm:rounded-[32px] sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-[#99CDD8]/15 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BFD5C5]">
            EVERY GREAT STORY STARTS SOMEWHERE
          </p>

          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-white sm:text-3xl">
            Got an idea? Let&apos;s bring it to life.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Take that idea in your head and start shaping your next creative
            project.
          </p>
        </div>

        <div className="relative mt-6 lg:mt-0 lg:shrink-0">
          <Link
            href="/create-animation"
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#DAEBE3] px-6 py-3 text-sm font-extrabold text-[#354239] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 sm:w-auto"
          >
            Start creating
            <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}