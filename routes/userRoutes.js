const { setAvatar, getAllUsers } = require("../controllers/userController");
const router = require('express').Router()

router.post('/setAvatar/:id', setAvatar)
router.get('/allusers/:id', getAllUsers)
module.exports = router

