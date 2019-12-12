require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/sister-in-home", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// Express View engine setup

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));

// default value for title local

// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);
require("./passport")(app);
// app.use(flash());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

const index = require("./routes/api/index");
app.use("/api", index);

const authRoutes = require("./routes/api/auth.routes");
app.use("/api/auth", authRoutes);

module.exports = app;
