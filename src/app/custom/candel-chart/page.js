"use client";
import React, { useState, useEffect } from "react";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "@/utils/getData";
import CandleStickChartWithCHMousePointer from "@/components/Chart";
import CandleStickChartWithBollingerBandOverlay from "@/components/CandlestickChart";

function ChartComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <CandleStickChartWithCHMousePointer
        type={"svg"}
        data={data}
        width={window.innerWidth}
        height={window.innerHeight - 100}
      />
      {/* <CandleStickChartWithCHMousePointer
        type={"svg"}
        data={data}
        width={window.innerWidth / 2 - 20}
        height={window.innerHeight / 2}
      /> */}
      {/* <CandleStickChartWithBollingerBandOverlay
        type={"svg"}
        data={data}
        width={1000}
      /> */}
      {/* <TypeChooser>
        {(type) => (
        )}
      </TypeChooser> */}
    </div>
  );
}

export default ChartComponent;
