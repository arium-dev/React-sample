import { useEffect } from "react";

const UseOnScreen = (scrollRef, containerRef, onIntersection = () => {}) => {
  let options = {
    root: null,
    rootMargin: "0px 0px",
    threshold: 0.1,
  };
  if (containerRef && containerRef.current) {
    options = {
      root: containerRef.current,
      rootMargin: "0px 0px",
      threshold: 0.1,
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const observer = new IntersectionObserver(onIntersection, options);
  useEffect(() => {
    if (scrollRef && scrollRef.current && observer) {
      observer.observe(scrollRef.current);
    }
    return () => {
      if (scrollRef && scrollRef.current && observer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(scrollRef.current);
      }
    };
  }, [observer, scrollRef]);
  return true;
};

export default UseOnScreen;
