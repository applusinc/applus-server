
const serverRouter = require("./routes/server/server");
const httpProxy = require('http-proxy');
const express = require('express');
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
app.use('/kumes', (req, res) => {
    try{
        proxy.web(req, res, { target: 'http://192.168.1.30:80' });
    }catch(e){
        res.status(500).end("Port unavailable");
    }
});

app.use('/', (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.31:4000' });
});

app.use("/", serverRouter);



app.listen(port, () => console.log(`Server listening on ${port}!`));

