
"use client";

import { useState } from "react";

export default function CreateAnimationPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("3D Animation");
  const [duration, setDuration] = useState("30 seconds");
  const [message, setMessage] = useState("");

  function handlePrepare() {
    setMessage(
      prompt.trim()
        ? "Your animation concept is ready to develop. AI video generation is not connected yet."
        : "Describe your animation idea first."
    );
  }

  return (
    <section className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="min-w-0 rounded-[28px] border border-[#657166]/10 bg-white p-5 sm:p-7">
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
          <div className="min-w-0">
            <label htmlFor="animation-style" className="block text-sm font-bold">
              Animation style
            </label>
            <select
              id="animation-style"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="mt-3 w-full min-w-0 rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
            >
              <option>3D Animation</option>
              <option>2D Cartoon</option>
              <option>Anime</option>
              <option>Stop Motion</option>
              <option>Storybook</option>
              <option>Comic Book</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="animation-duration" className="block text-sm font-bold">
              Target duration
            </label>
            <select
              id="animation-duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-3 w-full min-w-0 rounded-2xl border border-[#657166]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#99CDD8]"
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
          <p
            role="status"
            className="mt-4 rounded-2xl bg-[#DAEBE3] p-4 text-sm leading-6"
          >
            {message}
          </p>
        )}

        <p className="mt-3 text-center text-xs leading-5 text-[#657166]/55">
          AI video generation has not been connected yet.
        </p>
      </div>

      <div className="flex min-h-[390px] min-w-0 flex-col rounded-[28px] bg-[#FDE8D3] p-5 sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#657166]/65">
            Studio preview
          </p>
          <h2 className="mt-2 text-xl font-black">Your next scene</h2>
        </div>

        <div className="relative mt-6 flex min-h-[280px] flex-1 flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/70 bg-[#DAEBE3] p-6 text-center">
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#99CDD8]/70 blur-xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-5 h-36 w-36 rounded-full bg-[#F3C3B2]/80 blur-xl" />

          <div className="relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-[30px] border border-white/80 bg-white/75 text-5xl shadow-sm">
            🎞️
          </div>

          <h3 className="relative z-10 mt-6 max-w-sm break-words text-xl font-black">
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
