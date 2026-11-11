
"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Eye,
  Palette,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  WandSparkles,
  X,
} from "lucide-react";
import { AnimationPageReady } from "@/app/components/animation-navigation-provider";

type Character = {
  id: string;
  name: string;
  role: string;
  description: string;
  visualStyle: string;
  outfit: string;
  features: string;
  color: string;
  personality: string[];
};

const emptyCharacter: Character = {
  id: "",
  name: "",
  role: "Main Character",
  description: "",
  visualStyle: "3D Animation",
  outfit: "Casual",
  features: "",
  color: "#A78BFA",
  personality: [],
};

const steps = [
  { title: "Identity", subtitle: "Who is your character?", icon: UserRound },
  { title: "Appearance", subtitle: "Design their look", icon: Palette },
  { title: "Personality", subtitle: "Define their character", icon: Brain },
  { title: "Review", subtitle: "Ready to bring them to life?", icon: Eye },
];

const styles = [
  { name: "3D Animation", description: "Modern animated movie look", emoji: "🎬" },
  { name: "2D Cartoon", description: "Classic cartoon appearance", emoji: "🎨" },
  { name: "Anime", description: "Japanese animation inspired", emoji: "🌸" },
  { name: "Comic Book", description: "Bold illustrated appearance", emoji: "💥" },
  { name: "Realistic", description: "Natural detailed appearance", emoji: "✨" },
  { name: "Clay Animation", description: "Soft handcrafted look", emoji: "🧸" },
];

const outfits = [
  "Casual",
  "Formal",
  "Adventure",
  "Fantasy",
  "School Uniform",
  "Traditional",
  "Futuristic",
  "Custom",
];

const colors = [
  "#A78BFA",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#FB7185",
  "#F97316",
  "#22D3EE",
  "#C084FC",
];

