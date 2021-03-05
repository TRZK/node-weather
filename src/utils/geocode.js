const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidHJ6azM2IiwiYSI6ImNrbDVoNDFhMzBsZzMydnBqZjljdmxsdHcifQ.HdiSCZGA47I9EwFUzYOPgw&limit=1`

    request({url, json: true},(error,{body})=>{
        if(error){
            callback('unable to connect location sevices!!', undefined)
        }else if(!body.features){
            callback('location not found', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode