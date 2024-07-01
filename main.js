
const serverRouter = require("./routes/server/server");
const httpProxy = require('http-proxy');
const express = require('express');
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
app.use('/kumes', (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.30:80' });
});

app.use("/", serverRouter);



app.listen(port, () => console.log(`Server listening on ${port}!`));

