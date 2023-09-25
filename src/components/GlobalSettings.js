import { SettingOutlined } from "@ant-design/icons";
import React from "react";

const GlobalSettings = () => {
  return (
    <div
      style={{
        backgroundColor: "blue",
        position: "absolute",
        right: 20,
        bottom: 20,
        padding: 5,
        borderRadius: "100%",
        aspectRatio: 1,
      }}
    >
      <SettingOutlined
        style={{
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
        }}
      />
    </div>
  );
};

export default GlobalSettings;
