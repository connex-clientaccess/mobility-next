import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const result = await fetch(
      `https://api.copper.com/developer_api/v1/leads/search?emails=reymio1@hotmail.com`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-PW-AccessToken": "7e21736f08f9f849d2ba150babf3e335",
          "X-PW-Application": "developer_api",
          "X-PW-UserEmail": "clientaccess@connex.digital",
        },
      }
    );
    const data = await result.json();
    console.log(data);
    //console.log("POST");
    res.status(200).json({ data: data });
  } else {
    // Handle any other HTTP method
    console.log("GET");
    res.status(200).json({ data: "test" });
  }
}
