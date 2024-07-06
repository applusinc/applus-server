const serverRouter = require("./routes/server/server");
const httpProxy = require('http-proxy');
const express = require('express');
const basicAuth = require('basic-auth');
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

// KUMES AUTH
const auth = function (req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== 'admin' || user.pass !== 'apolandin') {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

//KUMES PROXY 192.168.1.30:80
app.use('/kumes', auth, (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.30:80' }, function (e) {
        res.status(500).end("port unavailable: Lutfen yonetici ile iletisime gecin.");
    });
});

// SERVER PROXY 192.168.1.31:4000
app.use('/', (req, res) => {
    proxy.web(req, res, { target: 'http://192.168.1.31:4000' }, function (e) {
        res.status(500).end("port unavailable: Lutfen yonetici ile iletisime gecin.");
    });
});

app.use("/", serverRouter);

app.listen(port, () => console.log(`Server listening on ${port}!`));
