//POST https://api.copper.com/developer_api/v1/leads/{{example_leadconvert_id}}/convert

import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const lead_data = {
      details: {
        person: {
          name: req.body.name,
          contact_type: req.body.contact_type,
          assigned_id: req.body.assigned_id,
        },
      },
    };
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(lead_data);

    const result = await fetch(
      `https://api.copper.com/developer_api/v1/leads/${req.body.contact_id}/convert`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-PW-AccessToken": "7e21736f08f9f849d2ba150babf3e335",
          "X-PW-Application": "developer_api",
          "X-PW-UserEmail": "clientaccess@connex.digital",
        },
        body: JSONdata,
      }
    );
    const data = await result.json();
    console.log("Result of create", data);
    res.status(200).json({ data: data });
  } else {
    // Handle any other HTTP method
    console.log("GET");
    res.status(200).json({ data: "Method not allowed" });
  }
}
