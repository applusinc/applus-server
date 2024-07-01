
const serverRouter = require("./routes/server/server");
const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
app.use('/kumes', createProxyMiddleware({ 
    target: 'http://192.168.1.30:80', 
    changeOrigin: true,
    pathRewrite: {
        '^/kumes': '/', // /server ile başlayan yolları hedef sunucuda / olarak değiştirir
    },
}));

app.use("/", serverRouter);



app.listen(port, () => console.log(`Server listening on ${port}!`));

