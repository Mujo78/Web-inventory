import { TypeAnimation } from "react-type-animation";

const TypingDots = () => {
  return (
    <div className="w-fit">
      <TypeAnimation
        preRenderFirstString={true}
        sequence={[
          "Typing...",
          25,
          "Typing",
          50,
          "Typing...",
          75,
          "Typing",
          100,
          "Typing...",
          125,
        ]}
        style={{ fontSize: "1em", display: "inline-block" }}
        speed={10}
        cursor={false}
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingDots;
