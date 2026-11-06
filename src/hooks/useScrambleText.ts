import { useCallback, useEffect, useRef, useState } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

export function useScrambleText(originalText: string) {
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      iteration += 1 / 3;
    }, 30);
  }, [originalText]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(originalText);
  }, [originalText]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { displayText, scramble, reset };
}
