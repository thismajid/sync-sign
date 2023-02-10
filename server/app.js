const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const configs = require("./configs");
const indexRouter = require("./routes");

const app = express();

app.use(
  session({
    secret: configs.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configs.NODE_ENV !== "production" && app.use(morgan("dev"));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (statusCode === 500) message = "Internal Server Error";

  res.status(statusCode).json({ message });
});

const PORT = parseInt(configs.SERVER_PORT);

app.listen(PORT, () => console.info(`server listening on port ${PORT} ...`));
