const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e63f0c7d141f6e8e6a04eff77024464&query=' + lat + ',' + lon +'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Sorry, Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out in ' + body.location.name + ', making it ' + body.current.weather_descriptions +'. Humidity is currently at ' +body.current.humidity+'.'+'There is  therefore  a ' + body.current.precip + '% chance of rain today.')
        }
    })
}

module.exports = forecast