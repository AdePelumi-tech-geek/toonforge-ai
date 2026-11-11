
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimationPageReady } from "@/app/components/animation-navigation-provider";

type ProjectType = "Storytelling" | "Explainer / Documentary";
type Stage = "library" | "setup" | "editor";

type Scene = {
  id: number;
  title: string;
  purpose: string;
  narration: string;
  visual: string;
  actions: string;
  camera: string;
  onScreenText: string;
};

type ScriptDocument = {
  id: string;
  title: string;
  projectType: ProjectType;
  genre: string;
  tone: string;
  duration: string;
  idea: string;
  scenes: Scene[];
  updatedAt: string;
};

const STORAGE_KEY = "toonforge-script-library";

const genres = [
  "Adventure", "Comedy", "Drama", "Fantasy", "Action",
  "Science Fiction", "Mystery", "Education", "History",
  "Technology", "Science", "Business",
];

const tones = [
  "Inspirational", "Funny", "Dramatic", "Emotional",
  "Suspenseful", "Lighthearted", "Professional", "Informative",
];

const durations = [
  "15 seconds", "30 seconds", "1 minute",
  "1–2 minutes", "3–5 minutes", "5–10 minutes",
];

const createScene = (id: number): Scene => ({
  id,
  title: `Scene ${id}`,
  purpose: "",
  narration: "",
  visual: "",
  actions: "",
  camera: "",
  onScreenText: "",
});

const emptyScript = () => ({
  title: "",
  idea: "",
  projectType: "Storytelling" as ProjectType,
  genre: "Adventure",
  tone: "Inspirational",
  duration: "1 minute",
});

