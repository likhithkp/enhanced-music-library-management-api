const express = require("express");
const cors = require("cors")

require('dotenv').config();
const { models } = require("./db");

const router = require("./src/routes");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

const PORT = 3001;
app.listen(PORT);