
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Loader2,
  Music2,
  Plus,
  Save,
  Settings2,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import { AnimationPageReady } from "@/app/components/animation-navigation-provider";

// ------------------------------------------------------
// OPTIONS
// ------------------------------------------------------

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
  {
    label: "3D Animation",
    icon: "🪐",
    description: "Immersive worlds & depth",
  },
  {
    label: "2D Cartoon",
    icon: "🎨",
    description: "Classic animated storytelling",
  },
  {
    label: "Anime",
    icon: "⚡",
    description: "Expressive cinematic scenes",
  },
  {
    label: "Stop Motion",
    icon: "🧸",
    description: "Tactile handcrafted visuals",
  },
  {
    label: "Storybook",
    icon: "📖",
    description: "Dreamlike illustrated worlds",
  },
  {
    label: "Comic Book",
    icon: "💥",
    description: "Bold panels & dynamic action",
  },
];

const durationOptions = [
  {
    label: "15 seconds",
    icon: "⚡",
    description: "Quick & punchy",
  },
  {
    label: "30 seconds",
    icon: "🎬",
    description: "Short-form storytelling",
  },
  {
    label: "1 minute",
    icon: "⏳",
    description: "Room to tell your story",
  },
  {
    label: "3 minutes",
    icon: "🌌",
    description: "An extended adventure",
  },
  {
    label: "5 minutes",
    icon: "🎞️",
    description: "A complete cinematic journey",
  },
];

const formatOptions = ["16:9", "9:16", "1:1"];
const qualityOptions = ["720p", "1080p", "4K"];

// ------------------------------------------------------
// TYPES
// ------------------------------------------------------

type DropdownOption = {
  label: string;
  icon: string;
  description: string;
};

type Settings = {
  style: string;
  duration: string;
  format: string;
  quality: string;
  narration: boolean;
  music: boolean;
};

