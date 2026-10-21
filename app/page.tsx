"use client";

import { useState } from "react";

type View = "Home" | "Create animation" | "Script studio" | "Characters" | "My projects";

const navItems: { icon: string; label: View }[] = [
  { icon: "⌂", label: "Home" },
  { icon: "✦", label: "Create animation" },
  { icon: "✎", label: "Script studio" },
  { icon: "♙", label: "Characters" },
  { icon: "▧", label: "My projects" },
];

function SidebarContent({
  activeView,
  onNavigate,
  onClose,
}: {
  activeView: View;
  onNavigate: (view: View) => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mb-10 flex items-center justify-between gap-3 px-2 pt-1">
        <button
          onClick={() => {
            onNavigate("Home");
            onClose?.();
          }}
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#657166] text-2xl text-white">
            ✦
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-[#657166]">
              ToonForge
            </span>
            <span className="block text-xs text-[#657166]/70">
              AI animation studio
            </span>
          </span>
        </button>
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

      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#657166]/60">
        Workspace
      </p>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              onNavigate(item.label);
              onClose?.();
            }}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
              activeView === item.label
                ? "bg-[#657166] text-white shadow-md"
                : "text-[#657166] hover:bg-white/70"
            }`}
          >
            <span className="w-5 text-center text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-white/80 bg-white/60 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3C3B2] text-xl">
          ✨
        </div>
        <h3 className="font-bold text-[#657166]">Bring your ideas to life</h3>
        <p className="mt-2 text-sm leading-6 text-[#657166]/75">
          Turn your imagination into animated stories.
        </p>
        <button
          onClick={() => {
            onNavigate("Create animation");
            onClose?.();
          }}
          className="mt-4 w-full rounded-xl bg-[#FDE8D3] px-3 py-3 text-sm font-bold text-[#657166] transition hover:bg-[#F3C3B2]"
        >
          Start creating →
        </button>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex items-center gap-3 rounded-2xl border border-[#657166]/10 bg-white/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#99CDD8] font-bold text-[#657166]">
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
    </div>
  );
}

function CreateAnimation({
  prompt,
  setPrompt,
  style,
  setStyle,
  duration,
  setDuration,
}: {
  prompt: string;
  setPrompt: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
}) {
  const [message, setMessage] = useState("");

  function handlePrepare() {
    setMessage(
      prompt.trim()
        ? "Your animation concept is ready to develop. AI video generation is not connected yet."
        : "Describe your animation idea first."
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[28px] border border-[#657166]/10 bg-white p-5 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
          Let&apos;s make something
        </p>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl">
          Create an animation
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#657166]/70">
          Describe the scene you want to bring to life.
        </p>

        <label htmlFor="animation-prompt" className="mt-7 block text-sm font-bold">
          Describe your idea
        </label>
        <textarea
          id="animation-prompt"
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value);
            setMessage("");
          }}
          placeholder="A young explorer discovers a magical forest filled with glowing flowers..."
          rows={5}
          className="mt-3 w-full resize-y rounded-2xl border border-[#657166]/15 bg-[#F7F5EF]/70 p-4 text-sm leading-7 outline-none transition placeholder:text-[#657166]/45 focus:border-[#99CDD8] focus:ring-4 focus:ring-[#99CDD8]/20"
        />

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="animation-style" className="block text-sm font-bold">
              Animation style
            </label>
            <select
              id="animation-style"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
            >
              <option>3D Animation</option>
              <option>2D Cartoon</option>
              <option>Anime</option>
              <option>Stop Motion</option>
              <option>Storybook</option>
              <option>Comic Book</option>
            </select>
          </div>
          <div>
            <label htmlFor="animation-duration" className="block text-sm font-bold">
              Target duration
            </label>
            <select
              id="animation-duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
            >
              <option>15 seconds</option>
              <option>30 seconds</option>
              <option>1 minute</option>
              <option>3 minutes</option>
              <option>5 minutes</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlePrepare}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#657166] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#526054]"
        >
          ✦ Prepare my animation
        </button>
        {message && (
          <p role="status" className="mt-4 rounded-2xl bg-[#DAEBE3] p-4 text-sm leading-6">
            {message}
          </p>
        )}
        <p className="mt-3 text-center text-xs leading-5 text-[#657166]/55">
          AI video generation has not been connected yet.
        </p>
      </div>

      <div className="flex min-h-[390px] flex-col rounded-[28px] bg-[#FDE8D3] p-5 sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#657166]/65">
            Studio preview
          </p>
          <h2 className="mt-2 text-xl font-black">Your next scene</h2>
        </div>
        <div className="relative mt-6 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/70 bg-[#DAEBE3] p-6 text-center">
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#99CDD8]/70 blur-xl" />
          <div className="absolute -bottom-10 -right-5 h-36 w-36 rounded-full bg-[#F3C3B2]/80 blur-xl" />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/80 bg-white/75 text-5xl shadow-sm">
            🎞️
          </div>
          <h3 className="relative z-10 mt-6 max-w-sm text-xl font-black">
            Your imagination goes here
          </h3>
          <p className="relative z-10 mt-3 max-w-sm break-words text-sm leading-6 text-[#657166]/75">
            {prompt.trim()
              ? `Your scene: ${prompt}`
              : "Write a description on the left to start planning your animation."}
          </p>
          <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold">
              {style}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold">
              {duration}
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#657166]/65">
          This is a visual planning preview, not a generated video file.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("Home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("30 seconds");

  function navigate(view: View) {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseCreation(view: View) {
    navigate(view);
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#657166]">
      <aside        
        className={`fixed inset-y-0 left-0 z-40 hidden w-[250px] overflow-y-auto overscroll-contain border-r border-[#657166]/10 bg-[#DAEBE3] px-4 py-5 lg:block xl:w-[270px] xl:px-5 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent activeView={activeView} onNavigate={navigate} />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 h-full w-full bg-[#181D18]/40"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(290px,85vw)] flex-col overflow-y-auto overscroll-contain bg-[#DAEBE3] px-4 py-5 shadow-2xl">
            <SidebarContent
              activeView={activeView}
              onNavigate={navigate}
              onClose={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      
      <div
        className={`min-h-screen ${
          sidebarOpen ? "lg:ml-[250px] xl:ml-[270px]" : "ml-0"
        }`}
      >
        <header className="sticky top-0 z-20 flex min-h-[76px] items-center justify-between gap-4 border-b border-[#657166]/10 bg-[#F7F5EF]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden h-10 items-center justify-center gap-2 rounded-xl border border-[#657166]/15 bg-white px-3 text-sm font-semibold transition hover:bg-[#DAEBE3] lg:flex"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              ☰ 
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#657166]/15 bg-white text-xl lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#657166]/60">
                ToonForge AI / {activeView}
              </p>
              <h2 className="truncate text-lg font-extrabold sm:text-xl">
                {activeView === "Home" ? "Welcome to your studio" : activeView}
              </h2>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#657166]/10 bg-white px-4 py-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#99CDD8]" />
            <span className="text-xs font-semibold">Your creative space</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          {activeView === "Home" && (
            <div className="space-y-8">
              
          <section className="relative isolate overflow-hidden rounded-[32px] bg-[#DAEBE3] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute -right-12 -top-16 -z-10 h-72 w-72 rounded-full bg-[#99CDD8]/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-1/3 -z-10 h-56 w-56 rounded-full bg-[#F3C3B2]/60 blur-3xl" />

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-6">
              <div className="min-w-0">
                <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-2 text-xs font-bold tracking-[0.12em]">
                  <span>✦</span> YOUR CREATIVE UNIVERSE
                </span>

              <h1 className="mt-6 max-w-2xl break-words text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                Big ideas deserve to come to life.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#657166]/80 sm:text-base lg:text-lg">
                Create characters, turn your stories into scripts, and bring your imagination into animation — all in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDE8D3] text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl">
                🎬
              </span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3C3B2] text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl">
                    🎨
                  </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#99CDD8] text-2xl shadow-sm sm:h-16 sm:w-16 sm:text-3xl">
                  ✨
                </span>
              </div>
            </div>
          </section>
          
              <section>
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
                    START WITH AN IDEA
                  </p>
                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    What would you like to create today?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#657166]/70">
                    Choose a starting point. You can switch between tools at any time.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <button
                    onClick={() => chooseCreation("Create animation")}
                    className="group rounded-[28px] border border-[#657166]/10 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#99CDD8] hover:shadow-lg sm:p-7"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DAEBE3] text-2xl transition group-hover:scale-105">
                      🎬
                    </span>
                    <h3 className="mt-5 text-xl font-black">Create an animation</h3>
                    <p className="mt-3 text-sm leading-6 text-[#657166]/70">
                      Turn a scene or an idea into an animation concept.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                      Open animation studio <span>→</span>
                    </span>
                  </button>

                  <button
                    onClick={() => chooseCreation("Script studio")}
                    className="group rounded-[28px] border border-[#657166]/10 bg-[#FDE8D3] p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl transition group-hover:scale-105">
                      ✎
                    </span>
                    <h3 className="mt-5 text-xl font-black">Write a script</h3>
                    <p className="mt-3 text-sm leading-6 text-[#657166]/75">
                      Shape your idea into scenes, dialogue, and a story worth watching.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                      Open script studio <span>→</span>
                    </span>
                  </button>

                  <button
                    onClick={() => chooseCreation("Characters")}
                    className="group rounded-[28px] border border-[#657166]/10 bg-[#F3C3B2]/55 p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl transition group-hover:scale-105">
                      ♙
                    </span>
                    <h3 className="mt-5 text-xl font-black">Build characters</h3>
                    <p className="mt-3 text-sm leading-6 text-[#657166]/75">
                      Plan your character&apos;s look, personality, and role in the story.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                      Open character studio <span>→</span>
                    </span>
                  </button>
                </div>
              </section>

              <section className="flex flex-col justify-between gap-4 rounded-[28px] border border-[#657166]/10 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">
                    YOUR CREATIVE SPACE
                  </p>
                  <h2 className="mt-2 text-xl font-black">Ready to continue a project?</h2>
                  <p className="mt-2 text-sm leading-6 text-[#657166]/70">
                    Your project library will live here as you build it out.
                  </p>
                </div>
                <button
                  onClick={() => navigate("My projects")}
                  className="shrink-0 rounded-2xl bg-[#657166] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#526054]"
                >
                  View my projects →
                </button>
              </section>
            </div>
          )}

          {activeView === "Create animation" && (
            <CreateAnimation
              prompt={prompt}
              setPrompt={setPrompt}
              style={style}
              setStyle={setStyle}
              duration={duration}
              setDuration={setDuration}
            />
          )}

          {activeView === "Script studio" && (
            <ScriptStudio />
          )}

          {activeView === "Characters" && (
            <CharactersStudio />
          )}

          {activeView === "My projects" && (
            <EmptyWorkspace
              icon="▧"
              title="Your projects will live here"
              description="When project saving is connected, your drafts and completed creations will appear in this space."
              actionLabel="Start an animation"
              onAction={() => navigate("Create animation")}
            />
          )}

          <footer className="py-8 text-center text-xs text-[#657166]/55">
            ToonForge AI · A little imagination goes a long way.
          </footer>
        </div>
      </div>
    </main>
  );
}

