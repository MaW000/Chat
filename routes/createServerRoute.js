const { createServer, getServer } = require('../controllers/serverController.js')
const router = require("express").Router()

router.post('/createserver', createServer)
router.get('/getserver', getServer)

module.exports = router