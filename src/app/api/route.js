// import axios from "axios";

import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // Method Not Allowed
  // }
  const reqBody = await request.json();
  // Your Upstox API credentials
  const clientId = "955319ac-7b6f-4565-9556-e5eb30685d9d";
  const clientSecret = "q068cmks7h";
  const redirectUri = "https://trade-app-fe.vercel.app/custom/candel-chart";

  const authCode = "vwqnTq";

  // Prepare the data for the POST request to Upstox
  const requestData = new URLSearchParams();
  requestData.append("code", authCode);
  requestData.append("client_id", clientId);
  requestData.append("client_secret", clientSecret);
  requestData.append("redirect_uri", redirectUri);
  requestData.append("grant_type", "authorization_code");

  try {
    // Make the POST request to Upstox's token endpoint
    const response = await axios.post(
      "https://api-v2.upstox.com/login/authorization/token",
      {
        code: reqBody.code,
        client_id: "955319ac-7b6f-4565-9556-e5eb30685d9d",
        client_secret: "q068cmks7h",
        redirect_uri: "https://trade-app-fe.vercel.app/custom/candel-chart",
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Api-Version": "2.0",
          Accept: "application/json",
        },
      }
    );

    // Store the access token securely or send it back to the client
    console.log(accessToken);
    const accessToken = response.data.access_token;

    // res.status(200).json({ access_token: accessToken });
    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
