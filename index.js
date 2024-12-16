const express = require("express");
const { models } = require("./db");
require('dotenv').config();
const app = express();

app.use(express.json());

const PORT = 3001;
app.listen(PORT);