import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        console.log(ref.current.contains(e.target))
        return;
      }
      console.log(ref.current.contains(e.target))
      handler(e);
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)

    }
  }, [ref, handler])
}
