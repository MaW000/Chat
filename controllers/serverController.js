
const serverModel = require('../model/serverModel')

module.exports.createServer = async (req, res, next) => {
    try{
     
        const { serverName} = req.body
       
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
       
        const users = await serverModel.find({})
        return res.json(users)
    } catch(err) {
        next(err)
    }

}
