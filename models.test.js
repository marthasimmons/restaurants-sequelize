const {sequelize} = require("./models")
const {Restaurant} = require("./models")
const {Menu} = require("./models")
const {Item} = require("./models")
const {Table} = require("./models")
const {Booking} = require("./models")

beforeAll(async () => {
    await sequelize.sync()
})
    


describe('Restaurant', () => {
    
     test('Can create new restaurants' , async () => {
        const downTheHatch = await Restaurant.create({name: "Down The Hatch", description: "Vegan Burgers!", image: "url"})

        
        expect(downTheHatch.name).toEqual("Down The Hatch")
        expect(downTheHatch.id).toBe(1)
    })

})

describe('Menu', () => {
    
    test('Can create new menus' , async () => {
       const mowgli = await Restaurant.create({name: "Mowgli", description: "Indian Street Food", image: "url"})
       const curries = await  Menu.create({name: "Curries"})
       const carbs = await  Menu.create({name: "Carbs"})
       await mowgli.addMenu(curries)
       await mowgli.addMenu(carbs)
       menus = await mowgli.getMenus()

       expect(menus.length).toBe(2)
       expect(menus[0].name).toBe("Curries")

   })

})

describe('Item', () => {
    
    test('Can create new items' , async () => {
       const crust = await Restaurant.create({name: "Crust", description: "Pizzas!!", image: "url"})
       const pizza = await  Menu.create({name: "Pizza"})
       const margherita = await Item.create({name: "Margherita", price: 8.50})
       const pepperoni  = await Item.create({name: "Pepperoni", price: 9.00})
       
       await crust.addMenu(pizza)
       menus = await crust.getMenus()

       await menus[0].addItem(margherita)
       await menus[0].addItem(pepperoni)

       items = await menus[0].getItems()

       expect(items.length).toBe(2)
       expect(items[1].name).toBe('Pepperoni')

   })

})

describe('Table', () => {
    
    test('Can create new tables' , async () => {
       const rosas = await Restaurant.create({name: "Rosa's", description: "Thai cafe", image: "url"})
       const table1 = await Table.create({})
       const table2 = await Table.create({})
       const table3 = await Table.create({})

       await rosas.addTable(table1)
       await rosas.addTable(table2)
       await rosas.addTable(table3)
    
       tables = await rosas.getTables()

       expect(tables.length).toBe(3)

   })

})

describe('Booking', () => {
    
    test('Can create new booking' , async () => {
       const maccies = await Restaurant.create({name: "Maccies", description: "Fast Food", image: "url"})
       const table1 = await Table.create({})
       const booking = await Booking.create({name: "Jessica Seymour", date: "2020-10-17T20:30" })
       
       
       await maccies.addTable(table1)
       tables = await maccies.getTables()

       await tables[0].addBooking(booking)
       bookings = await tables[0].getBookings()
    

       expect(bookings.length).toBe(1)
       expect(bookings[0].name).toBe("Jessica Seymour")

   })

})

