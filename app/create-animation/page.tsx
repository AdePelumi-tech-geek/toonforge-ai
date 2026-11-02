"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationPageReady } from "@/app/components/animation-navigation-provider";

const quickActions = [
  {
    icon: "🎬",
    title: "Create an animation",
    description: "Bring your imagination to life",
    prompt: "Create a cinematic 3D animation about ",
  },
  {
    icon: "✍️",
    title: "Write a script",
    description: "Turn your ideas into stories",
    prompt: "Write an engaging animation script about ",
  },
  {
    icon: "🎭",
    title: "Create a character",
    description: "Design your next character",
    prompt: "Create a unique animated character who ",
  },
];

const styleOptions = [
  { label: "3D Animation", icon: "🪐", description: "Immersive worlds & depth" },
  { label: "2D Cartoon", icon: "🎨", description: "Classic animated storytelling" },
  { label: "Anime", icon: "⚡", description: "Expressive cinematic scenes" },
  { label: "Stop Motion", icon: "🧸", description: "Tactile handcrafted visuals" },
  { label: "Storybook", icon: "📖", description: "Dreamlike illustrated worlds" },
  { label: "Comic Book", icon: "💥", description: "Bold panels & dynamic action" },
];

const durationOptions = [
  { label: "15 seconds", icon: "⚡", description: "Quick & punchy" },
  { label: "30 seconds", icon: "🎬", description: "Short-form storytelling" },
  { label: "1 minute", icon: "⏳", description: "Room to tell your story" },
  { label: "3 minutes", icon: "🌌", description: "An extended adventure" },
  { label: "5 minutes", icon: "🎞️", description: "A complete cinematic journey" },
];

type DropdownOption = {
  label: string;
  icon: string;
  description: string;
};

