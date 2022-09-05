const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost/yelp-camp', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany()
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20)
        const camp = new Campground({
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur minus officiis, in maiores eaque quo animi dolorem voluptatum deserunt. Recusandae.',
            price: price
        })
        await camp.save()
    }

}

seedDB().then(() => {
    console.log('Database Disconnected')
    mongoose.connection.close()
})

