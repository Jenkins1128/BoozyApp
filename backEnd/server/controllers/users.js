const User = require('../models').user;
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// Validation 
const Joi = require("@hapi/joi");

// Register & Login 
const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()

})

module.exports = {

    async create(req, res) {
        const {error} = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        // Check if email exists 
        const emailExist = await User.findOne({
            where: {
                email: req.body.email
            },
        })

        if (emailExist) return res.status(400).send("User already exists");

        // Hash passwords 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        return User
        .create({
            email: req.body.email,
            password: hashPassword
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    async login(req, res) {
        const {error} = schema.validate(req.body);

        if (error)
        {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({
            where: {
                email: req.body.email
            },
        })        

        //Check if username exists
        if (!user) 
        {
            return res.status(400).send("Email or password is incorrect");
        }

        // Check if password is correct 
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) 
        {
            return res.status(400).send('Invalid Password');
        }
       
        // Create and assign a token 
        const token = jwt.sign({id: user.id}, "fewfew");
        
        res.cookie('userId', token, { maxAge: 9000000, httpOnly: true });
        return res.status(202).send("Logged in!") 
    },
    async logout(req, res) {
        res.clearCookie('userId');
        return res.status(204).send('LOGGED OUT MAN');
    },
}