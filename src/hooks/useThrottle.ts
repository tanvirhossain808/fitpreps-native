import { useRef } from 'react';

export function useThrottle(callback: any, delay: any) {
  const lastCall = useRef(0);

  return (...args: any) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
}
