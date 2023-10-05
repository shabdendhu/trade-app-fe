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

  // Prepare the data for the POST request to Upstox
  const requestData = new URLSearchParams();
  requestData.append("code", reqBody.code);
  requestData.append("client_id", clientId);
  requestData.append("client_secret", clientSecret);
  requestData.append("redirect_uri", redirectUri);
  requestData.append("grant_type", "authorization_code");

  try {
    // Make the POST request to Upstox's token endpoint using the Fetch API
    const response = await fetch(
      "https://api-v2.upstox.com/login/authorization/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Api-Version": "2.0",
          Accept: "application/json",
        },
        body: requestData.toString(),
      }
    );
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    // console.log(Object.keys(res));
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response}`);
    // }

    // const responseData = await response.json();
    // const accessToken = responseData.access_token;

    // console.log(accessToken);

    return NextResponse.json({ access_token: response }, { status: 200 });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
