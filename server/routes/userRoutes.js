const router = require('express').Router();

const User = require('../db/users');



router.post('/register', async (req, res, next) => {
    try {
        await User.checkEmail(req.body.email);
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        process.env.API_KEY = req.body.apiKey;
        return res.status(201).send({ user, token });
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error('credentials are required');
        };
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        process.env.API_KEY = req.body.apiKey;
        return res.send({ user, token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

module.exports = router;