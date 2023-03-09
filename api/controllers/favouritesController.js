const {FavouriteDevice, Device} = require("../models/models");
const {Op} = require("sequelize");

class FavouritesController {
    async add(req, res) {
        let {userId, deviceId} =  req.body
        const favouriteDevice = await FavouriteDevice.create({userId, deviceId})
        return res.json(favouriteDevice)
    }

    async getAll(req, res) {
        let {userId} = req.query
        const favouriteDevices = await FavouriteDevice.findAll({where:{userId}})
        let favouriteDevicesArray = []
        for (let i = 0; i < favouriteDevices.length; i++) {
            const id = favouriteDevices[i].dataValues.deviceId
            const device = await Device.findOne({where:{id}})
            favouriteDevicesArray.push(device)
        }
        return res.json(favouriteDevicesArray)
    }


    async getOne(req, res) {
        let {userId, deviceId} = req.query
        const isFavourite = await FavouriteDevice.findOne({
            where: {
                [Op.and]: [
                    {userId},
                    {deviceId}
                ]
            }
        });
        return res.json(isFavourite)
    }

    async destroyOne(req, res) {
        console.log(req.query)
        let {userId, deviceId} =  req.query
        const favouriteDevice = await FavouriteDevice.destroy({
            where: {
                [Op.and]: [
                    {userId},
                    {deviceId}
                ]
            }
        });
        return res.json(favouriteDevice)
    }

}

module.exports = new FavouritesController()