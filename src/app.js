const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 5000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'David Asem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Asem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a weather app which is still in active development. New updates will be added periodically.',
        title: 'Help',
        name: 'David Asem'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the name of a city or an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({error:error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error:error})
            }

            else {
                res.send({
                    forecast: forecastData,
                    location:location,
                    address: req.query.address
                })
            }
        })
    }

)
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Asem',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Asem',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`)
})