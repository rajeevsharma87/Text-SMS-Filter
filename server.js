// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Render.com Cloud Server!");
});

app.post("/api/v1/textspam/ios", (req, res) => {
  console.log("Received iOS filter request:");
  console.log(req.body);

  const sender = req.body?.query?.sender || "";
  const messageText = req.body?.query?.message?.text || "";
  const lowerMessage = messageText.toLowerCase();

  let response = {
    action: "allow",
    subAction: null
  };

  if (
    lowerMessage.includes("lottery") ||
    lowerMessage.includes("free gift") ||
    lowerMessage.includes("crypto") ||
    lowerMessage.includes("congratulations you won") || lowerMessage.includes("won")
  ) {
    response = {
      action: "junk",
      subAction: null
    };
  } else if (
    lowerMessage.includes("sale") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("coupon") ||
    lowerMessage.includes("use code")  || lowerMessage.includes("good news")
  ) {
    response = {
      action: "promotion",
      subAction: "promotionalOffers"
    };
  } else if (
    lowerMessage.includes("otp") ||
    lowerMessage.includes("transaction") ||
    lowerMessage.includes("bank") ||
    lowerMessage.includes("payment") || lowerMessage.includes("low bal. alert") || lowerMessage.includes("recharge")
  ) {
    response = {
      action: "transaction",
      subAction: "transactionalOthers"
    };
  }

  console.log("Sending response:");
  console.log(response);
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