type GalaxyDropdownProps = {
  id: string;
  label: string;
  icon: string;
  value: string;
  options: DropdownOption[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

function GalaxyDropdown({
  id,
  label,
  icon,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: GalaxyDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [listMaxHeight, setListMaxHeight] = useState<number | null>(null);
  const selectedOption = options.find((option) => option.label === value);

  // Close on outside press (pointerdown also fires for taps on iOS, where
  // `mousedown` is not dispatched for non-clickable elements) and on Escape.
  // Listeners only exist while the menu is open.
  useEffect(() => {
    if (!open) {
      return;
    }

    const updateListMaxHeight = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 16;
      const spaceAbove = rect.top - 16;

      setListMaxHeight(
        Math.max(120, Math.min(280, Math.max(spaceBelow, spaceAbove))),
      );
    };

    updateListMaxHeight();

    window.addEventListener("resize", updateListMaxHeight);
    window.addEventListener("scroll", updateListMaxHeight, true);

    return () => {
      window.removeEventListener("resize", updateListMaxHeight);
      window.removeEventListener("scroll", updateListMaxHeight, true);
    };
  }, [open]);

  // The menu opens upward, so cap the scrolling list to the space that is
  // actually available between the sticky header and the toolbar. Without
  // this, the top of the menu is cut off or hidden under the header.
  useEffect(() => {
    if (!open) {
      return;
    }

    function fitMenuToViewport() {
      const menu = menuRef.current;
      const list = listRef.current;
      const anchor = menu?.offsetParent;

      if (!menu || !list || !(anchor instanceof HTMLElement)) return;

      const headerBottom =
        document.querySelector("header.sticky")?.getBoundingClientRect()
          .bottom ?? 76;

      // 12px = mb-3 gap above the anchor, 8px = breathing room under the header
      const spaceAbove =
        anchor.getBoundingClientRect().top - Math.max(headerBottom, 0) - 12 - 8;

      // Panel chrome = menu header + footer + borders
      const chrome = menu.offsetHeight - list.offsetHeight;

      setListMaxHeight(
        Math.max(120, Math.min(320, Math.floor(spaceAbove - chrome)))
      );
    }

    fitMenuToViewport();

    window.addEventListener("resize", fitMenuToViewport);
    window.addEventListener("scroll", fitMenuToViewport, { passive: true });

    return () => {
      window.removeEventListener("resize", fitMenuToViewport);
      window.removeEventListener("scroll", fitMenuToViewport);
    };
  }, [open]);

  return (
    // Below `sm` the menu anchors to the toolbar (nearest positioned parent) so
    // it can never run off the right edge of a phone screen.
    <div ref={dropdownRef} className="min-w-[9.5rem] flex-1 sm:relative">
      <button
        ref={triggerRef}
        type="button"
        id={`${id}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={onToggle}
        className={`group relative flex w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-2xl border bg-white px-3 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 sm:gap-3 sm:px-4 ${
          open
            ? "border-violet-400 shadow-[0_0_0_3px_rgba(139,92,246,0.14),0_8px_24px_rgba(110,70,255,0.12)]"
            : "border-[#657166]/20 hover:border-violet-300 hover:shadow-[0_5px_20px_rgba(139,92,246,0.10)]"
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl transition-colors duration-200 ${
            open
              ? "bg-violet-100"
              : "bg-[#EDF0EA] group-hover:bg-violet-50"
          }`}
        >
          {icon}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block text-xs font-medium leading-4 ${
              open ? "text-violet-600" : "text-[#7C8E80]"
            }`}
          >
            {label}
          </span>

          <span className="mt-0.5 block truncate text-[15px] font-semibold leading-5 text-[#252B26]">
            {value}
          </span>
        </span>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            open
              ? "rotate-180 bg-violet-100 text-violet-700"
              : "bg-[#EDF0EA] text-[#657C69] group-hover:bg-violet-100 group-hover:text-violet-700"
          }`}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="m5 7.5 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          ref={menuRef}
          id={`${id}-menu`}
          role="listbox"
          aria-labelledby={`${id}-trigger`}
          aria-label={`Choose ${label.toLowerCase()}`}
          className="tf-dropdown absolute bottom-full left-0 z-[100] mb-3 flex w-[min(330px,calc(100vw-5.5rem))] flex-col overflow-hidden rounded-2xl border border-[#657166]/15 bg-white shadow-[0_28px_70px_-12px_rgba(37,43,38,0.45),0_10px_24px_-10px_rgba(37,43,38,0.25)] ring-1 ring-black/5 sm:w-[340px]"
        >
          {/* Menu header */}
          <div className="flex items-center gap-3 border-b border-[#657166]/10 bg-gradient-to-b from-violet-50/80 to-white px-4 py-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">
              {icon}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-5 tracking-tight text-[#252B26]">
                Choose a {label.toLowerCase()}
              </h3>

              <p className="mt-0.5 text-xs leading-4 text-[#657166]">
                {label === "Style"
                  ? "Pick the look of your animation."
                  : "Pick how long your animation runs."}
              </p>
            </div>
          </div>

          {/* Options */}
          <div
            ref={listRef}
            style={
              listMaxHeight !== null
                ? { maxHeight: `min(${listMaxHeight}px, 45vh)` }
                : undefined
            }
            className="max-h-[min(320px,45vh)] space-y-1 overflow-y-auto overscroll-contain p-2"
          >
            {options.map((option) => {
              const isSelected = option.label === value;

              return (
                <button
                  key={option.label}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(option.label)}
                  className={`group/option flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 ${
                    isSelected
                      ? "border-violet-200 bg-violet-50"
                      : "border-transparent hover:bg-[#F3F6F1]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl transition-colors duration-150 ${
                      isSelected
                        ? "bg-white shadow-sm ring-1 ring-violet-200"
                        : "bg-[#EDF0EA] group-hover/option:bg-white"
                    }`}
                  >
                    {option.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-semibold leading-5 ${
                        isSelected ? "text-violet-900" : "text-[#252B26]"
                      }`}
                    >
                      {option.label}
                    </span>

                    <span className="block text-xs leading-4 text-[#657166]">
                      {option.description}
                    </span>
                  </span>

                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-150 ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "text-transparent"
                    }`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        d="m3.5 8 3 3 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Menu footer */}
          <div className="flex items-center justify-between gap-3 border-t border-[#657166]/10 bg-[#F7F8F5] px-4 py-2.5">
            <span className="text-xs font-medium text-[#7C8E80]">
              Selected
            </span>

            <span className="max-w-[65%] truncate text-sm font-semibold text-violet-700">
              {selectedOption?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateAnimationPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("30 seconds");
  const [message, setMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(name: string) {
    setOpenDropdown((current) => (current === name ? null : name));
  }

  function handlePrepare() {
    setOpenDropdown(null);

    setMessage(
      prompt.trim()
        ? `Your concept is ready to develop! Style: ${style}. Duration: ${duration}. AI video generation is not connected yet.`
        : "Describe your animation idea first."
    );
  }

  function handleQuickAction(value: string) {
    setPrompt(value);
    setMessage("");

    requestAnimationFrame(() => {
      document.getElementById("animation-prompt")?.focus();
    });
  }

  return (
    <main
      className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center bg-[#090816] px-3 py-3 text-white sm:px-6 sm:py-4 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(9,8,22,0.62), rgba(9,8,22,0.78)), url('/images/animation-studio-bg.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background atmosphere (clipped here so the page root can stay
          overflow-visible and the dropdown menu is never cut off) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/25 via-transparent to-cyan-950/20" />

        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />
      </div>

      {/* Main creation workspace */}
      <div className="relative z-10 mx-auto flex max-h-full w-full max-w-[1000px] flex-col items-center justify-center">
        {/* Main heading */}
        <div className="mb-5 w-full text-center sm:mb-7">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-[#100E24]/60 px-4 py-2 backdrop-blur-xl sm:mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-100/90 sm:text-xs">
              ToonForge Creative Studio
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[46px]">
            What&apos;s on your imagination
            <br className="hidden sm:block" /> today?
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/75 sm:mt-4 sm:text-lg">
            Every masterpiece begins with an idea. Describe yours and let&apos;s
            bring it to life.
          </p>
        </div>

        {/* Prompt composer */}
        <div className="w-full rounded-[24px] border border-white/15 bg-[#F7F8F5]/95 p-3 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 focus-within:border-violet-400/60 sm:rounded-[32px] sm:p-5">
          <label htmlFor="animation-prompt" className="sr-only">
            Describe your animation idea
          </label>

          <textarea
            id="animation-prompt"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
              setMessage("");
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                handlePrepare();
              }
            }}
            placeholder="Imagine a world where..."
            rows={3}
            className="min-h-[90px] w-full resize-none border-0 bg-transparent px-3 py-3 text-base leading-8 text-[#303830] outline-none placeholder:text-[#657166]/60 focus:ring-0 sm:min-h-[115px] sm:px-4 sm:text-lg"
          />

          {/* Composer toolbar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#657166]/15 px-1 pt-3 sm:px-2 sm:pt-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
              <GalaxyDropdown
                id="animation-style"
                label="Style"
                icon="🎨"
                value={style}
                options={styleOptions}
                open={openDropdown === "style"}
                onToggle={() => toggleDropdown("style")}
                onSelect={(value) => {
                  setStyle(value);
                  setOpenDropdown(null);
                  setMessage("");
                }}
              />

              <GalaxyDropdown
                id="animation-duration"
                label="Duration"
                icon="⏱️"
                value={duration}
                options={durationOptions}
                open={openDropdown === "duration"}
                onToggle={() => toggleDropdown("duration")}
                onSelect={(value) => {
                  setDuration(value);
                  setOpenDropdown(null);
                  setMessage("");
                }}
              />
            </div>

            <button
              type="button"
              onClick={handlePrepare}
              aria-label="Prepare animation"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white shadow-[0_6px_25px_rgba(124,58,237,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_35px_rgba(124,58,237,0.5)] active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M7 17 17 7M7 7h10v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Feedback */}
          {message && (
            <p
              role="status"
              aria-live="polite"
              className="mx-2 mt-4 rounded-xl bg-[#DAEBE3] px-4 py-3 text-sm font-medium leading-6 text-[#405346]"
            >
              {message}
            </p>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-5 grid w-full grid-cols-1 gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => handleQuickAction(action.prompt)}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-3 text-left backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-500/[0.12] hover:shadow-xl hover:shadow-violet-950/20 sm:p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-xl transition duration-300 group-hover:scale-110 group-hover:border-violet-300/30 group-hover:bg-violet-400/15 sm:h-12 sm:w-12">
                {action.icon}
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-bold leading-5 text-white sm:text-[15px]">
                  {action.title}
                </span>

                <span className="mt-1 block text-xs leading-5 text-white/65">
                  {action.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimationPageReady />
    </main>
  );
}