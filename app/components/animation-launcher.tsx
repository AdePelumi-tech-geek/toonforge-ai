
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type AnimationLauncherContextType = {
  launchAnimation: () => void;
};

const AnimationLauncherContext =
  createContext<AnimationLauncherContextType | null>(null);

export function useAnimationLauncher() {
  const context = useContext(AnimationLauncherContext);

  if (!context) {
    throw new Error(
      "useAnimationLauncher must be used inside AnimationLaunchProvider",
    );
  }

  return context;
}

export function AnimationLaunchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [launching, setLaunching] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const launchingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      launchingRef.current = false;
    };
  }, []);

  const launchAnimation = useCallback(() => {
    if (launchingRef.current) return;

    // The homepage already has its own animation.
    if (pathname === "/") {
      router.push("/create-animation");
      return;
    }

    launchingRef.current = true;
    setLaunching(true);

    timeoutRef.current = setTimeout(() => {
      router.push("/create-animation");

      // Reset after navigation so the animation can be triggered again.
      setLaunching(false);
      launchingRef.current = false;
      timeoutRef.current = null;
    }, 5000);
  }, [pathname, router]);

  return (
    <AnimationLauncherContext.Provider value={{ launchAnimation }}>
      {children}

      {launching &&
        createPortal(
          <div
            className="cartoon-launch-overlay"
            role="status"
            aria-live="polite"
          >
            <div className="cartoon-launch-scene">
              <div className="cartoon-launch-stars" aria-hidden="true">
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

              <div className="cartoon-launch-title">TOONFORGE.AI</div>

              <p className="cartoon-launch-caption">
                Your imagination is taking off...
              </p>

              <div className="cartoon-launch-progress">
                <div />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </AnimationLauncherContext.Provider>
  );
}
