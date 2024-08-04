const express = require('express');
const auth = require('../../admin_auth');

var gWifi = "";
var gbattery = "";
var gRam = "";
var gUptime = "";
var gTemp = "";

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
    res.status(200).end(process.version);
});
serverRouter.get('/ping', (req, res) => {
  res.status(200).end('ping');
});

serverRouter.post('/info/:token', (req, res) => {
  if(req.params.token == "admin"){
    const {wifi, battery, ram, uptime, temp} = req.body;
    if(!wifi || !battery || !ram || !uptime || !temp){
      res.status(400).json({error: 'Missing required fields'});
    }
    gWifi = wifi;
    gBattery = battery;
    gRam = ram;
    gUptime = uptime;
    gTemp = temp;
  }else {
    res.status(401).end('Not Authorized');
  }
});

serverRouter.get('/info', auth, (req, res) => {
  res.json({
    wifi: gWifi,
    battery: gBattery,
    ram: gRam,
    uptime: gUptime,
    temp: gTemp,
  });
});


serverRouter.get('/shutdown/:token', (req, res) => {
  if(req.params.token == "admin"){
    process.exit(0);
  }else {
    res.status(401).end('Not Authorized');
  }
});


module.exports = serverRouter;