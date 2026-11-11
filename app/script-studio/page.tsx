
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimationPageReady,
} from "@/app/components/animation-navigation-provider";

type Stage = "setup" | "editor";

type Scene = {
  id: number;
  title: string;
  purpose: string;
  visual: string;
  action: string;
  camera: string;
  dialogue: string;
  transition: string;
};

const genres = [
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Action",
  "Science Fiction",
  "Mystery",
  "Educational",
];

const tones = [
  "Inspirational",
  "Funny",
  "Dramatic",
  "Emotional",
  "Suspenseful",
  "Lighthearted",
  "Dark",
];

const visualStyles = [
  "3D Animation",
  "2D Cartoon",
  "Anime",
  "Stop Motion",
  "Storybook",
  "Comic Style",
];

const durations = [
  "15 seconds",
  "30 seconds",
  "1 minute",
  "1–2 minutes",
  "3–5 minutes",
  "5–10 minutes",
];

const createScene = (id: number): Scene => ({
  id,
  title: `Scene ${id}`,
  purpose: "",
  visual: "",
  action: "",
  camera: "",
  dialogue: "",
  transition: "",
});

export default function ScriptStudioPage() {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("setup");
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState("Adventure");
  const [tone, setTone] = useState("Inspirational");
  const [visualStyle, setVisualStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("1 minute");

  const [scenes, setScenes] = useState<Scene[]>([createScene(1)]);
  const [activeScene, setActiveScene] = useState(1);
  const [notice, setNotice] = useState("");
  const [showReview, setShowReview] = useState(false);

  const currentScene =
    scenes.find((scene) => scene.id === activeScene) ?? scenes[0];

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

  const addScene = () => {
    const nextId =
      scenes.length > 0
        ? Math.max(...scenes.map((scene) => scene.id)) + 1
        : 1;

    setScenes((current) => [...current, createScene(nextId)]);
    setActiveScene(nextId);
    setNotice("");
  };

  const removeScene = (id: number) => {
    if (scenes.length === 1) return;

    const remaining = scenes.filter((scene) => scene.id !== id);
    setScenes(remaining);

    if (activeScene === id) {
      setActiveScene(remaining[0].id);
    }
  };

  const openEditor = () => {
    if (!title.trim() || !idea.trim()) {
      setNotice("Add a title and describe your animation idea first.");
      return;
    }

    setNotice("");
    setStage("editor");
  };

  const approveScript = () => {
    const script = {
      title: title.trim(),
      idea: idea.trim(),
      genre,
      tone,
      visualStyle,
      duration,
      scenes,
      approved: true,
      updatedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(
        "toonforge-approved-animation-script",
        JSON.stringify(script)
      );

      router.push("/create-animation");
    } catch {
      setNotice(
        "We couldn't transfer your script. Please try again."
      );
    }
  };

  const sceneComplete = (scene: Scene) =>
    Boolean(
      scene.title.trim() &&
        scene.visual.trim() &&
        scene.action.trim()
    );

  const completedScenes = scenes.filter(sceneComplete).length;

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F7F5EF] px-4 py-7 text-[#29243D] sm:px-7 lg:px-10">
      <AnimationPageReady />

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#DCD1FA]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#D8E9DF]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {stage === "setup" ? (
          <section className="flex min-h-[75vh] items-center justify-center">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#29243D] px-6 py-12 shadow-2xl sm:px-10 lg:px-14 lg:py-16">
              <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#9479E8]/25 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#A9CDB7]/20 blur-[100px]" />

              <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
                <div>
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl text-[#C5B5FF]">
                    ✦
                  </div>

                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#C5B5FF]">
                    ToonForge Creative Workspace
                  </p>

                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Animating time&apos;?
                    <span className="mt-2 block bg-gradient-to-r from-[#C5B5FF] to-[#A9CDB7] bg-clip-text text-transparent">
                      <p>Let&apos;s start scripting</p>
                    </span>
                  </h1>

                  <p className="mt-6 max-w-lg text-sm leading-8 text-white/60 sm:text-base">
                    Turn your idea into an animation plan. Build your
                    story scene by scene, define character actions,
                    describe visuals, and organise your dialogue.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3 text-xs text-white/55">
                    {[
                      "Scene planning",
                      "Visual direction",
                      "Character actions",
                      "Dialogue",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                      >
                        ✦ {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/[0.07] p-5 shadow-xl backdrop-blur-xl sm:p-7">
                  <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C5B5FF]">
                      Step 01 · Your idea
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      What are we creating?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      Start with the story you want to bring to life.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="script-title"
                        className="mb-2 block text-sm font-semibold text-white/85"
                      >
                        Animation title
                      </label>
                      <input
                        id="script-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="e.g. The Last Star"
                        className="w-full rounded-xl border border-white/10 bg-[#1E1A2E] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#A993F5] focus:ring-4 focus:ring-[#9479E8]/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="animation-idea"
                        className="mb-2 block text-sm font-semibold text-white/85"
                      >
                        Describe your animation idea
                      </label>
                      <textarea
                        id="animation-idea"
                        value={idea}
                        onChange={(event) => setIdea(event.target.value)}
                        rows={4}
                        placeholder="Tell us what happens in your story, who it`s about, and what you want viewers to experience..."
                        className="w-full resize-y rounded-xl border border-white/10 bg-[#1E1A2E] px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-[#A993F5] focus:ring-4 focus:ring-[#9479E8]/15"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="genre"
                          className="mb-2 block text-xs font-semibold text-white/70"
                        >
                          Genre
                        </label>
                        <select
                          id="genre"
                          value={genre}
                          onChange={(event) => setGenre(event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-[#1E1A2E] px-3 py-3 text-sm text-white outline-none focus:border-[#A993F5]"
                        >
                          {genres.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="tone"
                          className="mb-2 block text-xs font-semibold text-white/70"
                        >
                          Story tone
                        </label>
                        <select
                          id="tone"
                          value={tone}
                          onChange={(event) => setTone(event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-[#1E1A2E] px-3 py-3 text-sm text-white outline-none focus:border-[#A993F5]"
                        >
                          {tones.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="visual-style"
                          className="mb-2 block text-xs font-semibold text-white/70"
                        >
                          Visual style
                        </label>
                        <select
                          id="visual-style"
                          value={visualStyle}
                          onChange={(event) =>
                            setVisualStyle(event.target.value)
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#1E1A2E] px-3 py-3 text-sm text-white outline-none focus:border-[#A993F5]"
                        >
                          {visualStyles.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="duration"
                          className="mb-2 block text-xs font-semibold text-white/70"
                        >
                          Duration
                        </label>
                        <select
                          id="duration"
                          value={duration}
                          onChange={(event) => setDuration(event.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-[#1E1A2E] px-3 py-3 text-sm text-white outline-none focus:border-[#A993F5]"
                        >
                          {durations.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {notice && (
                    <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-200">
                      {notice}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={openEditor}
                    className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#29243D] transition hover:-translate-y-0.5 hover:bg-[#C5B5FF]"
                  >
                    Build my animation plan
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <p className="mt-4 text-center text-xs text-white/35">
                    Your creative direction can be adjusted later.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStage("setup");
                    setNotice("");
                  }}
                  className="mb-4 text-sm font-semibold text-[#887E9A] transition hover:text-[#806AC0]"
                >
                  ← Back to creative direction
                </button>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9479E8]">
                  ToonForge · Script Studio
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-[#858091]">
                  {genre} <span className="mx-1">·</span> {tone}
                  <span className="mx-1">·</span> {visualStyle}
                  <span className="mx-1">·</span> {duration}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#E9E4F1] bg-white px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EBFC] text-lg text-[#806AC0]">
                  ✦
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {completedScenes}/{scenes.length} scenes
                  </p>
                  <p className="text-xs text-[#9992A3]">
                    Visuals and actions added
                  </p>
                </div>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
              <aside className="h-fit rounded-[26px] border border-[#E9E4F1] bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9479E8]">
                    Your screenplay
                  </p>
                  <h2 className="mt-2 text-lg font-bold">Scene breakdown</h2>
                  <p className="mt-1 text-xs leading-5 text-[#9992A3]">
                    Organise your animation from beginning to end.
                  </p>
                </div>

                <div className="space-y-2">
                  {scenes.map((scene, index) => {
                    const selected = activeScene === scene.id;

                    return (
                      <div
                        key={scene.id}
                        className={`flex items-center gap-2 rounded-xl border p-2 transition ${
                          selected
                            ? "border-[#CFC2F1] bg-[#F5F1FD]"
                            : "border-transparent bg-[#FAF9FC] hover:border-[#E9E4F1]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveScene(scene.id)}
                          className="flex min-w-0 flex-1 items-center gap-3 p-2 text-left"
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                              selected
                                ? "bg-[#806AC0] text-white"
                                : "bg-white text-[#9289A2]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="min-w-0">
                            <span
                              className={`block truncate text-sm font-semibold ${
                                selected ? "text-[#7259B2]" : "text-[#5E586C]"
                              }`}
                            >
                              {scene.title || `Scene ${index + 1}`}
                            </span>
                            <span className="mt-1 block text-[10px] text-[#A29BAD]">
                              {sceneComplete(scene)
                                ? "Ready for review"
                                : "Needs details"}
                            </span>
                          </span>
                        </button>

                        {scenes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeScene(scene.id)}
                            aria-label={`Remove ${scene.title}`}
                            className="rounded-lg px-2 py-2 text-sm text-[#A29BAD] transition hover:bg-red-50 hover:text-red-500"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={addScene}
                  className="mt-4 w-full rounded-xl border border-dashed border-[#CFC4E8] px-4 py-3 text-sm font-semibold text-[#806AC0] transition hover:bg-[#F8F5FD]"
                >
                  + Add scene
                </button>

                <div className="mt-6 rounded-2xl bg-[#29243D] p-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C5B5FF]">
                    Story idea
                  </p>
                  <p className="mt-3 text-xs leading-6 text-white/65">
                    {idea}
                  </p>
                </div>
              </aside>

              <div className="min-w-0 space-y-5">
                {currentScene && (
                  <article className="rounded-[26px] border border-[#E9E4F1] bg-white p-5 shadow-sm sm:p-8">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9479E8]">
                          Scene{" "}
                          {String(
                            scenes.findIndex(
                              (scene) => scene.id === currentScene.id
                            ) + 1
                          ).padStart(2, "0")}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                          Shape this scene.
                        </h2>
                        <p className="mt-2 text-sm text-[#9992A3]">
                          Define what happens and how the audience experiences it.
                        </p>
                      </div>

                      <span className="rounded-full bg-[#F0EBFC] px-4 py-2 text-xs font-semibold text-[#806AC0]">
                        Scene planner
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="scene-title"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Scene title
                        </label>
                        <input
                          id="scene-title"
                          value={currentScene.title}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="e.g. The Unexpected Discovery"
                          className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none transition focus:border-[#9479E8] focus:ring-4 focus:ring-[#9479E8]/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="scene-purpose"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Scene purpose
                        </label>
                        <p className="mb-2 text-xs text-[#9992A3]">
                          What should this scene achieve in the story?
                        </p>
                        <textarea
                          id="scene-purpose"
                          value={currentScene.purpose}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "purpose",
                              event.target.value
                            )
                          }
                          rows={2}
                          placeholder="Introduce a character, reveal something important, create tension..."
                          className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                        />
                      </div>

                      <div className="rounded-2xl border border-[#EEEAF5] bg-[#FAF9FC] p-4 sm:p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBFC] text-[#806AC0]">
                            ◈
                          </span>
                          <div>
                            <h3 className="text-sm font-bold">Visual direction</h3>
                            <p className="text-xs text-[#9992A3]">
                              What the audience sees.
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={currentScene.visual}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "visual",
                              event.target.value
                            )
                          }
                          rows={4}
                          placeholder="Describe the environment, lighting, colours, character appearance, background and important visual details..."
                          className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                        />
                      </div>

                      <div className="rounded-2xl border border-[#EEEAF5] bg-[#FAF9FC] p-4 sm:p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#648A72]">
                            ✧
                          </span>
                          <div>
                            <h3 className="text-sm font-bold">
                              Character actions and expressions
                            </h3>
                            <p className="text-xs text-[#9992A3]">
                              What characters do and how they react.
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={currentScene.action}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "action",
                              event.target.value
                            )
                          }
                          rows={4}
                          placeholder="Describe movements, gestures, facial expressions, reactions and interactions..."
                          className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="scene-camera"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Camera direction
                        </label>
                        <p className="mb-2 text-xs text-[#9992A3]">
                          How should the scene be framed or filmed?
                        </p>
                        <textarea
                          id="scene-camera"
                          value={currentScene.camera}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "camera",
                              event.target.value
                            )
                          }
                          rows={2}
                          placeholder="Wide shot, close-up, tracking shot, overhead view..."
                          className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="scene-dialogue"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Dialogue and narration
                        </label>
                        <p className="mb-2 text-xs text-[#9992A3]">
                          Add character speech, narration or sound cues.
                        </p>
                        <textarea
                          id="scene-dialogue"
                          value={currentScene.dialogue}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "dialogue",
                              event.target.value
                            )
                          }
                          rows={4}
                          placeholder={"CHARACTER: What they say...\nNARRATOR: The story narration...\nSOUND: Important sound cues..."}
                          className="w-full resize-y rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3 text-sm leading-7 outline-none focus:border-[#9479E8]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="scene-transition"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Transition to next scene
                        </label>
                        <input
                          id="scene-transition"
                          value={currentScene.transition}
                          onChange={(event) =>
                            updateScene(
                              currentScene.id,
                              "transition",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Fade to black, camera pans, smooth cut..."
                          className="w-full rounded-xl border border-[#E8E4EF] bg-[#FCFBFD] px-4 py-3.5 text-sm outline-none focus:border-[#9479E8]"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EDF4] pt-6">
                      <p className="text-xs text-[#A29BAD]">
                        Your changes are kept while this page remains open.
                      </p>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={
                            scenes.findIndex(
                              (scene) => scene.id === currentScene.id
                            ) === 0
                          }
                          onClick={() => {
                            const index = scenes.findIndex(
                              (scene) => scene.id === currentScene.id
                            );
                            setActiveScene(scenes[index - 1].id);
                          }}
                          className="rounded-xl border border-[#E8E4EF] px-4 py-3 text-sm font-semibold text-[#665C7A] transition hover:border-[#9479E8] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          ← Previous
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const index = scenes.findIndex(
                              (scene) => scene.id === currentScene.id
                            );

                            if (index < scenes.length - 1) {
                              setActiveScene(scenes[index + 1].id);
                            } else {
                              addScene();
                            }
                          }}
                          className="rounded-xl bg-[#29243D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#40365D]"
                        >
                          Next scene →
                        </button>
                      </div>
                    </div>
                  </article>
                )}

                <div className="flex flex-col justify-between gap-5 rounded-[26px] border border-[#E9E4F1] bg-white p-5 sm:flex-row sm:items-center sm:p-7">
                  <div>
                    <h3 className="font-bold">Ready to review your animation?</h3>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-[#858091]">
                      Review your scene breakdown before approving the script
                      and sending it to Create Animation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNotice("");
                      setShowReview(true);
                    }}
                    className="shrink-0 rounded-xl bg-[#806AC0] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#6F58B0]"
                  >
                    Review animation plan →
                  </button>
                </div>
              </div>
            </div>

            {notice && (
              <p className="rounded-xl bg-[#FFF4E8] px-4 py-3 text-sm text-[#9A642D]">
                {notice}
              </p>
            )}
          </section>
        )}
      </div>

      {showReview && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#171425]/75 p-4 backdrop-blur-md"
          onClick={() => setShowReview(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-title"
            onClick={(event) => event.stopPropagation()}
            className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/30 bg-[#FCFBFD] p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9479E8]">
                  Final review
                </p>
                <h2
                  id="review-title"
                  className="mt-2 text-2xl font-bold text-[#29243D]"
                >
                  Your animation plan
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#858091]">
                  Check your creative direction and scenes before continuing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReview(false)}
                aria-label="Close review"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0EDF5] text-xl text-[#777084] transition hover:bg-[#E8E1F5]"
              >
                ×
              </button>
            </div>

            <div className="mt-7 rounded-2xl bg-[#29243D] p-5 text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{idea}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[genre, tone, visualStyle, duration].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {scenes.map((scene, index) => (
                <div
                  key={scene.id}
                  className="rounded-2xl border border-[#E9E4F1] bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-[#29243D]">
                      {String(index + 1).padStart(2, "0")} · {scene.title}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        sceneComplete(scene)
                          ? "bg-[#EAF4EE] text-[#648A72]"
                          : "bg-[#FFF4E8] text-[#9A642D]"
                      }`}
                    >
                      {sceneComplete(scene) ? "Ready" : "Incomplete"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-sm leading-6">
                    {[
                      ["Purpose", scene.purpose],
                      ["Visual direction", scene.visual],
                      ["Character actions", scene.action],
                      ["Camera direction", scene.camera],
                      ["Dialogue / narration", scene.dialogue],
                      ["Transition", scene.transition],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-semibold text-[#9479E8]">
                          {label}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap text-[#777084]">
                          {value || "Not added"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveScene(scene.id);
                      setShowReview(false);
                    }}
                    className="mt-4 text-xs font-semibold text-[#806AC0] hover:underline"
                  >
                    Edit this scene →
                  </button>
                </div>
              ))}
            </div>

            {notice && (
              <p className="mt-5 rounded-xl bg-[#FFF4E8] px-4 py-3 text-sm text-[#9A642D]">
                {notice}
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-[#F0EDF4] pt-6 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="rounded-xl border border-[#E8E4EF] px-5 py-3.5 text-sm font-semibold text-[#665C7A] transition hover:border-[#9479E8]"
              >
                Continue editing
              </button>

              <button
                type="button"
                onClick={approveScript}
                className="rounded-xl bg-[#29243D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#40365D]"
              >
                Approve & continue to animation →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
