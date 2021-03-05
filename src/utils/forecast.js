const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=274a4ee1ab7b1d5f7acb8e74cb69f4b2&query=${longitude},${latitude}`
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Cannot connect to weather services!',undefined)
        }else if(body.error){
            callback('can not find the location',undefined)
        }else{
            const {weather_descriptions: description, temperature, feelslike} = body.current
            const location = body.location.timezone_id
            callback(undefined,{forecast: `${description[0]} . It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`,location})
        }
    })
}

module.exports = forecast