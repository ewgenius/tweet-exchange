import { config as configDotenv } from 'dotenv'
import * as http from 'http'
import * as request from 'request'

configDotenv()
const API = 'https://api.twitter.com'

const TWITTER_CONSUMER = process.env.TWITTER_CONSUMER
const TWITTER_SECRET = process.env.TWITTER_SECRET

function authorize(consumerKey: string, secretKey: string): Promise<string> {
  const code = new Buffer(encodeURIComponent(consumerKey) + ':' + encodeURIComponent(secretKey)).toString('base64')

  return new Promise<string>((resolve, reject) => {
    request(`${API}/oauth2/token`, {
      method: 'post',
      headers: {
        'Authorization': `Basic ${code}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      json: true,
      body: 'grant_type=client_credentials'
    }, (error: any, response: http.IncomingMessage, body: any) => {
      if (error)
        reject(error)
      else resolve(body.access_token)
    })
  })
}

interface Trend {
  name: string
  url: string
  promoted_content: any
  query: string
  tweet_volume: number
}

interface TrendResponse {
  trends: Trend[]
}

type TrendsResponse = TrendResponse[]

function requestTrends(token: string): Promise<TrendsResponse> {
  return new Promise<TrendsResponse>((resolve, reject) => {
    request(`https://api.twitter.com/1.1/trends/place.json?id=1`, {
      json: true,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }, (error: any, response: http.IncomingMessage, body: any) => {
      if (error) reject(error)
      resolve(body)
    })
  })
}

authorize(TWITTER_CONSUMER, TWITTER_SECRET)
  .then(accessToken => {
    return requestTrends(accessToken)
  })
  .then(response => {
    response[0].trends.map(trend => {
      console.log(trend.name, trend.tweet_volume)
    })
  })