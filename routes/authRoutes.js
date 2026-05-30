const router = require("express").Router();
const passport = require("passport");

// Start GitHub login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    res.send("Login successful");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out successfully");
  });
});

module.exports = router;