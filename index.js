const express = require("express");
const { models } = require("./db");
const router = require("./src/routes");
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

const PORT = 3001;
app.listen(PORT);