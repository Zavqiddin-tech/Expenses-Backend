const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(cors());
app.use(express.json());
app.use(cookieParser({}));
app.use(limiter)
app.use(express.static("static"));
app.use(fileUpload({}));


// API endpoints
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/invest", require("./routes/invest.routes"));
app.use("/api/expenses", require("./routes/expenses.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/post", require("./routes/post.routes"));

//  Mieddleware
app.use(errorMiddleware);


const PORT = process.env.PORT || 4100;
const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected DB"));
    app.listen(PORT, () => {
      console.log(`Listening on - ${PORT}`);
    });
  } catch (error) {
    console.log(`Error conecting with DB: ${error}`);
  }
};

bootstrap();
