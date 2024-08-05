const express = require('express');
const apayRouter = express.Router();
const authRouter = require("./auth/auth");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

apayRouter.use("/auth", authRouter);

apayRouter.get("/", (req, res) => {
  res.status(200).send("Apay Working...");
});

module.exports = apayRouter;
