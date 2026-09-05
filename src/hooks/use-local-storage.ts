import { useCallback, useEffect, useState } from "react";

/**
 * Persists state in localStorage. Reads happen after hydration to keep
 * server-rendered and client markup identical.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be unavailable */
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, hydrated, reset] as const;
}
