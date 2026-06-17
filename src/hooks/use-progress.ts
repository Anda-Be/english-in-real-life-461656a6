import { useEffect, useState, useCallback } from "react";

const KEY = "eirl:completed-lessons:v1";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

/** Global subscribers so all mounted hooks stay in sync. */
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());

  // Hydrate after mount to avoid SSR/client mismatch.
  useEffect(() => {
    setCompleted(read());
    const onChange = () => setCompleted(read());
    listeners.add(onChange);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) onChange();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isComplete = useCallback(
    (slug: string) => completed.has(slug),
    [completed],
  );

  const toggle = useCallback((slug: string) => {
    const next = read();
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    write(next);
    emit();
  }, []);

  const reset = useCallback(() => {
    write(new Set());
    emit();
  }, []);

  return { completed, isComplete, toggle, reset, count: completed.size };
}
