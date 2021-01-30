const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const viewPath = path.join(__dirname,'../templates/views')
app.set('views', viewPath)

//Partial Path Config to show header footer
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)


//Setup handlebars engine and views location
app.set('view engine', 'hbs') 


//Setup static directory to serve like index.html in url
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

//Main Page Route
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jamal Ahmad'
    })
})

//About Page
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Jamal Ahmad'
    })
})

//Help Page
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'This is some helpful text',
        name : 'Jamal Ahmad Khan'
    })
})


// Sending back forcast Json
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            'Error':'Please Enter Search Term'
        })
    }

    geocode(req.query.address, (error,{ latitude, longitude, location } = {})=>{
        if(error){
           return res.send(error)
           
        }
       
        forcast(latitude,longitude, (error,forcastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forcast : forcastData,
                location,
                address : req.query.address

            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Jamal Ahmad Khan',
        message : 'Help Article Not Found'

    })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Jamal Ahmad Khan',
        message : 'Page Not Found'
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})