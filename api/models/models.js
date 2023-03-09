const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  isActivated:{type: DataTypes.BOOLEAN, defaultValue: false},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  isUserInfo:{type: DataTypes.BOOLEAN, defaultValue: false},
  activationLink:{type: DataTypes.STRING}
})

const UserInfo = sequelize.define('user_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  phone: {type: DataTypes.INTEGER, unique: true, allowNull: false },
})

const UserImg = sequelize.define('user_img', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  img: {type: DataTypes.STRING, defaultValue: null}
})

const UserAdditionalInfo = sequelize.define('user_additional_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}
})

const Device = sequelize.define('device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  price: {type: DataTypes.BIGINT, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false}
})

const DeviceInfo = sequelize.define('device_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}
})

const FavouriteDevice = sequelize.define('favourite_device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const OfferType = sequelize.define('offer_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CategoryType = sequelize.define('category_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(FavouriteDevice)
FavouriteDevice.belongsTo(User)

User.hasOne(UserImg)
UserImg.belongsTo(User)

UserInfo.hasMany(UserAdditionalInfo, {as: 'additional_info'})
UserAdditionalInfo.belongsTo(UserInfo)

User.hasMany(Device)
Device.belongsTo(User)

Category.hasMany(Device)
Device.belongsTo(Category)

OfferType.hasMany(Device)
Device.belongsTo(OfferType)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Device.hasMany(FavouriteDevice);
FavouriteDevice.belongsTo(Device)

Category.belongsToMany(OfferType, {through: CategoryType })
OfferType.belongsToMany(Category, {through: CategoryType })

module.exports = {
  User,
  Device,
  Category,
  OfferType,
  CategoryType,
  DeviceInfo,
  UserInfo,
  UserAdditionalInfo,
  UserImg,
  FavouriteDevice
}