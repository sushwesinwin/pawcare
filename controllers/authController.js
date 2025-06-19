// responsible for the process of authenticating a user (logging them in, registering them, logging them
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const verifyToken = require('../utils/verifyToken');
const { generateToken } = require('../utils/token');
const { validateName, validateEmail, validatePassword } = require('../utils/helperFunction');

// exports.getRegister = (_, res) => {
//     res.render('auth/register', { title: 'Register'}); // view
// }

exports.postRegister = async (req, res) => {
    const { name, email, password, roleId } = req.body;

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);

    if (!nameCheck.isValid) {
        return res.status(400).json({ error: nameCheck.message });
    }
    if (!emailCheck.isValid) {
        return res.status(400).json({ error: emailCheck.message });
    }
    if (!passwordCheck.isValid) {
        return res.status(400).json({ error: passwordCheck.message });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashPassword = await bcrypt.hash(password, 10);
            
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                roleId
            }
        })
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(`Error during registration:`,error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// exports.getLogin = (req, res) => {
//     res.render('auth/login', { title: 'Login'}) 
// }

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await prisma.user.findUnique({where: { email }})
    if (!user) {
        return res.status(401).json({ // Unauthorized
            title: 'Login',
            error: 'User not found'
        })
    }
    if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        return res.json({ message: 'Login successful', token});
    }
    // // If password doesn't match
    // res.json({ error: 'Invalid credentials' }).redirect
    // ('/auth/login');
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Logout successful' }).redirect('/');
    })
}