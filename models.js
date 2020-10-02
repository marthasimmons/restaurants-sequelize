const {Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class Restaurant extends Model {}
class Menu extends Model {}
class Item extends Model {}
class Table extends Model {}
class Booking extends Model {}

Restaurant.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
}, {sequelize})

Menu.init({
    name: DataTypes.STRING
}, {sequelize})

Item.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
}, {sequelize})

Table.init({
}, {sequelize})

Booking.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE

}, {sequelize})

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

Menu.hasMany(Item)
Item.belongsTo(Menu)

Restaurant.hasMany(Table)
Table.belongsTo(Restaurant)

Table.hasMany(Booking)
Booking.belongsTo(Table)

module.exports = {
    sequelize,
    Restaurant,
    Menu,
    Item,
    Table,
    Booking
}