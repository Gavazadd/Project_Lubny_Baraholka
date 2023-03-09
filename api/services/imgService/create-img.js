const uuid = require("uuid");
const path = require("path");

class CreateImgService {

  async createImg(img,) {
      let filename = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', '..', `static`, filename))
      return filename;
  }

}

module.exports = new CreateImgService()