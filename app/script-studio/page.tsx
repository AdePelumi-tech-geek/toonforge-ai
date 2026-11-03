
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimationPageReady } from "@/app/components/animation-navigation-provider";

type ScriptMode = "personal" | "animation" | null;
type Stage = "setup" | "editor";

type Scene = {
  id: number;
  title: string;
  visual: string;
  dialogue: string;
};

export default function ScriptStudioPage() {
  const router = useRouter();

  const [mode, setMode] = useState<ScriptMode>(null);
  const [stage, setStage] = useState<Stage>("setup");
  const [showModeModal, setShowModeModal] = useState(false);
  const [notice, setNotice] = useState("");

  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState("Adventure");
  const [tone, setTone] = useState("Inspirational");

  const [personalScript, setPersonalScript] = useState("");

  const [visualStyle, setVisualStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("1–2 minutes");

  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 1,
      title: "Opening Scene",
      visual: "",
      dialogue: "",
    },
  ]);

  const chooseMode = (selectedMode: ScriptMode) => {
    setMode(selectedMode);
    setStage("setup");
    setShowModeModal(false);
    setNotice("");
  };

  const returnToChooser = () => {
    setMode(null);
    setStage("setup");
    setShowModeModal(false);
    setNotice("");
  };

  const openEditor = () => {
    if (!title.trim() || !idea.trim()) {
      setNotice("Please add a script title and story idea first.");
      return;
    }

    setNotice("");
    setStage("editor");
  };

  const addScene = () => {
    setScenes((current) => [
      ...current,
      {
        id:
          current.length > 0
            ? Math.max(...current.map((scene) => scene.id)) + 1
            : 1,
        title: `Scene ${current.length + 1}`,
        visual: "",
        dialogue: "",
      },
    ]);
  };

  const updateScene = (
    id: number,
    field: keyof Scene,
    value: string
  ) => {
    setScenes((current) =>
      current.map((scene) =>
        scene.id === id ? { ...scene, [field]: value } : scene
      )
    );
  };

  const removeScene = (id: number) => {
    setScenes((current) =>
      current.length > 1
        ? current.filter((scene) => scene.id !== id)
        : current
    );
  };

  const saveDraft = () => {
    setNotice(
      "Your work is still available in this session. Permanent draft saving will be connected later."
    );
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F7F5EF] px-4 py-8 text-[#252238] sm:px-7 lg:px-10">
      <AnimationPageReady />

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#DCD1FA]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#D8E9DF]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* PAGE INTRO */}
        {/* <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#9479E8]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8275A8]">
              Your creative workspace
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Script Studio<span className="text-[#9479E8]">.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#777386] sm:text-base">
            Every great animation starts with a story. Bring your ideas to
            life, develop your characters, and turn your imagination into
            something worth sharing.
          </p>
        </section> */}

        {/* WELCOME SCREEN */}
        {mode === null ? (
          <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden rounded-[30px] border border-[#E9E4F1] bg-[#29243D] px-6 py-16 text-center shadow-xl sm:px-12">

            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#9479E8]/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#A9CDB7]/20 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

            <div className="relative z-10 mx-auto max-w-2xl">

              <div className="studio-fade-in mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/10 bg-white/10 text-4xl text-[#C5B5FF] shadow-2xl backdrop-blur-xl">
                ✦
              </div>

              <p className="studio-fade-in studio-delay-1 mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#C5B5FF]">
                Your creative journey starts here
              </p>

              <h2 className="studio-fade-in studio-delay-2 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                Welcome to
                <span className="mt-2 block bg-gradient-to-r from-[#C5B5FF] to-[#A9CDB7] bg-clip-text text-transparent">
                  ToonForge Script Studio.
                </span>
              </h2>

              <p className="studio-fade-in studio-delay-3 mx-auto mt-7 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
                Every great animation begins with an idea. Explore your
                imagination, develop your stories, and give your creativity
                a place to grow.
              </p>

              <div className="studio-fade-in studio-delay-4 mt-10">
                <button
                  type="button"
                  onClick={() => setShowModeModal(true)}
                  className="group inline-flex items-center gap-4 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#29243D] shadow-[0_10px_40px_rgba(197,181,255,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#C5B5FF] hover:shadow-[0_15px_45px_rgba(197,181,255,0.3)]"
                >
                  Create your script
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              <div className="studio-fade-in studio-delay-4 mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
                <span className="flex items-center gap-2">
                  <span className="text-[#C5B5FF]">✦</span>
                  Create stories
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#C5B5FF]">✧</span>
                  Explore ideas
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[#C5B5FF]">✦</span>
                  Build animations
                </span>
              </div>
            </div>

            {/* SCRIPT TYPE MODAL */}
            {showModeModal && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#171425]/75 p-4 backdrop-blur-md"
                onClick={() => setShowModeModal(false)}
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="script-modal-title"
                  onClick={(event) => event.stopPropagation()}
                  className="studio-modal-in relative my-auto w-full max-w-2xl rounded-[28px] border border-[#EAE5F2] bg-[#FCFBFD] p-6 text-left shadow-2xl sm:p-9"
                >
                  <button
                    type="button"
                    onClick={() => setShowModeModal(false)}
                    aria-label="Close script type selection"
                    className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EDF5] text-lg text-[#777084] transition hover:bg-[#E8E1F5] hover:text-[#29243D]"
                  >
                    ×
                  </button>

                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9479E8]">
                    Choose your creative path
                  </p>

                  <h3
                    id="script-modal-title"
                    className="pr-8 text-2xl font-bold text-[#29243D] sm:text-3xl"
                  >
                    What kind of script are we creating?
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-[#858091]">
                    Choose the experience that matches your idea. We&apos;ll
                    set up the right workspace for you.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    {/* PERSONAL SCRIPT */}
                    <button
                      type="button"
                      onClick={() => chooseMode("personal")}
                      className="group rounded-2xl border border-[#E9E4F1] bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#9479E8] hover:shadow-lg sm:p-6"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EBFC] text-2xl text-[#806AC0]">
                        ✎
                      </div>

                      <h4 className="text-lg font-bold text-[#29243D]">
                        Personal Script
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-[#858091]">
                        A flexible space to write stories, explore ideas, and
                        express your creativity without animation-specific
                        settings.
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#F0EDF4] pt-4 text-sm font-semibold text-[#806AC0]">
                        Choose personal
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </button>

                    {/* ANIMATION SCRIPT */}
                    <button
                      type="button"
                      onClick={() => chooseMode("animation")}
                      className="group rounded-2xl border border-[#29243D] bg-[#29243D] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-[#9479E8] hover:shadow-xl sm:p-6"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-[#C5B5FF]">
                        ✧
                      </div>

                      <h4 className="text-lg font-bold text-white">
                        Script for Animation
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-white/60">
                        Create a structured screenplay with scenes, dialogue,
                        and visual directions for your ToonForge animation.
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-[#C5B5FF]">
                        Choose animation
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </button>
                  </div>

                  <p className="mt-7 text-center text-xs text-[#A29BAD]">
                    You can change your selection whenever you need to.
                  </p>
                </div>
              </div>
            )}
          </section>
        ) : (

          /* SELECTED WORKSPACE */
          <section className="relative">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={returnToChooser}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#81778F] transition hover:text-[#806AC0]"
              >
                <span>←</span>
                Change script type
              </button>

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  mode === "personal"
                    ? "bg-[#F0EBFC] text-[#806AC0]"
                    : "bg-[#29243D] text-white"
                }`}
              >
                {mode === "personal" ? "Personal Script" : "Animation Script"}
              </span>
            </div>

            {/* SETUP */}
            {stage === "setup" ? (
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

                <div className="rounded-[26px] border border-[#E9E4F1] bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9479E8]">
                      {mode === "personal"
                        ? "Your story begins here"
                        : "Prepare your screenplay"}
                    </p>

                    <h2 className="text-2xl font-bold">
                      {mode === "personal"
                        ? "Let's start with an idea."
                        : "Let's build your animation story."}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#858091]">
                      {mode === "personal"
                        ? "Give your story a direction. You can develop everything else inside the editor."
                        : "Tell us about your story and set a few creative details before arranging your scenes."}
                    </p>
                  </div>

                  <div className="space-y-6">

                    <div>
                      <label
                        htmlFor="script-title"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Script title
                      </label>

                      <input
                        id="script-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Give your story a name..."
                        className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#B0AABC] focus:border-[#9479E8] focus:ring-4 focus:ring-[#9479E8]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="story-idea"
                        className="mb-2 block text-sm font-semibold"
                      >
                        {mode === "personal"
                          ? "What's your story about?"
                          : "Your story idea"}
                      </label>

                      <textarea
                        id="story-idea"
                        value={idea}
                        onChange={(event) => setIdea(event.target.value)}
                        rows={5}
                        placeholder={
                          mode === "personal"
                            ? "Start with a thought, a character, or a story you've always wanted to tell..."
                            : "Describe the story you want to turn into an animation..."
                        }
                        className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-[#B0AABC] focus:border-[#9479E8] focus:ring-4 focus:ring-[#9479E8]/10"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="genre"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Genre
                        </label>

                        <select
                          id="genre"
                          value={genre}
                          onChange={(event) => setGenre(event.target.value)}
                          className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none focus:border-[#9479E8]"
                        >
                          <option>Adventure</option>
                          <option>Comedy</option>
                          <option>Drama</option>
                          <option>Fantasy</option>
                          <option>Action</option>
                          <option>Science Fiction</option>
                          <option>Mystery</option>
                          <option>Romance</option>
                          <option>Documentary</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="tone"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Story tone
                        </label>

                        <select
                          id="tone"
                          value={tone}
                          onChange={(event) => setTone(event.target.value)}
                          className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none focus:border-[#9479E8]"
                        >
                          <option>Inspirational</option>
                          <option>Funny</option>
                          <option>Dramatic</option>
                          <option>Emotional</option>
                          <option>Suspenseful</option>
                          <option>Lighthearted</option>
                          <option>Dark</option>
                        </select>
                      </div>
                    </div>

                    {mode === "animation" && (
                      <div className="grid gap-5 border-t border-[#F0EDF4] pt-6 sm:grid-cols-2">

                        <div>
                          <label
                            htmlFor="visual-style"
                            className="mb-2 block text-sm font-semibold"
                          >
                            Visual style
                          </label>

                          <select
                            id="visual-style"
                            value={visualStyle}
                            onChange={(event) =>
                              setVisualStyle(event.target.value)
                            }
                            className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none focus:border-[#9479E8]"
                          >
                            <option>3D Animation</option>
                            <option>2D Cartoon</option>
                            <option>Anime</option>
                            <option>Comic Style</option>
                            <option>Storybook</option>
                            <option>Realistic</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="duration"
                            className="mb-2 block text-sm font-semibold"
                          >
                            Target duration
                          </label>

                          <select
                            id="duration"
                            value={duration}
                            onChange={(event) =>
                              setDuration(event.target.value)
                            }
                            className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none focus:border-[#9479E8]"
                          >
                            <option>Under 1 minute</option>
                            <option>1–2 minutes</option>
                            <option>3–5 minutes</option>
                            <option>5–10 minutes</option>
                            <option>10+ minutes</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {notice && (
                    <p className="mt-5 rounded-xl bg-[#FFF4E8] px-4 py-3 text-sm text-[#9A642D]">
                      {notice}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#F0EDF4] pt-6">
                    <p className="text-xs text-[#A29BAD]">
                      You can edit these details later.
                    </p>

                    <button
                      type="button"
                      onClick={openEditor}
                      className="rounded-xl bg-[#29243D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#29243D]/10 transition hover:-translate-y-0.5 hover:bg-[#40365D]"
                    >
                      Open Script Editor →
                    </button>
                  </div>
                </div>

                <aside className="h-fit rounded-[26px] bg-[#29243D] p-6 text-white">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
                    ✦
                  </div>

                  <h3 className="text-lg font-bold">
                    {mode === "personal"
                      ? "A space for your imagination."
                      : "Think scene by scene."}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {mode === "personal"
                      ? "There are no animation requirements here. Write at your own pace and let your ideas develop naturally."
                      : "A good animation script brings together what the audience sees, what characters say, and how each moment unfolds."}
                  </p>

                  <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                    {(mode === "personal"
                      ? [
                          "Develop your story",
                          "Write in your own style",
                          "Edit whenever you want",
                        ]
                      : [
                          "Organise your scenes",
                          "Add visual descriptions",
                          "Write character dialogue",
                        ]
                    ).map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-[#C5B5FF]">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white/75">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            ) : (

              /* EDITOR */
              <div className="space-y-6">

                <div className="flex flex-wrap items-start justify-between gap-4 rounded-[24px] border border-[#E9E4F1] bg-white p-6 sm:p-7">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9479E8]">
                      {mode === "personal"
                        ? "Personal writing workspace"
                        : "Animation screenplay workspace"}
                    </p>

                    <h2 className="text-2xl font-bold">{title}</h2>

                    <p className="mt-2 text-sm text-[#858091]">
                      {genre} · {tone}
                      {mode === "animation"
                        ? ` · ${visualStyle} · ${duration}`
                        : ""}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={saveDraft}
                    className="rounded-xl border border-[#E8E4EF] px-5 py-3 text-sm font-semibold text-[#665C7A] transition hover:border-[#9479E8] hover:text-[#806AC0]"
                  >
                    Save draft
                  </button>
                </div>

                {mode === "personal" ? (
                  <div className="rounded-[24px] border border-[#E9E4F1] bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold">Your script</h3>
                        <p className="mt-1 text-sm text-[#9992A3]">
                          Write freely. This space is yours.
                        </p>
                      </div>

                      <span className="rounded-full bg-[#F5F2FA] px-3 py-1.5 text-xs text-[#806AC0]">
                        Writing mode
                      </span>
                    </div>

                    <textarea
                      value={personalScript}
                      onChange={(event) =>
                        setPersonalScript(event.target.value)
                      }
                      placeholder={`Your story starts here...

Write your opening scene, introduce your characters, or simply get your ideas down. There is no fixed format.`}
                      className="min-h-[430px] w-full resize-y rounded-2xl border border-[#EEEAF3] bg-[#FCFBFD] p-5 text-sm leading-8 text-[#39334B] outline-none transition placeholder:text-[#B0AABC] focus:border-[#9479E8] focus:ring-4 focus:ring-[#9479E8]/10 sm:p-7"
                    />
                  </div>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-[260px_1fr]">

                    {/* SCENE NAVIGATION */}
                    <aside className="h-fit rounded-[24px] border border-[#E9E4F1] bg-white p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">Scenes</h3>
                          <p className="mt-1 text-xs text-[#9992A3]">
                            {scenes.length} scene
                            {scenes.length === 1 ? "" : "s"} added
                          </p>
                        </div>

                        <span className="rounded-lg bg-[#F0EBFC] px-2.5 py-1.5 text-xs font-bold text-[#806AC0]">
                          {scenes.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {scenes.map((scene, index) => (
                          <div
                            key={scene.id}
                            className="flex items-center gap-2"
                          >
                            <div
                              className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                                index === 0
                                  ? "bg-[#F0EBFC] font-semibold text-[#7259B2]"
                                  : "bg-[#FAF9FC] text-[#777084]"
                              }`}
                            >
                              <span className="text-xs opacity-60">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="truncate">{scene.title}</span>
                            </div>

                            {scenes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeScene(scene.id)}
                                aria-label={`Remove ${scene.title}`}
                                className="rounded-lg px-2 py-2 text-xs text-[#A29BAD] transition hover:bg-red-50 hover:text-red-500"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addScene}
                        className="mt-4 w-full rounded-xl border border-dashed border-[#CFC4E8] px-4 py-3 text-sm font-semibold text-[#806AC0] transition hover:bg-[#F8F5FD]"
                      >
                        + Add new scene
                      </button>
                    </aside>

                    {/* SCENE EDITING */}
                    <div className="space-y-5">
                      {scenes.map((scene, index) => (
                        <article
                          key={scene.id}
                          className="rounded-[24px] border border-[#E9E4F1] bg-white p-6 shadow-sm sm:p-7"
                        >
                          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9479E8]">
                                Scene {String(index + 1).padStart(2, "0")}
                              </p>

                              <h3 className="mt-1 text-lg font-bold">
                                Scene details
                              </h3>
                            </div>

                            <span className="rounded-full bg-[#F5F2FA] px-3 py-1.5 text-xs text-[#806AC0]">
                              Screenplay
                            </span>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <label
                                htmlFor={`scene-title-${scene.id}`}
                                className="mb-2 block text-sm font-semibold"
                              >
                                Scene title
                              </label>

                              <input
                                id={`scene-title-${scene.id}`}
                                value={scene.title}
                                onChange={(event) =>
                                  updateScene(
                                    scene.id,
                                    "title",
                                    event.target.value
                                  )
                                }
                                placeholder="e.g. The Beginning"
                                className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm outline-none focus:border-[#9479E8]"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`scene-visual-${scene.id}`}
                                className="mb-2 block text-sm font-semibold"
                              >
                                Visual direction
                              </label>

                              <p className="mb-2 text-xs text-[#9992A3]">
                                Describe what the audience sees in this scene.
                              </p>

                              <textarea
                                id={`scene-visual-${scene.id}`}
                                value={scene.visual}
                                onChange={(event) =>
                                  updateScene(
                                    scene.id,
                                    "visual",
                                    event.target.value
                                  )
                                }
                                rows={4}
                                placeholder="Describe the setting, characters, actions, camera perspective, and important visual details..."
                                className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`scene-dialogue-${scene.id}`}
                                className="mb-2 block text-sm font-semibold"
                              >
                                Dialogue and narration
                              </label>

                              <p className="mb-2 text-xs text-[#9992A3]">
                                What do the characters say? Is there a narrator?
                              </p>

                              <textarea
                                id={`scene-dialogue-${scene.id}`}
                                value={scene.dialogue}
                                onChange={(event) =>
                                  updateScene(
                                    scene.id,
                                    "dialogue",
                                    event.target.value
                                  )
                                }
                                rows={4}
                                placeholder={`CHARACTER: Write dialogue here...

NARRATOR: Add narration here...`}
                                className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                              />
                            </div>
                          </div>
                        </article>
                      ))}

                      <button
                        type="button"
                        onClick={addScene}
                        className="w-full rounded-2xl border border-dashed border-[#CFC4E8] bg-white/60 px-5 py-4 text-sm font-semibold text-[#806AC0] transition hover:bg-white"
                      >
                        + Add another scene
                      </button>
                    </div>
                  </div>
                )}

                {notice && (
                  <p className="rounded-xl bg-[#F0EBFC] px-4 py-3 text-sm text-[#7259B2]">
                    {notice}
                  </p>
                )}

                <div className="flex flex-col justify-between gap-4 rounded-[24px] border border-[#E9E4F1] bg-white p-6 sm:flex-row sm:items-center sm:p-7">
                  <div>
                    <h3 className="font-bold">Keep building your story.</h3>
                    <p className="mt-1 text-sm text-[#858091]">
                      {mode === "personal"
                        ? "Your personal writing workspace is ready whenever inspiration strikes."
                        : "Your screenplay is taking shape. Continue refining it or move to the animation workspace."}
                    </p>
                  </div>

                  {mode === "animation" && (
                    <button
                      type="button"
                      onClick={() => router.push("/create-animation")}
                      className="shrink-0 rounded-xl bg-[#29243D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#40365D]"
                    >
                      Continue to Create Animation →
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* PAGE ANIMATIONS */}
      <style jsx>{`
        @keyframes studioFadeIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes studioModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .studio-fade-in {
          opacity: 0;
          animation: studioFadeIn 0.8s ease forwards;
        }

        .studio-delay-1 {
          animation-delay: 0.2s;
        }

        .studio-delay-2 {
          animation-delay: 0.45s;
        }

        .studio-delay-3 {
          animation-delay: 0.7s;
        }

        .studio-delay-4 {
          animation-delay: 0.95s;
        }

        .studio-modal-in {
          animation: studioModalIn 0.3s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .studio-fade-in,
          .studio-modal-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
