const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 8080;

const corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));
app.use(express.static("public"));

async function getRandomImage() {
  const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`Unsplash error: ${res.status}`);
  }

  const data = await res.json();
  return data.urls.regular;
}

app.get("/api/v1/getRandomImage", async (req, res) => {
  try {
    const url = await getRandomImage();
    res.status(200).json({ status: 200, data: url });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