const traits = [
  "Brave",
  "Funny",
  "Curious",
  "Intelligent",
  "Kind",
  "Shy",
  "Confident",
  "Mysterious",
  "Adventurous",
  "Creative",
  "Loyal",
  "Friendly",
];

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Character>(emptyCharacter);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("toonforge-characters");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCharacters(JSON.parse(saved));
    } catch {
      console.error("Could not load saved characters.");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "toonforge-characters",
        JSON.stringify(characters)
      );
    }
  }, [characters, loaded]);

  const updateDraft = (updates: Partial<Character>) => {
    setDraft((current) => ({ ...current, ...updates }));
  };

  const openCreate = () => {
    setDraft({ ...emptyCharacter });
    setEditingId(null);
    setStep(0);
    setModalOpen(true);
  };

  const openEdit = (character: Character) => {
    setDraft({ ...character });
    setEditingId(character.id);
    setStep(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(0);
  };

  const toggleTrait = (trait: string) => {
    const exists = draft.personality.includes(trait);

    updateDraft({
      personality: exists
        ? draft.personality.filter((item) => item !== trait)
        : [...draft.personality, trait],
    });
  };

  const saveCharacter = () => {
    if (!draft.name.trim()) return;

    if (editingId) {
      setCharacters((current) =>
        current.map((character) =>
          character.id === editingId
            ? { ...draft, name: draft.name.trim() }
            : character
        )
      );
    } else {
      setCharacters((current) => [
        ...current,
        {
          ...draft,
          id: crypto.randomUUID(),
          name: draft.name.trim(),
        },
      ]);
    }

    closeModal();
  };

  const deleteCharacter = (id: string) => {
    if (!window.confirm("Delete this character?")) return;
    setCharacters((current) =>
      current.filter((character) => character.id !== id)
    );
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  const canContinue =
    step !== 0 || draft.name.trim().length > 0;

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <>
      <AnimationPageReady />

      <main className="min-h-screen bg-[#F7F5EF] px-4 py-8 text-[#252B26] sm:px-7 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">

          {/* HEADER */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#8B70C9]">
                <Sparkles size={16} />
                TOONFORGE CREATIVE STUDIO
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Character Studio
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#7B817B]">
                Create memorable characters for your animated stories.
                Design their appearance, personality and visual identity.
              </p>
            </div>

            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#252B26] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3C463E] active:scale-[0.98]"
            >
              <Plus size={18} />
              Create Character
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E9E7DF] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#858B84]">Total Characters</span>
                <Users className="text-[#987DD1]" size={20} />
              </div>
              <p className="mt-3 text-3xl font-bold">{characters.length}</p>
              <p className="mt-1 text-xs text-[#999E98]">
                Your character collection
              </p>
            </div>

            <div className="rounded-2xl border border-[#E9E7DF] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#858B84]">Visual Styles</span>
                <Palette className="text-[#70B8A2]" size={20} />
              </div>
              <p className="mt-3 text-3xl font-bold">
                {new Set(characters.map((c) => c.visualStyle)).size}
              </p>
              <p className="mt-1 text-xs text-[#999E98]">
                Styles represented in your library
              </p>
            </div>

            <div className="rounded-2xl border border-[#E9E7DF] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#858B84]">Creative Workspace</span>
                <Clapperboard className="text-[#E6A978]" size={20} />
              </div>
              <p className="mt-3 text-lg font-bold">Ready to create</p>
              <p className="mt-1 text-xs text-[#999E98]">
                Build characters for your next animation
              </p>
            </div>
          </div>

          {/* LIBRARY */}
          <section className="space-y-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">Your Characters</h2>
                <p className="mt-1 text-sm text-[#858B84]">
                  Manage your creative collection.
                </p>
              </div>

              {characters.length > 0 && (
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search characters..."
                  className="w-full rounded-xl border border-[#E6E4DC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A78BFA] sm:max-w-xs"
                />
              )}
            </div>

            {filteredCharacters.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#DCD9D0] bg-white/60 px-5 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EEE8FA] text-[#987DD1]">
                  <WandSparkles size={34} />
                </div>

                <h3 className="text-lg font-bold">
                  {characters.length === 0
                    ? "Your character library is empty"
                    : "No characters found"}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#858B84]">
                  {characters.length === 0
                    ? "Every great animation starts with a character. Create your first one and bring your stories to life."
                    : "Try another character name."}
                </p>

                {characters.length === 0 && (
                  <button
                    onClick={openCreate}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-[#987DD1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8466C0]"
                  >
                    <Plus size={17} />
                    Create your first character
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCharacters.map((character) => (
                  <div
                    key={character.id}
                    className="group overflow-hidden rounded-2xl border border-[#E9E7DF] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#252B26]/5"
                  >
                    <div
                      className="relative flex h-48 items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(145deg, ${character.color}40, ${character.color}15, #F7F5EF)`,
                      }}
                    >
                      <div
                        className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/70 text-3xl font-bold text-white shadow-xl"
                        style={{ backgroundColor: character.color }}
                      >
                        {initials(character.name)}
                      </div>

                      <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/75 px-3 py-1 text-xs font-medium backdrop-blur">
                        {character.visualStyle}
                      </span>

                      <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                        <button
                          onClick={() => openEdit(character)}
                          aria-label="Edit character"
                          className="rounded-lg bg-white p-2 shadow-md transition hover:text-[#987DD1]"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => deleteCharacter(character.id)}
                          aria-label="Delete character"
                          className="rounded-lg bg-white p-2 shadow-md transition hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold">{character.name}</h3>
                      <p className="mt-1 text-xs font-medium text-[#987DD1]">
                        {character.role}
                      </p>

                      <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[#858B84]">
                        {character.description || "No description added yet."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {character.personality.slice(0, 3).map((trait) => (
                          <span
                            key={trait}
                            className="rounded-full bg-[#F0ECF8] px-3 py-1 text-xs text-[#8067B4]"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => openEdit(character)}
                        className="mt-5 flex w-full items-center justify-between border-t border-[#F0EFE9] pt-4 text-sm font-semibold transition hover:text-[#987DD1]"
                      >
                        Edit character
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* WORKFLOW NOTE */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#252B26] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white/10 p-3 text-[#C6A8FF]">
                <Clapperboard size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Your characters, your stories.</h3>
                <p className="mt-1 max-w-lg text-sm leading-6 text-white/60">
                  Create characters here and use them as visual assets
                  when building scenes in Animation Studio.
                </p>
              </div>
            </div>
            <span className="whitespace-nowrap text-xs font-medium text-[#C6A8FF]">
              SCRIPT → CHARACTER → ANIMATION
            </span>
          </div>
        </div>
      </main>

      {/* CHARACTER CREATION MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#090816]/75 p-3 backdrop-blur-xl sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative my-auto flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#11111E] text-white shadow-2xl shadow-black/40">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#B9A0FF]">
                  <Sparkles size={14} />
                  TOONFORGE CHARACTER DESIGNER
                </div>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  {editingId ? "Edit Character" : "Create a Character"}
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Build your character one step at a time.
                </p>
              </div>

              <button
                onClick={closeModal}
                aria-label="Close character designer"
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* PROGRESS */}
            <div className="px-5 pt-5 sm:px-8">
              <div className="flex items-center justify-between gap-2">
                {steps.map((item, index) => {
                  const Icon = item.icon;
                  const active = index === step;
                  const completed = index < step;

                  return (
                    <div key={item.title} className="flex flex-1 items-center gap-2">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                          active
                            ? "border-[#A78BFA] bg-[#A78BFA] text-white"
                            : completed
                            ? "border-[#8F79D1] bg-[#8F79D1]/20 text-[#C6B5FF]"
                            : "border-white/10 bg-white/5 text-white/35"
                        }`}
                      >
                        {completed ? <Check size={17} /> : <Icon size={17} />}
                      </div>

                      <div className="hidden min-w-0 sm:block">
                        <p
                          className={`text-xs font-semibold ${
                            active ? "text-white" : "text-white/45"
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-[10px] text-white/30">
                          Step {index + 1}
                        </p>
                      </div>

                      {index !== steps.length - 1 && (
                        <div className="mx-1 h-px flex-1 bg-white/10" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8B72D5] to-[#C2A8FF] transition-all duration-500"
                  style={{ width: `${((step + 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* MODAL CONTENT */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_260px]">

                {/* LEFT: WIZARD STEPS */}
                <div className="min-w-0">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B9A0FF]">
                      Step {step + 1} of 4
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                      {steps[step].title}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">
                      {steps[step].subtitle}
                    </p>
                  </div>

                  {/* STEP 1: IDENTITY */}
                  {step === 0 && (
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">
                          Character name *
                        </label>
                        <input
                          autoFocus
                          value={draft.name}
                          onChange={(e) =>
                            updateDraft({ name: e.target.value })
                          }
                          placeholder="e.g. Alex Morgan"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-[#A78BFA]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">
                          Character role
                        </label>
                        <select
                          value={draft.role}
                          onChange={(e) =>
                            updateDraft({ role: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/10 bg-[#1A192A] px-4 py-3.5 text-sm outline-none focus:border-[#A78BFA]"
                        >
                          <option>Main Character</option>
                          <option>Supporting Character</option>
                          <option>Villain</option>
                          <option>Hero</option>
                          <option>Mentor</option>
                          <option>Comic Relief</option>
                          <option>Background Character</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">
                          Character description
                        </label>
                        <textarea
                          value={draft.description}
                          onChange={(e) =>
                            updateDraft({ description: e.target.value })
                          }
                          placeholder="Describe who this character is, their background and what makes them special..."
                          rows={5}
                          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-white/25 focus:border-[#A78BFA]"
                        />
                        <p className="mt-2 text-right text-[11px] text-white/30">
                          {draft.description.length} characters
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: APPEARANCE */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-white/75">
                          Visual style
                        </label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {styles.map((style) => (
                            <button
                              key={style.name}
                              onClick={() =>
                                updateDraft({ visualStyle: style.name })
                              }
                              className={`rounded-xl border p-3 text-left transition ${
                                draft.visualStyle === style.name
                                  ? "border-[#A78BFA] bg-[#A78BFA]/15"
                                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                              }`}
                            >
                              <span className="text-2xl">{style.emoji}</span>
                              <p className="mt-3 text-xs font-semibold">
                                {style.name}
                              </p>
                              <p className="mt-1 text-[10px] leading-4 text-white/40">
                                {style.description}
                              </p>
                              {draft.visualStyle === style.name && (
                                <Check
                                  size={15}
                                  className="mt-2 text-[#C6A8FF]"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-white/75">
                          Clothing / outfit
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {outfits.map((outfit) => (
                            <button
                              key={outfit}
                              onClick={() => updateDraft({ outfit })}
                              className={`rounded-full border px-4 py-2 text-xs transition ${
                                draft.outfit === outfit
                                  ? "border-[#A78BFA] bg-[#A78BFA]/20 text-[#D3C4FF]"
                                  : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/10"
                              }`}
                            >
                              {outfit}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-white/75">
                          Signature character colour
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => updateDraft({ color })}
                              aria-label={`Select colour ${color}`}
                              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                                draft.color === color
                                  ? "ring-2 ring-white ring-offset-4 ring-offset-[#11111E]"
                                  : "hover:scale-110"
                              }`}
                              style={{ backgroundColor: color }}
                            >
                              {draft.color === color && (
                                <Check size={17} className="text-white" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">
                          Physical features
                        </label>
                        <textarea
                          value={draft.features}
                          onChange={(e) =>
                            updateDraft({ features: e.target.value })
                          }
                          placeholder="e.g. Curly hair, round glasses, green eyes, tall..."
                          rows={3}
                          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-[#A78BFA]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PERSONALITY */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/75">
                          Choose personality traits
                        </label>
                        <p className="mb-4 text-xs text-white/40">
                          Select the traits that best describe your character.
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {traits.map((trait) => {
                            const selected =
                              draft.personality.includes(trait);

                            return (
                              <button
                                key={trait}
                                onClick={() => toggleTrait(trait)}
                                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                                  selected
                                    ? "border-[#A78BFA] bg-[#A78BFA]/15 text-[#D4C7FF]"
                                    : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07]"
                                }`}
                              >
                                {trait}
                                {selected && <Check size={15} />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#D4C7FF]">
                          <Brain size={17} />
                          Personality summary
                        </div>
                        <p className="mt-2 text-xs leading-6 text-white/55">
                          {draft.personality.length
                            ? `${draft.name || "This character"} is ${draft.personality.join(", ").toLowerCase()}.`
                            : "Choose some personality traits to define how your character behaves in the story."}
                        </p>
                        <p className="mt-3 text-[10px] text-white/35">
                          {draft.personality.length} traits selected
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: REVIEW */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
                            style={{ backgroundColor: draft.color }}
                          >
                            {initials(draft.name)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">
                              {draft.name}
                            </h4>
                            <p className="text-xs text-white/45">
                              {draft.role}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-white/60">
                          {draft.description ||
                            "No character description provided."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-[10px] uppercase tracking-wider text-white/35">
                            Visual style
                          </p>
                          <p className="mt-2 text-sm font-semibold">
                            {draft.visualStyle}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-[10px] uppercase tracking-wider text-white/35">
                            Outfit
                          </p>
                          <p className="mt-2 text-sm font-semibold">
                            {draft.outfit}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs font-semibold text-white/60">
                          Physical features
                        </p>
                        <p className="mt-2 text-sm text-white/45">
                          {draft.features || "No physical features specified."}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs font-semibold text-white/60">
                          Personality
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {draft.personality.length > 0 ? (
                            draft.personality.map((trait) => (
                              <span
                                key={trait}
                                className="rounded-full bg-[#A78BFA]/15 px-3 py-1.5 text-xs text-[#D4C7FF]"
                              >
                                {trait}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-white/40">
                              No traits selected.
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />
                        <p className="text-xs leading-5 text-white/55">
                          Your character is ready to be saved to your
                          library. You can edit these details later.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT: LIVE PREVIEW */}
                <aside className="hidden lg:block">
                  <div className="sticky top-0">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/45">
                      <Eye size={15} />
                      LIVE CHARACTER PREVIEW
                    </div>

                    <div
                      className="overflow-hidden rounded-2xl border border-white/10"
                      style={{
                        background: `linear-gradient(155deg, ${draft.color}45, ${draft.color}15, #1B1A2B)`,
                      }}
                    >
                      <div className="flex min-h-[290px] flex-col items-center justify-center px-5 py-8">
                        <div
                          className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 text-4xl font-bold text-white shadow-2xl"
                          style={{
                            background: `linear-gradient(145deg, ${draft.color}, #39334D)`,
                          }}
                        >
                          {initials(draft.name)}
                        </div>

                        <h4 className="mt-6 text-lg font-bold">
                          {draft.name || "Your Character"}
                        </h4>
                        <p className="mt-1 text-xs text-white/50">
                          {draft.role}
                        </p>

                        <span className="mt-4 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] text-white/65">
                          {draft.visualStyle}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                        Current design
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        {draft.outfit} outfit
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {draft.personality.length
                          ? draft.personality.slice(0, 3).join(" · ")
                          : "Personality not selected"}
                      </p>
                    </div>

                    <p className="mt-4 text-center text-[10px] leading-5 text-white/30">
                      Preview is a design placeholder.
                      Actual character artwork can be added in a future AI integration.
                    </p>
                  </div>
                </aside>
              </div>
            </div>

            {/* FOOTER NAVIGATION */}
            <div className="flex items-center justify-between border-t border-white/10 bg-[#0D0D18]/80 px-5 py-4 sm:px-8">
              <button
                onClick={() => {
                  if (step === 0) {
                    closeModal();
                  } else {
                    setStep((current) => current - 1);
                  }
                }}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <ChevronLeft size={17} />
                {step === 0 ? "Cancel" : "Back"}
              </button>

              <span className="text-xs text-white/30">
                {step + 1} / 4
              </span>

              {step < 3 ? (
                <button
                  disabled={!canContinue}
                  onClick={() => setStep((current) => current + 1)}
                  className="flex items-center gap-2 rounded-xl bg-[#987DD1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8569C2] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  onClick={saveCharacter}
                  disabled={!draft.name.trim()}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9275D0] to-[#B08CEB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#987DD1]/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Check size={17} />
                  {editingId ? "Save Changes" : "Save Character"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
