const axios = require('axios');

const API_URL = 'https://api.yelp.com/v3/businesses/search';
const API_KEY = 'JrxcQZZaRqaV_PnuhcEhuAhfaWALPegTY-UpwhH1nQOCiVUuFw6clyrUzIEY5GzUJH-cxiP7lWcZtgHrLM_AoYPMghRzOVuRxYAkTdgmE0I87Bv5TN_IdNJzpyhgXnYx';
const yelp = require('yelp-fusion');
const client = yelp.client(API_KEY);

const config = {
    headers: { Authorization: `Bearer ${API_KEY}` }
};

// Helper Function to be used by call and load
function sendUs(response) {
    var sendMe = [];
            var length = response.jsonBody.businesses.length
            var i;
            for (i = 0; i < length; i++)
            {
                // pushes object in to array
                sendMe.push({
                    "id": response.jsonBody.businesses[i].id,
                    "name": response.jsonBody.businesses[i].name,
                    "lat": response.jsonBody.businesses[i].coordinates.latitude,
                    "long": response.jsonBody.businesses[i].coordinates.longitude,
                    "address": response.jsonBody.businesses[i].location.address1 + ", " + response.jsonBody.businesses[i].location.city,
                    "rating": response.jsonBody.businesses[i].rating,
                    "img": response.jsonBody.businesses[i].image_url,
                    "phone": response.jsonBody.businesses[i].phone,
                    "revCount": response.jsonBody.businesses[i].review_count,
                    "categories": response.jsonBody.businesses[i].categories
                })
            }
            
            return sendMe
}


module.exports = {
    async call(req, res) {
        client.search({
            location: req.params.search,
        }).then(response => {
            res.contentType('application/json');
            return res.status(200).send(JSON.stringify(sendUs(response)));
        }).catch(error => {
            console.log(error);
        });

    },
    async load(req, res) {
        client.search({
           latitude: req.params.lat,
           longitude: req.params.long,
        }).then(response => {
            res.contentType('application/json');
            return res.status(200).send(JSON.stringify(sendUs(response)));
        }).catch(error => {
            console.log(error);
        })
    },
    async filter(req, res) {
        if (req.params.price > 0 && req.params.price < 5 && req.params.term != "null")
        {
            client.search({
                location: req.params.search,
                price: req.params.price,
                term: req.params.term,
                radius: 4828,
            }).then(response => {
                res.contentType('application/json');
                return res.status(200).send(JSON.stringify(sendUs(response)));
            }).catch(error => {
                console.log(error);
            })
        }
        else if (req.params.price > 0 && req.params.price < 5)
        {
            client.search({
                location: req.params.search,
                price: req.params.price,
                radius: 4828,
            }).then(response => {
                res.contentType('application/json');
                return res.status(200).send(JSON.stringify(sendUs(response)));
            }).catch(error => {
                console.log(error);
            })
        }
        else if (req.params.term != "null")
        {
            client.search({
                location: req.params.search,
                term: req.params.term,
                radius: 4828,
            }).then(response => {
                res.contentType('application/json');
                return res.status(200).send(JSON.stringify(sendUs(response)));
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            client.search({
                location: req.params.search,
                radius: 4828,
            }).then(response => {
                res.contentType('application/json');
                return res.status(200).send(JSON.stringify(sendUs(response)));
            }).catch(error => {
                console.log(error);
            })
        }
    }
}