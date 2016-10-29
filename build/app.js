"use strict";
var request = require('request');
var consumer = 'BN5GEnTp0eLwjdqwJCctdS198';
var secret = 'HBIZLpUJ2Ifq72hLHDBRZk5bvvZFWOFFAChOAYN3PvInldHerC';
var url = 'https://api.twitter.com/1.1/trends/place.json';
request(url, {
    method: 'POST'
}, function (error, response, body) {
    console.log(response.statusCode);
    console.log(error, body);
});
