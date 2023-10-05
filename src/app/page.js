"use client";
import React, { useState, useEffect } from "react";
import { getData } from "@/utils/getData";
import MainChart from "@/components/MainChart";
import GlobalSettings from "@/components/GlobalSettings";

function ChartComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        gridTemplateColumns: "auto auto",
      }}
    >
      <MainChart data={data} width={50} height={50} />
      <MainChart data={data} width={50} height={50} />
      <MainChart data={data} width={50} height={50} />
      <MainChart data={data} width={50} height={50} />
      <GlobalSettings />
    </div>
  );
}

export default ChartComponent;
