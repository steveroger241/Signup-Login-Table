const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db.js');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes.js');

app.use('/auth', authRoutes);

app.listen(process.env.port);