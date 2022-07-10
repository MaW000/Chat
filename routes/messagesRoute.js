const { addMessage, getMessages, getServerMessages } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/getservermsg/", getServerMessages);
module.exports = router;