const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const { readdirSync } = require('fs')


//connect
mongoose.connect("mongodb://localhost/yelp-camp", ()=> {
    console.log('Connected to Database')
})

//set 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

//use
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


//INDEX
app.get('/campgrounds', catchAsync(async(req,res)=> {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))

//NEW AND CREATE
//NEW(form)
app.get('/campgrounds/new', (req,res)=> {
    res.render('campgrounds/new')
}) 
//POST
app.post('/campgrounds', catchAsync(async (req,res, next)=>{
        console.log(req.body.campground)
        const camp = new Campground({...req.body.campground})
        await camp.save()
        res.redirect('/campgrounds')
}))

//SHOW
app.get('/campgrounds/:id', catchAsync(async(req,res)=> {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', {campground})
}))

//EDIT AND UPDATE
//EDIT (form)
app.get('/campgrounds/:id/edit', catchAsync(async (req, res)=> {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', {campground})
}))
//Update(put)
app.put('/campgrounds/:id', catchAsync(async(req,res)=> {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${id}`)
})) 
 
//DELETE
app.delete('/campgrounds/:id', catchAsync(async(req,res)=> {
    const {id} = req.params
    const result = await Campground.findByIdAndDelete(id)
    console.log(res)
    res.redirect('/campgrounds') 
}))

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found', 404))
})

app.use((err,req,res,next)=> {
    const {statusCode = 500} = err
    if(!err.message) err.message = 'Oh no, something went wrong'
    res.status(statusCode).render('error', {err})
})
 
app.listen(3000, ()=> {
    console.log('Listening on port 3000...')
    console.log('___________________________')
})

