const express = require("express");

const mapUser = require("../helpers/mapUser");
const {login, register} = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
    try {
        const {token, user} = await register(req.body.login, req.body.password);

        res.cookie('token', token, {httpOnly: true})
            .send({error: null, user: mapUser(user)})
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {user, token} = await login(req.body.login, req.body.password);

        res.cookie('token', token, {httpOnly: true})
            .send({error: null, user: mapUser(user)});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        res.cookie('token', '', {httpOnly: true}).send({});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

module.exports = router;