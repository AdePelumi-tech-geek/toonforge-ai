
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { usePathname, useRouter } from "next/navigation";

type NavigationContextValue = {
  navigateTo: (href: string) => void;
  completeNavigation: (pathname: string) => void;
};

const NavigationContext =
  createContext<NavigationContextValue | null>(null);

const CREATION_ROUTES = new Set([
  "/create-animation",
  "/script-studio",
  "/characters",
]);

export function useAnimationNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useAnimationNavigation must be used inside AnimationNavigationProvider."
    );
  }

  return context;
}

export function AnimationNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const currentPathname = usePathname();

  const [destination, setDestination] = useState<string | null>(null);

  const destinationPathRef = useRef<string | null>(null);

  const navigateTo = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.origin);

      if (url.origin !== window.location.origin) {
        window.location.assign(url.href);
        return;
      }

      const target = `${url.pathname}${url.search}${url.hash}`;

      if (!CREATION_ROUTES.has(url.pathname)) {
        router.push(target);
        return;
      }

      // Avoid starting another transition while one is active.
      if (destinationPathRef.current) return;

      // No transition needed when already on the same creation page.
      if (url.pathname === currentPathname) {
        router.push(target);
        return;
      }

      // Remember the destination and show the loading animation.
      destinationPathRef.current = url.pathname;
      setDestination(url.pathname);

      // Start navigation immediately.
      router.push(target);
    },
    [router, currentPathname]
  );

  // Called by the destination page when it has mounted.
  const completeNavigation = useCallback((pathname: string) => {
    if (destinationPathRef.current !== pathname) return;

    destinationPathRef.current = null;
    setDestination(null);
  }, []);

  // Clean up when the provider unmounts.
  useEffect(() => {
    return () => {
      destinationPathRef.current = null;
    };
  }, []);

  const handleLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const clickedElement = event.target;

      if (!(clickedElement instanceof Element)) return;

      const anchor = clickedElement.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin) return;
      if (!CREATION_ROUTES.has(url.pathname)) return;

      event.preventDefault();

      navigateTo(
        `${url.pathname}${url.search}${url.hash}`
      );
    },
    [navigateTo]
  );

  return (
    <NavigationContext.Provider
      value={{ navigateTo, completeNavigation }}
    >
      <div onClickCapture={handleLinkClick}>
        {children}
      </div>

      {destination && (
        <div
          className="toonforge-transition"
          role="status"
          aria-live="polite"
          aria-label="Opening your creative workspace"
        >
          <div className="toonforge-transition-scene">
            <div
              className="toonforge-transition-stars"
              aria-hidden="true"
            >
              <span>✦</span>
              <span>✧</span>
              <span>✨</span>
              <span>✦</span>
              <span>✧</span>
            </div>

            <div className="toonforge-transition-orbit">
              <div className="toonforge-transition-character">
                <div className="toonforge-transition-face">
                  <span />
                  <span />
                </div>

                <div className="toonforge-transition-smile" />

                <div className="toonforge-transition-body">TF</div>

                <div className="toonforge-transition-foot left" />
                <div className="toonforge-transition-foot right" />
              </div>
            </div>

            <h2 className="toonforge-transition-title">
              LET&apos;S MAKE MAGIC!
            </h2>

            <p className="toonforge-transition-caption">
              Your imagination is taking off...
            </p>

            <div className="toonforge-transition-progress">
              <div />
            </div>
          </div>
        </div>
      )}
    </NavigationContext.Provider>
  );
}

// Add this component to each creation page.
export function AnimationPageReady() {
  const pathname = usePathname();
  const { completeNavigation } = useAnimationNavigation();

  useEffect(() => {
    completeNavigation(pathname);
  }, [pathname, completeNavigation]);

  return (
    <span className="hidden" aria-hidden="true" />
  );
}
