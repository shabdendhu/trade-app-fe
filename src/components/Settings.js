import { SettingFilled } from "@ant-design/icons";
import { Button, Checkbox, Modal } from "antd";
import React, { useState } from "react";

const Settings = ({ open, setOpen, handleOk, handleCancel }) => {
  const [indicators, setIndicators] = useState({
    ema: false,
    sma: false,
    candelstick: true,
    bb: false,
    barseries: true,
    rsi: false,
    atr: false,
    movingaveragetooltip: true,
  });
  const handleChangeSetting = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    console.log({ ...indicators, [e.target.name]: !e.target.value });
    setIndicators({ ...indicators, [e.target.name]: !e.target.value });
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button> */}
      <SettingFilled onClick={() => setOpen(true)} />
      <Modal
        title="Basic Modal"
        open={open}
        onOk={() => handleOk(indicators)}
        onCancel={handleCancel}
      >
        <Checkbox
          checked={indicators.ema}
          onChange={handleChangeSetting}
          value={indicators.ema}
          name="ema"
        >
          Ema
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.sma}
          checked={indicators.sma}
          name="sma"
        >
          Sma
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.bb}
          checked={indicators.bb}
          name="bb"
        >
          BB
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.candelstick}
          checked={indicators.candelstick}
          name="candelstick"
        >
          CandelStick
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.rsi}
          checked={indicators.rsi}
          name="rsi"
        >
          Rsi
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.atr}
          checked={indicators.atr}
          name="atr"
        >
          Atr
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.movingaveragetooltip}
          checked={indicators.movingaveragetooltip}
          name="movingaveragetooltip"
        >
          Moveinig Avarage Tooltip
        </Checkbox>
        <Checkbox
          onChange={handleChangeSetting}
          value={indicators.barseries}
          checked={indicators.barseries}
          name="barseries"
        >
          Bar seares
        </Checkbox>
      </Modal>
    </>
  );
};

export default Settings;
