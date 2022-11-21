import { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
export default function useScrollDirection() {
  const scrollPos = useRef(0);
  const [direction, setDirection] = useState({
    isDown: false,
    isUp: false,
    isTop: false
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      
      setDirection({
        isDown: window.pageYOffset > scrollPos.current,
        isUp: window.pageYOffset < scrollPos.current,
        isTop: window.pageYOffset === 0
      });
      scrollPos.current = window.pageYOffset;
    }, 100);

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
  };