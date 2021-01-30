const request = require('request')

const forcast = (lat,long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ca95a7c88f317d346d9d6225ed5c969b&query='+ lat +',+'+ long +'&units=f'

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect with web server',undefined)
        }
        else if(body.error)
        {
            callback('Please enter the correct information',undefined)
        }
        else{
            
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature +' degree Farenhight out. Its feels like ' + body.current.feelslike + ' degree out.')
        }
    })
}

module.exports = forcast