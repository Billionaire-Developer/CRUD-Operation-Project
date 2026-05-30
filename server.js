const dotenv = require("dotenv");
dotenv.config(); // MUST BE FIRST (critical fix)

const express = require("express");
const connectDB = require("./config/db");

const session = require("express-session");
const passport = require("./config/passport");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Connect DB
connectDB();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// SESSION (required for OAuth)
// ======================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
);

// ======================
// PASSPORT SETUP
// ======================
app.use(passport.initialize());
app.use(passport.session());

// ======================
// SWAGGER DOCS
// ======================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======================
// ROUTES
// ======================
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("TaskFlow API Running 🚀");
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("CLIENT_ID =", process.env.GITHUB_CLIENT_ID ? "Loaded ✔" : "Missing ❌");
});