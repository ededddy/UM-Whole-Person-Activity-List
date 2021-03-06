const express = require("express");
const cors = require("cors");
const util = require("./utils/getJson");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.get("/activities", async (req, res) => {
  try {
    res.send(await util.getData());
  } catch (err) {
    res.send(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`UM WP Scraping Sever is running on port ${PORT}`)
);
