const express = require('express');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('../middleware/validateLogin');
const users = require('../mockDB');
const router = express.Router();
const bcrypt = require('bcrypt');


function generateAccessToken({email}) {
    return jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Wrong credentials(Token)' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
            return res.status(403).json({ message: 'Expired token' })
        req.user = user;
        next();
    });
}

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

router.post('/login', validateLogin, (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Wrong credentials' });
    }

    try {
        const token = generateAccessToken({ email });
        return res.status(200).json({ token });
    } 
    catch(err) {
        return res.status(500).json({ message: 'JWT generation fails' });
    }
});


router.get('/verify', authenticateToken, (req, res) => {
    return res.status(200).json( req.user.email);
})


module.exports = router;