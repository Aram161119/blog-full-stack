const express = require("express");

const mapUser = require("../helpers/mapUser");
const {getUsers, getRoles, updateUser, deleteUser} = require("../controllers/user");
const auth = require("../middlewares/auth");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true })

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const users = await getUsers();

        res.send({data: users.map(mapUser)});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.get('/roles', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const roles = await getRoles();

        res.send({data: roles});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.patch('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        const newUser = await updateUser(req.params.id, {
            role: req.body.roleId
        });

        res.send({data: mapUser(newUser)});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
    try {
        await deleteUser(req.params.id);

        res.send({error: null});
    } catch (error) {
        res.send({error: error.message || "Unknown error"});
    }
})

module.exports = router;