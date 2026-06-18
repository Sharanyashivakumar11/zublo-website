export function BrushDefs() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden>
      <defs>
        <path
          id="brush-underline-1"
          d="M0,8 Q50,4 100,6 T200,5 T300,7"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="brush-highlight-1"
          d="M0,10 Q30,5 60,8 Q90,12 120,7 Q150,3 180,9"
          stroke="currentColor"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        <path
          id="brush-accent-1"
          d="M0,0 Q40,8 80,2 Q120,12 160,4 Q200,10 240,3"
          stroke="currentColor"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </defs>
    </svg>
  );
}

export function BrushUnderline({
  color = "brush-orange",
}: {
  color?: "brush-orange" | "brush-blue" | "brush-lime" | "brush-pink" | "brush-white";
}) {
  return (
    <svg className={`brush-underline ${color}`} viewBox="0 0 300 20" preserveAspectRatio="none">
      <use href="#brush-underline-1" />
    </svg>
  );
}

export function BrushHighlight({ color = "brush-lime" }: { color?: string }) {
  return (
    <svg className={`brush-highlight ${color}`} viewBox="0 0 200 20" preserveAspectRatio="none">
      <use href="#brush-highlight-1" />
    </svg>
  );
}

export function BrushAccent({ color = "brush-white" }: { color?: string }) {
  return (
    <svg className={`brush-accent ${color}`} viewBox="0 0 250 15" preserveAspectRatio="none">
      <use href="#brush-accent-1" />
    </svg>
  );
}
