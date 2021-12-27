const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Routes Files
const admin = require("./routes/admin");
const mclass = require("./routes/class");
const session = require("./routes/session");
const subject = require("./routes/subject");
const instructor = require("./routes/instructor");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const app = express();

//Boy Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//file uploads
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 300,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable CORS
app.use(cors());

//Mount Routers
app.use("/api/v1/admin/", admin);
app.use("/api/v1/class/", mclass);
app.use("/api/v1/session/", session);
app.use("/api/v1/subject", subject);
app.use("/api/v1/instructor", instructor);

app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "/public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 8000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close Server & exit Process

  server.close(() => process.exit(1));
});
