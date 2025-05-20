require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('./middleware/validateLogin');
const users = require('./mockDB');
const authRouter = require('./routes/auth');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use('/api', authRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
