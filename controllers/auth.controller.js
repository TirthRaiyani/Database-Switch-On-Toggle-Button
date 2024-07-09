const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MongoUser = require('../models/mongoUser.model');
const MySQLUser = require('../models/mysqlUser.model');
const toggleService = require('../services/toggle.service');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;

        if (toggleService.isMongo()) {
            user = new MongoUser({ username, password: hashedPassword });
        } else {
            user = await MySQLUser.create({ username, password: hashedPassword });
        }

        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user;

        if (toggleService.isMongo()) {
            user = await MongoUser.findOne({ username });
        } else {
            user = await MySQLUser.findOne({ where: { username } });
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message:'Invalid credentials'});
        }

        const token = jwt.sign({ id: user._id || user.id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};




// exports.register = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!(username && password)) {
//             return res.status(400).json(new ApiError(400, null, "username, email and password are required"));
//         }

//         const existingUser = await MongoUser.findOne({
//             $or: [ { username } ]
//         });
//         if (existingUser) {
//             return res.status(200).json({ statusCode: 200, message: "User Already Exists", data: existingUser });
//         }

//         const user = await MongoUser.create({
//             username,
//             password,
//             status: true,
//         });

//         // await sendWelcomeEmail(user.email);

//         return res.status(200).json({ Error: "false", statuscode: "200", message: "Registered Successfully", data: user, accessToken });
//     } catch (error) {
//         console.error("Error during creation:", error);
//         return res.status(500).json({ statuscode: 500, data: null, message: "An error occurred during registration" });
//     }
// };