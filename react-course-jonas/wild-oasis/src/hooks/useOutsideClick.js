import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    // check if click was outside StyledModal
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    // modal immediately closes because of event bubbling -> listen on capturing phase
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
