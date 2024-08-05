require('dotenv').config();
const httpProxy = require('http-proxy');
const express = require('express');
const serverRouter = require("./routes/server/server");
const apayRouter = require("./routes/apay/main");

const app = express();
const proxy = httpProxy.createProxyServer({});
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Uncomment and configure if needed for authentication and proxy
/*
const auth = function (req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== 'admin' || user.pass !== 'apolandin') {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

app.use('/kumes', auth, (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.30:80' }, function (e) {
        res.status(500).end("port unavailable: Lutfen yonetici ile iletisime gecin.");
    });
});

app.use('/', (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.31:4000' }, function (e) {
        res.status(500).end("port unavailable: Lutfen yonetici ile iletisime gecin.");
    });
});
*/

app.use("/apay", apayRouter);
app.use("/", serverRouter);

app.listen(port, () => console.log(`Server listening on ${port}!`));
