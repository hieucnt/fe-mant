import React from "react";

export const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export const useIntersectionObserver = (callback, ele) => {
  const [node, setNode] = React.useState(null);
  const observer = React.useRef(null);

  React.useEffect(() => {
    if (ele && (ele.isLoading || !ele.hasMore)) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (node) observer.current.observe(node);

    return () => observer.current.disconnect();
  }, [node, callback, ele]);

  return [setNode];
};

export const useWindowResizeMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 575);

  React.useEffect(() => {
    let windowResizeListener = window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 575);
    });

    return () => window.removeEventListener("resize", windowResizeListener);
  }, []);

  return [isMobile];
};

export const TYPE = {
  element: "element",
  className: "className",
  id: "id",
};

export const useWindowResize = (elementOrClassName, type) => {
  const [trigger, setTrigger] = React.useState(false);
  const [elementSize, setElementSize] = React.useState({
    elementWidth: 0,
    elementHeight: 0,
  });
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const handleWindowsResize = () => {
      if (_.isElement(elementOrClassName) && type === TYPE.element) {
        setElementSize({
          elementHeight: elementOrClassName.clientHeight,
          elementWidth: elementOrClassName.clientWidth,
        });
      } else if (_.isString(elementOrClassName) && type === TYPE.className) {
        const element = document.getElementsByClassName(elementOrClassName)[0];
        setElementSize({
          elementHeight: element?.offsetHeight,
          elementWidth: element?.offsetWidth,
        });
      } else if (_.isString(elementOrClassName) && type === TYPE.id) {
        const element = document.getElementById(elementOrClassName);
        setElementSize({
          elementHeight: element.clientHeight,
          elementWidth: element.clientWidth,
        });
      }

      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleWindowsResize);

    handleWindowsResize();

    return () => window.removeEventListener("resize", handleWindowsResize);
  }, [trigger]);

  return React.useMemo(
    () => ({ ...elementSize, ...size, action: { trigger, setTrigger } }),
    [elementSize, size, trigger]
  );
};
