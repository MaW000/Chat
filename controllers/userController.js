const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports.register = async (req, res, next) => {
    
    try {
        const {username, password} = req.body
    const usernameCheck = await User.findOne({ username, })
    if(usernameCheck){
        return res.json({msg:"Username already used", status: false})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        password: hashedPassword
    })

    const token = jwt.sign(JSON.stringify(user), process.env.SECRET)
    return res.json({ status: true, user, token})
    } catch(err) {
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password} = req.body
    const user = await User.findOne({ username, })
    
    if(!user){
        return res.json({msg:"Incorrect username or password", status: false})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({ msg: "Incorrect username or password", status: false })
    }
    const token = jwt.sign(JSON.stringify(user), process.env.SECRET)
    return res.json({ status: true, user, token})
    } catch(err) {
        next(err)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image 
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        },
        { new: true }
        );
        return res.json({ 
            isSet:userData.isAvatarImageSet, 
            image:userData.avatarImage 
        })
    } catch(err) {
        next(err)
    }
}
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id}}).select([
            'email',
            'username',
            'avatarImage',
            '_id'
        ])
        return res.json(users)
    } catch(err) {
        next(err)
    }
}