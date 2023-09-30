import { SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
const GlobalSettings = () => {
  const [openGlobalSettingModal, setOpenGlobalSettingModal] = useState(false);
  const [chartWindow, setChartWindow] = useState(1);
  const handleChange = () => {
    setChartWindow(e.target.value);
  };
  const handleOpenGlobalSettingModal = () => {
    setOpenGlobalSettingModal(true);
  };
  const handleCloseGlobalSettingModal = () => {
    setOpenGlobalSettingModal(false);
  };
  const handleClickAuth = () => {
    axios
      .get(
        "https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=955319ac-7b6f-4565-9556-e5eb30685d9d&redirect_uri=https://trade-app-fe.vercel.app/custom/candel-chart&state=RnJpIERlYyAxNiAyMDIyIDE1OjU4OjUxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKQ%3D%3D."
      )
      .then((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "blue",
          position: "absolute",
          right: 20,
          bottom: 20,
          padding: 5,
          borderRadius: "100%",
          aspectRatio: 1,
          cursor: "pointer",
          zIndex: 9999999999,
        }}
      >
        <SettingOutlined
          onClick={handleOpenGlobalSettingModal}
          style={{
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
          }}
        />
      </div>
      <Modal
        open={openGlobalSettingModal}
        closeIcon={false}
        onCancel={handleCloseGlobalSettingModal}
      >
        <Input onChange={handleChange} placeholder="Chart Window Count" />
        <button onClick={handleClickAuth}>wefljn</button>
      </Modal>
    </>
  );
};

export default GlobalSettings;
