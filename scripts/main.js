// main.js
const { useEffect, useRef, useState } = React;

const Background = ({
  mask = "none",
  dots = true,
  gradient = true,
  className,
  style,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const maskSize = 800;
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    if (mask === "cursor") {
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mask]);

  const maskStyle =
    mask === "cursor"
      ? {
          maskImage: `radial-gradient(circle ${maskSize / 2}px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${maskSize / 2}px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)`,
        }
      : {};

  return (
    <div
      ref={backgroundRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -100,
        pointerEvents: "none",
        ...style,
        ...maskStyle,
      }}
    >
      {gradient && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "radial-gradient(rgb(230, 200, 120) 20%, transparent 100%)",
            opacity: 0.3,
          }}
        />
      )}
      {dots && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "radial-gradient(#809fd0 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            opacity: 2,
          }}
        />
      )}
    </div>
  );
};

ReactDOM.render(
  <React.Fragment>
    <Background mask="cursor" dots={true} gradient={true} />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