function ScriptStudio() {
  const [idea, setIdea] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");
  const [genre, setGenre] = useState("Adventure");
  const [message, setMessage] = useState("");

  return (
    <section className="mx-auto max-w-4xl rounded-[28px] border border-[#657166]/10 bg-white p-5 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">Story development</p>
      <h1 className="mt-2 text-2xl font-black sm:text-3xl">Script studio</h1>
      <p className="mt-2 text-sm leading-6 text-[#657166]/70">
        Start shaping the story behind your next animation.
      </p>
      <label htmlFor="script-title" className="mt-7 block text-sm font-bold">Story title</label>
      <input
        id="script-title"
        value={scriptTitle}
        onChange={(event) => setScriptTitle(event.target.value)}
        placeholder="Give your story a name"
        className="mt-2 w-full rounded-2xl border border-[#657166]/15 bg-[#F7F5EF]/70 px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
      />
      <label htmlFor="script-genre" className="mt-5 block text-sm font-bold">Genre</label>
      <select
        id="script-genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
      >
        <option>Adventure</option>
        <option>Comedy</option>
        <option>Fantasy</option>
        <option>Drama</option>
        <option>Science fiction</option>
        <option>Slice of life</option>
      </select>
      <label htmlFor="script-idea" className="mt-5 block text-sm font-bold">What's the story about?</label>
      <textarea
        id="script-idea"
        value={idea}
        onChange={(event) => setIdea(event.target.value)}
        rows={6}
        placeholder="Describe your main character, their goal, and the challenge they face..."
        className="mt-2 w-full resize-y rounded-2xl border border-[#657166]/15 bg-[#F7F5EF]/70 p-4 text-sm leading-7 outline-none focus:border-[#99CDD8]"
      />
      <button
        onClick={() => setMessage(idea.trim() ? "Your story notes are ready to develop. AI script writing is not connected yet." : "Add a short story idea first.")}
        className="mt-5 w-full rounded-2xl bg-[#657166] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#526054]"
      >
        ✎ Prepare my story
      </button>
      {message && <p role="status" className="mt-4 rounded-2xl bg-[#DAEBE3] p-4 text-sm leading-6">{message}</p>}
      <p className="mt-3 text-center text-xs text-[#657166]/55">
        {scriptTitle.trim() ? `Working title: ${scriptTitle} · ${genre}` : `${genre} story workspace · AI writing is not connected yet.`}
      </p>
    </section>
  );
}

