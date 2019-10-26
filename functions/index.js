const functions = require('firebase-functions');
const rq = require('request');
const cors = require('cors')({origin: false});
const process = require('process');

const API_KEY = process.env.API_KEY;

exports.events = functions.https.onRequest((request, response) => {

    console.log('Bearer ' + API_KEY)

    response.set('Access-Control-Allow-Origin', '*');

    rq.get({

        url: 'https://www.eventbriteapi.com/v3/users/me/events/?expand=venue',

        headers: {
            'Authorization': 'Bearer ' + API_KEY
        }

    }, function(error, res, body) {
        if (response) {
            return response.status(res.statusCode).send(JSON.parse(res.body))
        } else {
            return response.status(500).send({
                error: 'Something went wrong'
            });
        }
    })
});
