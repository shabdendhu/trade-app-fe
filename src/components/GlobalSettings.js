import { SettingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Modal, Input } from "antd";
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
      </Modal>
    </>
  );
};

export default GlobalSettings;
