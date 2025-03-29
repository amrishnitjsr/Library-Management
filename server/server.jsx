const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
require("./auth"); // OAuth logic

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true
}));

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google Auth Route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth Callback
app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}));

// Facebook Auth Route
app.get("/auth/facebook", passport.authenticate("facebook"));

// Facebook Auth Callback
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}));

// Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("http://localhost:5173/login");
});

app.listen(5000, () => console.log("Server running on port 5000"));
