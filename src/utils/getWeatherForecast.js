const request = require('request');

const getWeatherForecast = (lattitude, longitude, callback) => {
    const URL = `http://api.weatherstack.com/current?access_key=a4d7715be6fa904208220ddf01fa37d1&query=${lattitude},${longitude}&units=f`

    request({ url: URL, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weatherstack!');
        } else if(body.error) {
            callback('Invalid input URL');
        } else {
            const data = body;
            callback(undefined, data);
        }
    })
}

module.exports = getWeatherForecast;