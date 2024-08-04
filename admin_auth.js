const express = require('express');


const auth = function (req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== 'admin' || user.pass !== 'apolandin') {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

module.exports = auth;