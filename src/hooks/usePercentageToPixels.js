import { useState, useEffect } from "react";

function usePercentageToPixels(initialHeightPercent, initialWidthPercent) {
  const [heightPixels, setHeightPixels] = useState(
    (window.innerHeight * initialHeightPercent) / 100
  );
  const [widthPixels, setWidthPixels] = useState(
    (window.innerWidth * initialWidthPercent) / 100
  );

  useEffect(() => {
    const handleResize = () => {
      setHeightPixels((window.innerHeight * initialHeightPercent) / 100);
      setWidthPixels((window.innerWidth * initialWidthPercent) / 100);
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialHeightPercent, initialWidthPercent]);

  return { heightPixels, widthPixels };
}

export default usePercentageToPixels;
