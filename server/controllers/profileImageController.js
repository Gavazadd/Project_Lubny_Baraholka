const {UserImg} = require('../models/models')
const imgService = require("../services/imgService/create-img");


class ProfileImageController {

    async rewrite(req, res) {
            let {userId} =  req.body
            let {img} =  req.files
            const createdImg = await imgService.createImg(img)
            const userImg = await UserImg.update({img: createdImg, userId},{where:{userId}})
            return res.json(userImg)

    }


    async getOne(req, res) {
        const {userId} = req.query
        const userImg = await UserImg.findOne({where: {userId}},
        )
        return res.json(userImg)
    }
}

module.exports = new ProfileImageController()