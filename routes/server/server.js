const express = require('express');

const serverRouter = express.Router();


serverRouter.get('/ping', (req, res) => {
  res.status(200).end('ping');
});

serverRouter.get('/shutdown/:token', (req, res) => {
  if(req.params.token == "admin"){
    process.exit(0);
  }else {
    res.status(401).end('Not Authorized');
  }
});


module.exports = serverRouter;