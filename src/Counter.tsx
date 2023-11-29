import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <button role="button" onClick={() => setCount((count) => count + 1)} className="counter">
      Count {count}
    </button>
  );
}
