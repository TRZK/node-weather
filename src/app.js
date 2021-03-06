const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//  Setup handlebars engine and views location
app.set('views', viewsDirPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'trzk'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'trzk'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpMessage: "what is your problem bro?",
        title: 'Help',
        name: 'trzk'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: ' you must provide address query'
        })
    }
    let address = req.query.address

    if(address){
        geocode(address, (error, {longitude,latitude} = {})=>{
        
        if(error){
            return res.send({error})
        }else{
            forecast(longitude, latitude, (error, {forecast,location} = {})=>{
                if(error){
                    return res.send({error})
                }else{
                    res.send({
                        location,
                        forecast,
                        address
                    })
                }
            })
        }
    })}

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'no search query requested'
        })}
        console.log(req.query.search)
        res.send({
            products: []
        })
    
})

app.get('/weather', (req,res) => {
    res.send({
        forecast: 16,
        location: 'Istanbul'
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        message:"help article not found",
        title: 'Help 404',
        name: 'trzk'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:"the page not found",
        title: '404',
        name: 'trzk'
    })
})

app.listen(port, ()=>{
    console.log(`Server has started on port ${port} .`)
})

