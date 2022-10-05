import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const lead_data = {
      name: req.body.first + " " + req.body.last,
      email: {
        email: req.body.email,
        category: "work",
      },
      address: {
        street: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.zip,
        country: "United States",
      },
      details: req.body.description,
      assignee_id: req.body.owner,
      custom_fields: [
        {
          custom_field_definition_id: 79376,
          value: req.body.product_interest,
        },
      ],
      customer_source_id: req.body.customer_source,
    };
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(lead_data);

    const result = await fetch(
      `https://api.copper.com/developer_api/v1/leads`,
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