function CharactersStudio() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Hero");
  const [personality, setPersonality] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="mx-auto max-w-4xl rounded-[28px] border border-[#657166]/10 bg-white p-5 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A9D8C]">Character workshop</p>
      <h1 className="mt-2 text-2xl font-black sm:text-3xl">Build a character</h1>
      <p className="mt-2 text-sm leading-6 text-[#657166]/70">
        Start defining the people, creatures, and personalities in your story.
      </p>
      <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-[180px_1fr]">
        <div className="flex min-h-44 flex-col items-center justify-center rounded-3xl bg-[#F3C3B2]/55 p-5 text-center">
          <span className="text-5xl">♙</span>
          <span className="mt-3 text-xs font-semibold text-[#657166]/70">Character preview</span>
        </div>
        <div>
          <label htmlFor="character-name" className="block text-sm font-bold">Character name</label>
          <input
            id="character-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Kiko the explorer"
            className="mt-2 w-full rounded-2xl border border-[#657166]/15 bg-[#F7F5EF]/70 px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
          />
          <label htmlFor="character-role" className="mt-5 block text-sm font-bold">Story role</label>
          <select
            id="character-role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
          >
            <option>Hero</option>
            <option>Sidekick</option>
            <option>Villain</option>
            <option>Mentor</option>
            <option>Supporting character</option>
            <option>Creature</option>
          </select>
        </div>
      </div>
      <label htmlFor="character-personality" className="mt-5 block text-sm font-bold">Personality and appearance</label>
      <textarea
        id="character-personality"
        value={personality}
        onChange={(event) => setPersonality(event.target.value)}
        rows={5}
        placeholder="Describe how your character looks, behaves, speaks, and what makes them unique..."
        className="mt-2 w-full resize-y rounded-2xl border border-[#657166]/15 bg-[#F7F5EF]/70 p-4 text-sm leading-7 outline-none focus:border-[#99CDD8]"
      />
      <button
        onClick={() => setMessage(name.trim() ? `Character concept for ${name} (${role}) is ready to develop. Character image generation is not connected yet.` : "Give your character a name first.")}
        className="mt-5 w-full rounded-2xl bg-[#657166] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#526054]"
      >
        ✦ Prepare character concept
      </button>
      {message && <p role="status" className="mt-4 rounded-2xl bg-[#DAEBE3] p-4 text-sm leading-6">{message}</p>}
      {personality.trim() && <p className="mt-3 text-xs leading-5 text-[#657166]/60">Your character notes are shown in this session only; saving is not connected yet.</p>}
    </section>
  );
}

function EmptyWorkspace({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[420px] max-w-4xl flex-col items-center justify-center rounded-[28px] border border-[#657166]/10 bg-white px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#DAEBE3] text-3xl">{icon}</div>
      <h1 className="mt-5 text-2xl font-black">{title}</h1>
      <p className="mt-3 max-w-lg text-sm leading-7 text-[#657166]/70">{description}</p>
      <button onClick={onAction} className="mt-6 rounded-2xl bg-[#657166] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#526054]">
        {actionLabel} →
      </button>
    </section>
  );
}
