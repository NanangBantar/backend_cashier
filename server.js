const app = require("express")();
const express = require("express");
const http = require("http").Server(app);
const cors = require("cors");
const dotenv = require("dotenv");
const mongoConnect = require("./connection/mongoConnect");

const PORT = process.env.PORT || 5000;
mongoConnect();
dotenv.config();

app.use(
  express.json({
    extended: false,
  }),
  express.urlencoded({
    extended: true,
  }),
  cors()
);

app.use("/user", require("./routes/user/"));

http.listen(PORT, () => {
  console.log(`Backend is running on PORT ${PORT}`);
});
