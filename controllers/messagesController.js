
const messageModel = require('../model/messageModel')

module.exports.addMessage = async (req, res, next) => {
    try{
        const { from, to, message, username } = req.body
        const data = await messageModel.create({
            message:{text: message},
            users: [from, to],
            sender: from,
            username: username
        })
        if(data) return res.json({msg:"Message added Successfully"})
        return res.json({msg: 'Failed to add message to database'})
    } catch(err) {
        next(err)
    }
}

module.exports.getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await messageModel.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      
      res.json(projectedMessages);
      
    } catch (ex) {
      next(ex);
    }
  };

module.exports.getServerMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await messageModel.find({
      users: {
        $all: [to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      if (msg.sender.toString() === from) {
        return {
          fromSelf: true,
          message: msg.message.text
        }
      } else {
        console.log(messages)
        return {
          fromSelf: false,
          message: msg.message.text,
          username: msg.username
        }
      }
    });

    res.json(projectedMessages);

  } catch (ex) {
    next(ex);
  }
};

