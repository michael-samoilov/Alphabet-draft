"use client";

import { useCallback, useRef } from "react";

const LONG_PRESS_MS = 500;

/**
 * Returns pointer-event handlers that detect a long-press gesture.
 * Works with both mouse and touch. A short click still fires normally;
 * only a sustained press (≥ 500 ms) triggers `onLongPress`.
 */
export function useLongPress(onLongPress: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const start = useCallback(() => {
    didLongPress.current = false;
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      onLongPress();
    }, LONG_PRESS_MS);
  }, [onLongPress]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
    /** true if the last gesture was a long-press (lets callers suppress click) */
    didLongPress,
  };
}