type DropdownProps = {
  id: string;
  label: string;
  icon: string;
  value: string;
  options: DropdownOption[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

type Status = "idle" | "loading" | "success" | "error";

// ------------------------------------------------------
// GALAXY DROPDOWN
// ------------------------------------------------------

function GalaxyDropdown({
  id,
  label,
  icon,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.label === value,
  );

  useEffect(() => {
    if (!open) return;

    const fitMenuToViewport = () => {
      const menu = menuRef.current;
      const list = listRef.current;
      const anchor = dropdownRef.current;

      if (!menu || !list || !anchor) return;

      const headerBottom =
        document
          .querySelector("header.sticky")
          ?.getBoundingClientRect().bottom ?? 0;

      const anchorTop = anchor.getBoundingClientRect().top;

      const availableSpace =
        anchorTop - Math.max(headerBottom, 0) - 20;

      const menuChrome =
        menu.offsetHeight - list.offsetHeight;

      const availableListHeight = Math.max(
        120,
        Math.min(
          320,
          Math.floor(availableSpace - menuChrome),
        ),
      );

      list.style.maxHeight = `min(${availableListHeight}px, 45vh)`;
    };

    const animationFrame = requestAnimationFrame(
      fitMenuToViewport,
    );

    const handleOutsidePress = (event: PointerEvent) => {
      if (
        !dropdownRef.current?.contains(
          event.target as Node,
        )
      ) {
        onToggle();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("resize", fitMenuToViewport);
    window.addEventListener("scroll", fitMenuToViewport, true);

    document.addEventListener(
      "pointerdown",
      handleOutsidePress,
    );

    document.addEventListener("keydown", handleEscape);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        fitMenuToViewport,
      );

      window.removeEventListener(
        "scroll",
        fitMenuToViewport,
        true,
      );

      document.removeEventListener(
        "pointerdown",
        handleOutsidePress,
      );

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [open, onToggle]);

  return (
    <div
      ref={dropdownRef}
      className="min-w-[9.5rem] flex-1 sm:relative"
    >
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

          <div
            ref={listRef}
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
                        isSelected
                          ? "text-violet-900"
                          : "text-[#252B26]"
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
                    <Check className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>

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

// ------------------------------------------------------
// SETTINGS MODAL COMPONENTS
// ------------------------------------------------------

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-violet-600" : "bg-[#CBD4CC]"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function AspectPreview({ format }: { format: string }) {
  return (
    <span
      className={`mx-auto block rounded border-2 border-current ${
        format === "16:9"
          ? "h-7 w-12"
          : format === "9:16"
            ? "h-11 w-7"
            : "h-9 w-9"
      }`}
    />
  );
}

function ConfigGroup({
  label,
  icon,
  options,
  value,
  onSelect,
  preview = false,
}: {
  label: string;
  icon: ReactNode;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  preview?: boolean;
}) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#657166]">
        {icon}
        {label}
      </div>

      <div
        className={`grid gap-2 ${
          preview
            ? "grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onSelect(option)}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
              value === option
                ? "border-violet-500 bg-violet-50 text-violet-800 ring-2 ring-violet-200"
                : "border-[#657166]/15 bg-white hover:border-violet-300"
            }`}
          >
            {preview && <AspectPreview format={option} />}

            <span className={preview ? "mt-2 block" : ""}>
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SoundRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#657166]/15 bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>

        <span className="block text-sm text-[#657166]">
          {description}
        </span>
      </span>

      <Toggle
        checked={checked}
        onChange={onChange}
        label={`Toggle ${title}`}
      />
    </div>
  );
}

function SummaryRow({
  title,
  value,
  onEdit,
}: {
  title: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#657166]/15 bg-white p-4">
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wider text-[#8A988D]">
          {title}
        </span>

        <span className="mt-1 block truncate font-semibold">
          {value}
        </span>
      </span>

      <button
        type="button"
        onClick={onEdit}
        className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-50"
      >
        <Edit3 className="h-3.5 w-3.5" />
        Edit
      </button>
    </div>
  );
}

// ------------------------------------------------------
// FOUR-STEP SETTINGS WIZARD
// ------------------------------------------------------

function SettingsModal({
  saved,
  onSave,
  onClose,
}: {
  saved: Settings;
  onSave: (settings: Settings) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Settings>(() => ({
    ...saved,
  }));

  const [step, setStep] = useState(1);

  const titles = ["Style", "Video", "Sound", "Review"];

  const canContinue =
    step === 1
      ? Boolean(draft.style)
      : step === 2
        ? Boolean(
            draft.duration &&
              draft.format &&
              draft.quality,
          )
        : true;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [onClose]);

  function update(patch: Partial<Settings>) {
    setDraft((current) => ({
      ...current,
      ...patch,
    }));
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#090816]/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="w-full max-w-xl overflow-hidden rounded-[28px] border border-white/20 bg-[#F7F8F5] text-[#252B26] shadow-2xl"
      >
        <header className="border-b border-[#657166]/15 bg-white px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.2em] text-violet-600">
                ANIMATION SETTINGS
              </p>

              <h2
                id="settings-title"
                className="mt-1 text-xl font-semibold"
              >
                Customize your creation
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="rounded-full p-2 text-[#657166] transition hover:bg-[#EDF0EA]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="mt-5 flex items-center gap-1"
            aria-label={`Step ${step} of 4`}
          >
            {titles.map((title, index) => (
              <div
                key={title}
                className="flex flex-1 items-center gap-1"
              >
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    index + 1 <= step
                      ? "bg-violet-600"
                      : "bg-[#DDE4DE]"
                  }`}
                />

                <span
                  className={`hidden text-[10px] font-semibold sm:block ${
                    index + 1 === step
                      ? "text-violet-700"
                      : "text-[#8A988D]"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </header>

        <div className="max-h-[65vh] overflow-y-auto px-5 py-6 sm:px-7">
          <div
            key={step}
            className="animate-[fadeSlide_.25s_ease-out]"
          >
            {step === 1 && (
              <>
                <h3 className="text-2xl font-semibold">
                  Choose your animation style.
                </h3>

                <p className="mt-2 text-sm text-[#657166]">
                  Select the visual world you want to bring
                  to life.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {styleOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={
                        draft.style === option.label
                      }
                      onClick={() =>
                        update({ style: option.label })
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        draft.style === option.label
                          ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                          : "border-[#657166]/15 bg-white hover:border-violet-300"
                      }`}
                    >
                      <span className="text-2xl">
                        {option.icon}
                      </span>

                      <span className="mt-3 block text-sm font-semibold">
                        {option.label}
                      </span>

                      <span className="mt-1 block text-xs text-[#657166]">
                        {option.description}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-2xl font-semibold">
                  Configure your video.
                </h3>

                <p className="mt-2 text-sm text-[#657166]">
                  Choose the duration, format and quality
                  of your animation.
                </p>

                <ConfigGroup
                  label="Duration"
                  icon={<Clock3 className="h-4 w-4" />}
                  options={durationOptions.map(
                    (option) => option.label,
                  )}
                  value={draft.duration}
                  onSelect={(value) =>
                    update({ duration: value })
                  }
                />

                <ConfigGroup
                  label="Aspect Ratio"
                  icon={<Plus className="h-4 w-4" />}
                  options={formatOptions}
                  value={draft.format}
                  onSelect={(value) =>
                    update({ format: value })
                  }
                  preview
                />

                <ConfigGroup
                  label="Resolution"
                  icon={<Sparkles className="h-4 w-4" />}
                  options={qualityOptions}
                  value={draft.quality}
                  onSelect={(value) =>
                    update({ quality: value })
                  }
                />
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-2xl font-semibold">
                  Bring your animation to life with sound.
                </h3>

                <p className="mt-2 text-sm text-[#657166]">
                  Choose the audio experience you want for
                  your animation.
                </p>

                <div className="mt-6 space-y-3">
                  <SoundRow
                    icon={<Volume2 className="h-5 w-5" />}
                    title="Voiceover"
                    description="Include narration in your animation."
                    checked={draft.narration}
                    onChange={() =>
                      update({
                        narration: !draft.narration,
                      })
                    }
                  />

                  <SoundRow
                    icon={<Music2 className="h-5 w-5" />}
                    title="Background music"
                    description="Include background music in your animation."
                    checked={draft.music}
                    onChange={() =>
                      update({
                        music: !draft.music,
                      })
                    }
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="text-2xl font-semibold">
                  Your animation configuration.
                </h3>

                <p className="mt-2 text-sm text-[#657166]">
                  Review your selected preferences before
                  saving.
                </p>

                <div className="mt-5 space-y-3">
                  <SummaryRow
                    title="Visual Style"
                    value={draft.style}
                    onEdit={() => setStep(1)}
                  />

                  <SummaryRow
                    title="Video Configuration"
                    value={`${draft.duration} · ${draft.format} · ${draft.quality}`}
                    onEdit={() => setStep(2)}
                  />

                  <SummaryRow
                    title="Audio Preferences"
                    value={`${
                      draft.narration
                        ? "Voiceover enabled"
                        : "Voiceover disabled"
                    } · ${
                      draft.music
                        ? "Music enabled"
                        : "Music disabled"
                    }`}
                    onEdit={() => setStep(3)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#657166]/15 bg-white px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={
              step === 1
                ? onClose
                : () => setStep((current) => current - 1)
            }
            className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-[#657166] transition hover:bg-[#EDF0EA]"
          >
            {step === 1 ? (
              "Cancel"
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                Back
              </>
            )}
          </button>

          {step < 4 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() =>
                setStep((current) => current + 1)
              }
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSave(draft)}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

// ------------------------------------------------------
// MAIN CREATE ANIMATION PAGE
// ------------------------------------------------------

export default function CreateAnimationPage() {
  const [prompt, setPrompt] = useState("");

  const [style, setStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("30 seconds");

  const [openDropdown, setOpenDropdown] = useState<
    string | null
  >(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const [saved, setSaved] = useState<Settings>({
    style: "3D Animation",
    duration: "30 seconds",
    format: "16:9",
    quality: "1080p",
    narration: false,
    music: false,
  });

  const timer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // ----------------------------------------------------
  // FEEDBACK HELPERS
  // ----------------------------------------------------

  function resetFeedback() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    setStatus("idle");
    setMessage("");
  }

  function toggleDropdown(name: string) {
    setOpenDropdown((current) =>
      current === name ? null : name,
    );
  }

  // ----------------------------------------------------
  // PREPARATION
  // ----------------------------------------------------

  function handlePrepare() {

    if (status === "loading") return;

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!prompt.trim()) {
      setStatus("error");
      setMessage(
        "Describe your animation idea first.",
      );
      return;
    }

    setStatus("loading");
    setMessage("Preparing your animation concept…");

    // UI preparation simulation only.
    // Actual AI video generation has not been connected.
    timer.current = setTimeout(() => {
      setStatus("success");

      setMessage(
        "Your animation concept is ready! Your configuration has been prepared and is awaiting AI generation integration.",
      );

      timer.current = null;
    }, 900);
  }

  // ----------------------------------------------------
  // QUICK ACTIONS
  // ----------------------------------------------------

  function handleQuickAction(value: string) {
    resetFeedback();

    setPrompt(value);

    requestAnimationFrame(() => {
      document
        .getElementById("animation-prompt")
        ?.focus();
    });
  }

  // ----------------------------------------------------
  // DROPDOWN SELECTIONS
  // ----------------------------------------------------

  function changeStyle(value: string) {
    setStyle(value);

    setSaved((current) => ({
      ...current,
      style: value,
    }));

    resetFeedback();
  }

  function changeDuration(value: string) {
    setDuration(value);

    setSaved((current) => ({
      ...current,
      duration: value,
    }));

    resetFeedback();
  }

  // ----------------------------------------------------
  // SAVE SETTINGS
  // ----------------------------------------------------

  function saveSettings(next: Settings) {
    setSaved(next);

    setModalOpen(false);

    setStatus("success");

    setMessage(
      "Settings saved successfully. Your animation preferences are ready.",
    );
  }

  // ----------------------------------------------------
  // PAGE UI
  // ----------------------------------------------------

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
      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/25 via-transparent to-cyan-950/20" />

        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />
      </div>

      {/* MAIN CREATION WORKSPACE */}

      <div className="relative z-10 mx-auto flex max-h-full w-full max-w-[1000px] flex-col items-center justify-center">

        {/* MAIN HEADING */}

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
            Every masterpiece begins with an idea.
            Describe yours and let&apos;s bring it to life.
          </p>
        </div>

        {/* PROMPT COMPOSER */}

        <div className="w-full rounded-[24px] border border-white/15 bg-[#F7F8F5]/95 p-3 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 focus-within:border-violet-400/60 sm:rounded-[32px] sm:p-5">

          {/* PROMPT INPUT + SEND BUTTON */}

          <div className="relative">
            <label
              htmlFor="animation-prompt"
              className="sr-only"
            >
              Describe your animation idea
            </label>

            <textarea
              id="animation-prompt"
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                resetFeedback();
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing &&
                  event.nativeEvent.keyCode !== 229
                ) {
                  event.preventDefault();
                  handlePrepare();
                }
              }}
              placeholder="Imagine a world where..."
              rows={3}
              className="min-h-[90px] w-full resize-none border-0 bg-transparent px-3 py-3 pr-16 text-base leading-8 text-[#303830] outline-none placeholder:text-[#657166]/60 focus:ring-0 sm:min-h-[115px] sm:px-4 sm:pr-20 sm:text-lg"
            />

            {/* SEND ARROW BUTTON - TOP RIGHT */}

            <button
              type="button"
              onClick={handlePrepare}
              disabled={status === "loading"}
              aria-label="Send animation prompt"
              className="absolute right-2 top-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-[0_6px_25px_rgba(124,58,237,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_35px_rgba(124,58,237,0.5)] active:scale-95 disabled:cursor-wait disabled:opacity-70 sm:right-3 sm:top-3 sm:h-12 sm:w-12"
            >
              {status === "loading" ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <ArrowRight
                  className="h-6 w-6"
                  strokeWidth={2.5}
                />
              )}
            </button>
          </div>

          {/* COMPOSER TOOLBAR */}

          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#657166]/15 px-1 pt-3 sm:px-2 sm:pt-4">
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">

              {/* STYLE DROPDOWN */}
              <GalaxyDropdown
                id="animation-style"
                label="Style"
                icon="🎨"
                value={style}
                options={styleOptions}
                open={openDropdown === "style"}
                onToggle={() => toggleDropdown("style")}
                onSelect={(value) => {
                  changeStyle(value);
                  setOpenDropdown(null);
                }}
              />
          {/* DURATION DROPDOWN */}
              <GalaxyDropdown
                id="animation-duration"
                label="Duration"
                icon="⏱️"
                value={duration}
                options={durationOptions}
                open={openDropdown === "duration"}
                onToggle={() => toggleDropdown("duration")}
                onSelect={(value) => {
                  changeDuration(value);
                  setOpenDropdown(null);
                }}
              />

              {/* SETTINGS BUTTON */}

              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setModalOpen(true);
                }}
                aria-label="Open animation settings"
                className="flex h-12 shrink-0 items-center gap-2 rounded-2xl border border-[#657166]/20 bg-white px-4 text-sm font-semibold text-[#405346] transition hover:border-violet-300 hover:text-violet-700"
              >
                <Settings2 className="h-4 w-4" />
                 <span>Settings</span>
              </button>

            </div>
          </div>

          {/* FEEDBACK */}

          {message && (
            <div
              role={
                status === "error" ? "alert" : "status"
              }
              aria-live="polite"
              className={`mx-2 mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium leading-6 ${
                status === "error"
                  ? "bg-rose-100 text-rose-800"
                  : status === "success"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-violet-100 text-violet-800"
              }`}
            >
              {status === "loading" && (
                <Loader2 className="mt-1 h-4 w-4 shrink-0 animate-spin" />
              )}

              {status === "success" && (
                <Check className="mt-1 h-4 w-4 shrink-0" />
              )}

              {message}

              {status === "error" && (
                <button
                  type="button"
                  onClick={resetFeedback}
                  aria-label="Dismiss error"
                  className="ml-auto shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-5 grid w-full grid-cols-1 gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() =>
                handleQuickAction(action.prompt)
              }
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

      {/* SETTINGS MODAL */}

      {modalOpen && (
        <SettingsModal
          saved={saved}
          onSave={saveSettings}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* EXISTING NAVIGATION INTEGRATION */}

      <AnimationPageReady />
    </main>
  );
}
