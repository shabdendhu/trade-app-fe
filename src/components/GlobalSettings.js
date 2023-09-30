"use client";

import { SettingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import UpstoxClient, { LoginApi } from "upstox-js-sdk";

class UpstoxLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: "955319ac-7b6f-4565-9556-e5eb30685d9d",
      redirect_uri: "https://trade-app-fe.vercel.app/custom/candel-chart",
      state: "",
    };
  }

  render() {
    const { api_key, redirect_uri, state } = this.state;

    // Construct the Upstox login URL
    const loginUrl = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${api_key}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&state=${encodeURIComponent(state)}`;

    return (
      <div>
        <h2>Upstox Login</h2>
        <p>Click the button below to log in to Upstox:</p>
        <a href={loginUrl}>
          <button>Login to Upstox</button>
        </a>
      </div>
    );
  }
}

// export default UpstoxLogin;

const GlobalSettings = () => {
  const [openGlobalSettingModal, setOpenGlobalSettingModal] = useState(false);
  const [chartWindow, setChartWindow] = useState(1);
  const router = useSearchParams();
  const handleChange = () => {
    setChartWindow(e.target.value);
  };
  const handleOpenGlobalSettingModal = () => {
    setOpenGlobalSettingModal(true);
  };
  const handleCloseGlobalSettingModal = () => {
    setOpenGlobalSettingModal(false);
  };

  const handleClickAuth = (code) => {
    console.log(code);
    axios.post("/api", { code }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    console.log("====================================");
    if (router.has("code")) {
      // console.log(router.get("code"));
      // handleClickAuth(router.get("code"));

      let apiInstance = new LoginApi();
      let clientId = "955319ac-7b6f-4565-9556-e5eb30685d9d"; // String |
      let redirectUri = "https://trade-app-fe.vercel.app/custom/candel-chart"; // String |
      let apiVersion = "2.0"; // String | API Version Header
      let opts = {
        // state: "state_example", // String |
        scope: "authorization_code", // String |
      };
      apiInstance.authorize(
        clientId,
        redirectUri,
        apiVersion,
        opts,
        (error, data, response) => {
          if (error) {
            console.error(error);
          } else {
            console.log("API called successfully.", data, response);
          }
        }
      );
    }
  }, []);
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
        <UpstoxLogin />
        <button>jke</button>
      </Modal>
    </>
  );
};

export default GlobalSettings;
