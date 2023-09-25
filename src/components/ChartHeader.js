import React, { useState } from "react";
import Settings from "./Settings";

const ChartHeader = ({ onApply, width, height }) => {
  const [open, setOpen] = useState(false);
  const handleOk = (e) => {
    console.log("setting", e);
    onApply(e);
    setOpen(false);
  };
  return (
    <div
      style={{
        width: "100%",
        background: "green",
        height: 0.05 * height,
        display: "flex",
        alignItems: "center",
      }}
    >
      ChartHeader
      <Settings
        open={open}
        handleCancel={() => setOpen(false)}
        handleOk={handleOk}
        setOpen={setOpen}
      />
    </div>
  );
};

export default ChartHeader;
