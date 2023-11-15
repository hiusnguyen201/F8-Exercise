var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const layouts = require("express-ejs-layouts");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
const appsRouter = require("./routes/apps");
const authRouter = require("./routes/auth");
const localPassport = require("./passport/local.passport");
const AuthMiddleware = require("./middlewares/auth.middleware");
const GuestMiddleware = require("./middlewares/guest.middleware");

var app = express();
app.use(
  session({
    secret: "database_lab40_nguyenminhhieu",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use("local", localPassport);

app.set("layout", "layouts/layout");
app.use(layouts);
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", GuestMiddleware, authRouter);

app.use(AuthMiddleware);
app.use("/", indexRouter);
app.use("/apps", appsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
