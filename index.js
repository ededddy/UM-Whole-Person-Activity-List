const express = require("express");
const cors = require("cors");
const util = require("./utils/getJson");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.get("/activities", async (req, res) => {
  res.send(await util.getData());
});

app.listen(3000, () =>
  console.log("UM WP Scraping Sever is running on port 3000")
);
