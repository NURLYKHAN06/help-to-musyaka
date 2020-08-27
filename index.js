const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/index");

console.log(44);

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join("index.html"));
});

app.use("/api", routes);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error", error);
    process.exit(1);
  }
}

start();