export default function ScriptStudioPage() {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("library");
  const [scripts, setScripts] = useState<ScriptDocument[]>([]);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [project, setProject] = useState(emptyScript());
  const [scenes, setScenes] = useState<Scene[]>([createScene(1)]);
  const [activeScene, setActiveScene] = useState(1);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setScripts(JSON.parse(saved));
    } catch {
      setScripts([]);
    }
  }, []);

  const persistScripts = (items: ScriptDocument[]) => {
    setScripts(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      setNotice("Your browser could not save this script.");
    }
  };

  const currentScene =
    scenes.find((scene) => scene.id === activeScene) ?? scenes[0];

  const updateProject = (field: keyof typeof project, value: string) => {
    setProject((current) => ({ ...current, [field]: value }));
  };

  const updateScene = (id: number, field: keyof Scene, value: string) => {
    setScenes((current) =>
      current.map((scene) =>
        scene.id === id ? { ...scene, [field]: value } : scene
      )
    );
  };

  const startNewScript = () => {
    setProject(emptyScript());
    setScenes([createScene(1)]);
    setActiveScene(1);
    setNotice("");
    setStage("setup");
  };

  const openEditor = () => {
    if (!project.title.trim() || !project.idea.trim()) {
      setNotice("Please add a project title and describe your idea.");
      return;
    }

    setNotice("");
    setStage("editor");
  };

  const addScene = () => {
    const nextId = Math.max(0, ...scenes.map((scene) => scene.id)) + 1;
    setScenes((current) => [...current, createScene(nextId)]);
    setActiveScene(nextId);
  };

  const removeScene = (id: number) => {
    if (scenes.length <= 1) return;

    const remaining = scenes.filter((scene) => scene.id !== id);
    setScenes(remaining);

    if (activeScene === id) setActiveScene(remaining[0].id);
  };

  const sceneComplete = (scene: Scene) =>
    Boolean(scene.title.trim() && scene.narration.trim() && scene.visual.trim());

  const completedScenes = scenes.filter(sceneComplete).length;

  // const saveScript = () => {
  //   const document: ScriptDocument = {
  //     id: crypto.randomUUID(),
  //     ...project,
  //     title: project.title.trim(),
  //     idea: project.idea.trim(),
  //     scenes,
  //     updatedAt: new Date().toISOString(),
  //   };

  //   persistScripts([document, ...scripts]);
  //   setStage("library");
  //   setNotice("Your script has been saved.");
  // };

  const openSavedScript = (script: ScriptDocument) => {
    setProject({
      title: script.title,
      idea: script.idea,
      projectType: script.projectType,
      genre: script.genre,
      tone: script.tone,
      duration: script.duration,
    });
    setScenes(script.scenes);
    setActiveScene(script.scenes[0]?.id ?? 1);
    setStage("editor");
    setNotice("");
  };

  const deleteScript = (id: string) => {
    persistScripts(scripts.filter((script) => script.id !== id));
  };

  const continueToCharacters = () => {
    if (!project.title.trim() || scenes.some((scene) => !sceneComplete(scene))) {
      setNotice("Complete the title, narration and visual direction for every scene first.");
      return;
    }

    const approvedScript = {
      ...project,
      scenes,
      approved: true,
      updatedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(
        "toonforge-approved-animation-script",
        JSON.stringify(approvedScript)
      );
      router.push("/characters");
    } catch {
      setNotice("We couldn't transfer your script. Please try again.");
    }
  };

  const filteredScripts = scripts.filter((script) =>
    script.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#F7F8F5] px-4 py-7 text-[#252B26] sm:px-7 lg:px-10">
      <AnimationPageReady />

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#99CDD8]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#DAEBE3]/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* LIBRARY */}
        {stage === "library" && (
          <div className="space-y-9">
            <section className="relative overflow-hidden rounded-[32px] bg-[#252B26] px-7 py-10 text-white shadow-xl sm:px-10 sm:py-14 lg:px-14">
              <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#99CDD8]/20 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#F3C3B2]/15 blur-[90px]" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B9DED9]">
                    ✦ Your script library
                  </span>

                  <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Every great animation
                    <span className="block text-[#A9D6CF]">starts with a script.</span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                    Build stories, explain complex ideas and plan documentaries
                    scene by scene. Give your narrator the words and your
                    characters the actions.
                  </p>

                  <button
                    type="button"
                    onClick={startNewScript}
                    className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#DAEBE3] px-6 py-4 text-sm font-bold text-[#252B26] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    <span className="text-lg">＋</span>
                    Create a new script
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                    <p className="text-3xl font-bold text-[#B9DED9]">{scripts.length}</p>
                    <p className="mt-2 text-xs text-white/50">Saved scripts</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                    <p className="text-3xl font-bold text-[#F3C3B2]">
                      {scripts.reduce((total, item) => total + item.scenes.length, 0)}
                    </p>
                    <p className="mt-2 text-xs text-white/50">Total scenes</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78968A]">
                    Your workspace
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Your scripts
                  </h2>
                  <p className="mt-1 text-sm text-[#849087]">
                    Continue working on an existing project.
                  </p>
                </div>

                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89958C]">⌕</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search scripts..."
                    className="w-full rounded-xl border border-[#E5EAE5] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#99CDD8]"
                  />
                </div>
              </div>

              {filteredScripts.length === 0 ? (
                <div className="rounded-[26px] border border-dashed border-[#D5DED6] bg-white/70 px-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DAEBE3] text-2xl text-[#657166]">
                    ✎
                  </div>
                  <h3 className="mt-5 text-lg font-bold">
                    {search ? "No matching scripts" : "Your story starts here"}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#89958C]">
                    {search
                      ? "Try another search term."
                      : "Create your first script and start planning your animation scene by scene."}
                  </p>
                  {!search && (
                    <button
                      type="button"
                      onClick={startNewScript}
                      className="mt-6 rounded-xl bg-[#657166] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4D5B50]"
                    >
                      Create your first script →
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredScripts.map((script) => (
                    <article
                      key={script.id}
                      className="group rounded-[25px] border border-[#E7ECE7] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DAEBE3] text-xl text-[#657166]">
                          ✦
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteScript(script.id)}
                          aria-label="Delete script"
                          className="rounded-lg px-3 py-2 text-sm text-[#A2AAA3] transition hover:bg-red-50 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>

                      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#78968A]">
                        {script.projectType}
                      </p>
                      <h3 className="mt-2 truncate text-lg font-bold">{script.title}</h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#89958C]">
                        {script.idea}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {[script.genre, script.duration].map((tag) => (
                          <span key={tag} className="rounded-full bg-[#F1F5F1] px-3 py-1.5 text-[10px] font-semibold text-[#657166]">
                            {tag}
                          </span>
                        ))}
                        <span className="rounded-full bg-[#F9EEE9] px-3 py-1.5 text-[10px] font-semibold text-[#A47765]">
                          {script.scenes.length} scenes
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => openSavedScript(script)}
                        className="mt-6 w-full rounded-xl border border-[#E5EAE5] py-3 text-sm font-semibold text-[#657166] transition hover:border-[#99CDD8] hover:bg-[#F5FAF7]"
                      >
                        Open script →
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[26px] border border-[#E6ECE6] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78968A]">
                Your creative process
              </p>
              <h2 className="mt-2 text-xl font-bold">From idea to animation</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Script Studio", "Write narration and organise your scenes.", "✎"],
                  ["02", "Character Studio", "Create the visual actors in your project.", "♙"],
                  ["03", "Animation Studio", "Bring your scenes to life.", "✧"],
                ].map(([number, name, description, icon]) => (
                  <div key={number} className="rounded-2xl bg-[#F6F8F5] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8BA69A]">{number}</span>
                      <span className="text-xl text-[#78968A]">{icon}</span>
                    </div>
                    <h3 className="mt-4 font-bold">{name}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#89958C]">{description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROJECT SETUP */}
        {stage === "setup" && (
          <section className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={() => setStage("library")}
              className="mb-6 text-sm font-semibold text-[#789087] transition hover:text-[#4F695B]"
            >
              ← Back to script library
            </button>

            <div className="overflow-hidden rounded-[30px] bg-[#252B26] p-6 text-white shadow-xl sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9D6CF]">
                Step 01 · Project setup
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">What are we creating?</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
                Choose the type of project and give your idea some direction.
                Both project types will use the same scene-based workflow.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "Storytelling" as ProjectType,
                    icon: "✦",
                    description: "Animated stories, adventures, comedy, drama and fictional worlds.",
                  },
                  {
                    name: "Explainer / Documentary" as ProjectType,
                    icon: "◈",
                    description: "Educational videos, documentaries, facts and clear explanations.",
                  },
                ].map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => updateProject("projectType", option.name)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      project.projectType === option.name
                        ? "border-[#A9D6CF] bg-[#A9D6CF]/15"
                        : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="text-2xl text-[#A9D6CF]">{option.icon}</span>
                    <h3 className="mt-4 font-bold">{option.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-white/50">{option.description}</p>
                    <p className="mt-4 text-xs font-bold text-[#A9D6CF]">
                      {project.projectType === option.name ? "✓ Selected" : "Select project"}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Project title</label>
                  <input
                    value={project.title}
                    onChange={(event) => updateProject("title", event.target.value)}
                    placeholder="Give your project a name"
                    className="w-full rounded-xl border border-white/10 bg-[#1C221E] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#A9D6CF]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">What&apos;s your idea about?</label>
                  <textarea
                    value={project.idea}
                    onChange={(event) => updateProject("idea", event.target.value)}
                    rows={4}
                    placeholder="Describe what you want to tell, explain or teach your audience..."
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#1C221E] px-4 py-3.5 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-[#A9D6CF]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Genre / subject", value: project.genre, field: "genre" as const, options: genres },
                    { label: "Tone", value: project.tone, field: "tone" as const, options: tones },
                    { label: "Duration", value: project.duration, field: "duration" as const, options: durations },
                  ].map((item) => (
                    <div key={item.field}>
                      <label className="mb-2 block text-xs font-semibold text-white/65">{item.label}</label>
                      <select
                        value={item.value}
                        onChange={(event) => updateProject(item.field, event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#1C221E] px-3 py-3 text-sm text-white outline-none focus:border-[#A9D6CF]"
                      >
                        {item.options.map((option) => <option key={option}>{option}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {notice && <p className="mt-5 rounded-xl bg-amber-100/10 px-4 py-3 text-sm text-amber-200">{notice}</p>}

              <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6">
                <button type="button" onClick={() => setStage("library")} className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/70 hover:bg-white/5">
                  Cancel
                </button>
                <button type="button" onClick={openEditor} className="rounded-xl bg-[#DAEBE3] px-6 py-3 text-sm font-bold text-[#252B26] transition hover:bg-white">
                  Start writing scenes →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SCRIPT EDITOR */}
        {stage === "editor" && currentScene && (
          <section className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <button type="button" onClick={() => setStage("library")} className="mb-4 text-sm font-semibold text-[#789087] hover:text-[#4F695B]">
                  ← Script library
                </button>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78968A]">ToonForge · Script Studio</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
                <p className="mt-2 text-sm text-[#89958C]">
                  {project.projectType} · {project.genre} · {project.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5EAE5] bg-white px-5 py-3">
                <p className="text-xl font-bold">{completedScenes}/{scenes.length}</p>
                <p className="text-xs text-[#89958C]">Scenes completed</p>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside className="h-fit rounded-[26px] border border-[#E5EAE5] bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78968A]">Your screenplay</p>
                <h2 className="mt-2 text-lg font-bold">Scene breakdown</h2>
                <p className="mt-1 text-xs leading-5 text-[#89958C]">Build your project one scene at a time.</p>

                <div className="mt-5 space-y-2">
                  {scenes.map((scene, index) => (
                    <div key={scene.id} className={`flex items-center gap-2 rounded-xl border p-2 ${activeScene === scene.id ? "border-[#B8D6CA] bg-[#F0F6F1]" : "border-transparent bg-[#F7F9F6]"}`}>
                      <button type="button" onClick={() => setActiveScene(scene.id)} className="flex min-w-0 flex-1 items-center gap-3 p-2 text-left">
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${activeScene === scene.id ? "bg-[#657166] text-white" : "bg-white text-[#89958C]"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{scene.title || `Scene ${index + 1}`}</span>
                          <span className="text-[10px] text-[#89958C]">{sceneComplete(scene) ? "Ready" : "Needs details"}</span>
                        </span>
                      </button>
                      {scenes.length > 1 && (
                        <button type="button" onClick={() => removeScene(scene.id)} aria-label="Remove scene" className="px-2 text-[#A2AAA3] hover:text-red-500">×</button>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addScene} className="mt-4 w-full rounded-xl border border-dashed border-[#B8CFC1] px-4 py-3 text-sm font-semibold text-[#657166] hover:bg-[#F3F7F3]">
                  + Add scene
                </button>

                <div className="mt-6 rounded-2xl bg-[#252B26] p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9D6CF]">Project idea</p>
                  <p className="mt-3 text-xs leading-6 text-white/65">{project.idea}</p>
                </div>
              </aside>

              <div className="min-w-0 space-y-5">
                <article className="rounded-[26px] border border-[#E5EAE5] bg-white p-5 shadow-sm sm:p-8">
                  <div className="mb-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78968A]">
                      Scene {String(scenes.findIndex((scene) => scene.id === currentScene.id) + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Build this scene.</h2>
                    <p className="mt-2 text-sm text-[#89958C]">Write what the narrator says and describe what appears on screen.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">Scene title</label>
                      <input value={currentScene.title} onChange={(event) => updateScene(currentScene.id, "title", event.target.value)} placeholder="e.g. The beginning of everything" className="w-full rounded-xl border border-[#E5EAE5] bg-[#FAFCF9] px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Scene purpose</label>
                      <p className="mb-2 text-xs text-[#89958C]">What should this scene communicate?</p>
                      <textarea value={currentScene.purpose} onChange={(event) => updateScene(currentScene.id, "purpose", event.target.value)} rows={2} placeholder="Introduce an idea, explain a concept, create suspense..." className="w-full resize-y rounded-xl border border-[#E5EAE5] bg-[#FAFCF9] px-4 py-3 text-sm leading-7 outline-none focus:border-[#99CDD8]" />
                    </div>

                    <div className="rounded-2xl border border-[#E5ECE6] bg-[#F7F9F6] p-4 sm:p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DAEBE3] text-lg text-[#657166]">◖</span>
                        <div>
                          <h3 className="text-sm font-bold">Narrator script</h3>
                          <p className="text-xs text-[#89958C]">The only spoken voice in your animation.</p>
                        </div>
                      </div>
                      <textarea value={currentScene.narration} onChange={(event) => updateScene(currentScene.id, "narration", event.target.value)} rows={5} placeholder="Write the exact words the narrator will read aloud for this scene..." className="w-full resize-y rounded-xl border border-[#E5EAE5] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#99CDD8]" />
                      <p className="mt-2 text-[11px] text-[#89958C]">Narration will be used later for the voice-over.</p>
                    </div>

                    <div className="rounded-2xl border border-[#E5ECE6] bg-[#F7F9F6] p-4 sm:p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9EEE9] text-lg text-[#A47765]">✧</span>
                        <div>
                          <h3 className="text-sm font-bold">Visual direction</h3>
                          <p className="text-xs text-[#89958C]">Describe what the audience sees.</p>
                        </div>
                      </div>
                      <textarea value={currentScene.visual} onChange={(event) => updateScene(currentScene.id, "visual", event.target.value)} rows={4} placeholder="Describe the environment, background, lighting, colours, objects and composition..." className="w-full resize-y rounded-xl border border-[#E5EAE5] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#99CDD8]" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Character actions and expressions</label>
                      <p className="mb-2 text-xs text-[#89958C]">Characters are visual actors. They do not have separate voices.</p>
                      <textarea value={currentScene.actions} onChange={(event) => updateScene(currentScene.id, "actions", event.target.value)} rows={3} placeholder="Describe movements, gestures, facial expressions and reactions..." className="w-full resize-y rounded-xl border border-[#E5EAE5] bg-[#FAFCF9] px-4 py-3 text-sm leading-7 outline-none focus:border-[#99CDD8]" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Camera direction</label>
                      <input value={currentScene.camera} onChange={(event) => updateScene(currentScene.id, "camera", event.target.value)} placeholder="Wide shot, close-up, tracking shot..." className="w-full rounded-xl border border-[#E5EAE5] bg-[#FAFCF9] px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">On-screen text</label>
                      <p className="mb-2 text-xs text-[#89958C]">Optional captions, labels, facts or titles.</p>
                      <textarea value={currentScene.onScreenText} onChange={(event) => updateScene(currentScene.id, "onScreenText", event.target.value)} rows={2} placeholder="Text that should appear on screen..." className="w-full resize-y rounded-xl border border-[#E5EAE5] bg-[#FAFCF9] px-4 py-3 text-sm outline-none focus:border-[#99CDD8]" />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[#EEF1ED] pt-6">
                    <button type="button" disabled={scenes.findIndex((scene) => scene.id === currentScene.id) === 0} onClick={() => setActiveScene(scenes[scenes.findIndex((scene) => scene.id === currentScene.id) - 1].id)} className="rounded-xl border border-[#E5EAE5] px-4 py-3 text-sm font-semibold text-[#657166] disabled:opacity-30">
                      ← Previous
                    </button>
                    <button type="button" onClick={() => {
                      const index = scenes.findIndex((scene) => scene.id === currentScene.id);
                      if (index < scenes.length - 1) setActiveScene(scenes[index + 1].id);
                      else addScene();
                    }} className="rounded-xl bg-[#657166] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4D5B50]">
                      Next scene →
                    </button>
                  </div>
                </article>

                <section className="flex flex-col justify-between gap-5 rounded-[26px] border border-[#E5EAE5] bg-white p-5 sm:flex-row sm:items-center sm:p-7">
                  <div>
                    <h3 className="font-bold">Your script is taking shape.</h3>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-[#89958C]">
                      Review your scenes, then move to Character Studio to create the visual actors.
                    </p>
                  </div>
                  <button type="button" onClick={() => setShowReview(true)} className="shrink-0 rounded-xl bg-[#252B26] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#46534A]">
                    Review script →
                  </button>
                </section>

                {notice && <p className="rounded-xl bg-[#FFF4E8] px-4 py-3 text-sm text-[#9A642D]">{notice}</p>}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* SCRIPT REVIEW */}
      {showReview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#171D19]/75 p-4 backdrop-blur-md" onClick={() => setShowReview(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="script-review-title" onClick={(event) => event.stopPropagation()} className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/30 bg-[#FCFDFB] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78968A]">Final review</p>
                <h2 id="script-review-title" className="mt-2 text-2xl font-bold">Review your script</h2>
                <p className="mt-2 text-sm text-[#89958C]">Check your narration and scene directions before continuing.</p>
              </div>
              <button type="button" onClick={() => setShowReview(false)} aria-label="Close review" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2ED] text-xl text-[#657166]">×</button>
            </div>

            <div className="mt-6 rounded-2xl bg-[#252B26] p-5 text-white">
              <p className="text-xs font-semibold text-[#A9D6CF]">{project.projectType}</p>
              <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{project.idea}</p>
              <p className="mt-4 text-xs text-white/50">{scenes.length} scenes · {project.duration} · {project.tone}</p>
            </div>

            <div className="mt-5 space-y-3">
              {scenes.map((scene, index) => (
                <div key={scene.id} className="rounded-2xl border border-[#E5EAE5] bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold">{String(index + 1).padStart(2, "0")} · {scene.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${sceneComplete(scene) ? "bg-[#EAF4EE] text-[#648A72]" : "bg-[#FFF4E8] text-[#9A642D]"}`}>
                      {sceneComplete(scene) ? "Ready" : "Incomplete"}
                    </span>
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#78968A]">Narrator</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#657166]">{scene.narration || "Narration not added yet."}</p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#78968A]">Visual direction</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#657166]">{scene.visual || "Visual direction not added yet."}</p>
                  <button type="button" onClick={() => { setActiveScene(scene.id); setShowReview(false); }} className="mt-4 text-xs font-semibold text-[#657166] hover:underline">Edit scene →</button>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-[#EEF1ED] pt-6 sm:flex-row sm:items-center">
              <button type="button" onClick={() => setShowReview(false)} className="rounded-xl border border-[#E5EAE5] px-5 py-3.5 text-sm font-semibold text-[#657166]">
                Continue editing
              </button>
              <button type="button" onClick={continueToCharacters} className="rounded-xl bg-[#657166] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4D5B50]">
                Approve & continue to characters →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
