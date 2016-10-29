"use strict";
var dotenv_1 = require('dotenv');
var request = require('request');
dotenv_1.config();
var API = 'https://api.twitter.com';
var TWITTER_CONSUMER = process.env.TWITTER_CONSUMER;
var TWITTER_SECRET = process.env.TWITTER_SECRET;
function authorize(consumerKey, secretKey) {
    var code = new Buffer(encodeURIComponent(consumerKey) + ':' + encodeURIComponent(secretKey)).toString('base64');
    return new Promise(function (resolve, reject) {
        request(API + "/oauth2/token", {
            method: 'post',
            headers: {
                'Authorization': "Basic " + code,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            json: true,
            body: 'grant_type=client_credentials'
        }, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body.access_token);
        });
    });
}
function requestTrends(token) {
    return new Promise(function (resolve, reject) {
        request("https://api.twitter.com/1.1/trends/place.json?id=1", {
            json: true,
            headers: {
                'Authorization': "Bearer " + token,
            }
        }, function (error, response, body) {
            if (error)
                reject(error);
            resolve(body);
        });
    });
}
authorize(TWITTER_CONSUMER, TWITTER_SECRET)
    .then(function (accessToken) {
    return requestTrends(accessToken);
})
    .then(function (response) {
    response[0].trends.map(function (trend) {
        console.log(trend.name, trend.tweet_volume);
    });
});
