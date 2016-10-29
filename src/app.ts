import * as http from 'http'
import * as request from 'request'


const url = 'https://api.twitter.com/1.1/trends/place.json'

request(url, {
  method: 'POST'
}, (error: any, response: http.IncomingMessage, body: any) => {
  console.log(response.statusCode)
  console.log(error, body)
})