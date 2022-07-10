
const serverModel = require('../model/serverModel')

module.exports.createServer = async (req, res, next) => {
    try{
        console.log(1)
        const { serverName} = req.body
        console.log(serverName)
        const data = await serverModel.create({
            server: serverName
        })
        if(data) return res.json({msg:`Server "${serverName}" created Successfully`})
        return res.json({msg: 'Failed to add message to database'})
    } catch(err) {
        next(err)
    }
}

module.exports.getServer = async (req, res, next) => {
    try{
        console.log(1)
        const users = await serverModel.find({})
        return res.json(users)
    } catch(err) {
        next(err)
    }

}
