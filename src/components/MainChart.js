import React, { useEffect, useState } from "react";
import ChartHeader from "./ChartHeader";
import CandleStickChartWithCHMousePointer from "./Chart";
import usePercentageToPixels from "@/hooks/usePercentageToPixels";

const MainChart = ({ data, width, height }) => {
  const [enableIndicators, setEnableIndicators] = useState({
    ema: false,
    sma: false,
    candelstick: true,
    bb: false,
    barseries: true,
    rsi: false,
    atr: false,
    movingaveragetooltip: false,
  });
  const { heightPixels, widthPixels } = usePercentageToPixels(height, width);

  const handleApply = (e) => {
    console.log("oooooooooo");
    console.log(e);
    setEnableIndicators(e);
  };
  useEffect(() => {
    console.log(heightPixels, widthPixels);
  }, []);
  return (
    <div>
      <ChartHeader
        width={widthPixels}
        height={heightPixels}
        onApply={handleApply}
      />
      <CandleStickChartWithCHMousePointer
        type={"svg"}
        data={data}
        width={widthPixels}
        height={heightPixels}
        enableIndicators={enableIndicators}
      />
    </div>
  );
};

export default MainChart;
