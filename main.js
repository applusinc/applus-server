const dotenv = require('dotenv');
dotenv.config();
//require('dotenv').config({ path: '/full/custom/path/to/your/env' })
const serverRouter = require("./routes/server/server");
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;


app.use("/", serverRouter);


app.listen(port, () => console.log(`Server listening on ${port}!`));