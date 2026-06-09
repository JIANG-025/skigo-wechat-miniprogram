const https = require('https')
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const weatherCodeText = {
  0: '晴',
  1: '晴间多云',
  2: '多云',
  3: '阴',
  45: '雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '强毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '雪粒',
  80: '阵雨',
  81: '强阵雨',
  82: '暴雨',
  85: '阵雪',
  86: '强阵雪',
  95: '雷暴'
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, response => {
      let body = ''
      response.on('data', chunk => {
        body += chunk
      })
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`Weather API status ${response.statusCode}`))
          return
        }
        try {
          resolve(JSON.parse(body))
        } catch (error) {
          reject(error)
        }
      })
    })
    req.setTimeout(8000, () => {
      req.destroy(new Error('Weather API timeout'))
    })
    req.on('error', reject)
  })
}

function snowLevel(weatherCode, snowfall) {
  if (snowfall >= 5) return '新雪充足'
  if (snowfall > 0) return '有降雪'
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return '正在降雪'
  return '雪况稳定'
}

function formatUpdatedAt(time) {
  if (!time) return '刚刚更新'
  const date = new Date(time)
  if (Number.isNaN(date.getTime())) return '刚刚更新'
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}

async function getCurrentWeather(resort = {}) {
  const latitude = Number(resort.latitude)
  const longitude = Number(resort.longitude)
  if (!latitude || !longitude) {
    throw new Error('缺少雪场经纬度')
  }

  const query = [
    `latitude=${encodeURIComponent(latitude)}`,
    `longitude=${encodeURIComponent(longitude)}`,
    'current_weather=true',
    'daily=snowfall_sum,precipitation_sum',
    'timezone=Asia%2FShanghai',
    'forecast_days=1'
  ].join('&')
  const data = await requestJson(`https://api.open-meteo.com/v1/forecast?${query}`)
  const current = data.current_weather || {}
  const snowfall = Number((data.daily && data.daily.snowfall_sum && data.daily.snowfall_sum[0]) || 0)
  const weatherCode = Number(current.weathercode)
  const temperature = Math.round(Number(current.temperature))
  const condition = weatherCodeText[weatherCode] || '天气更新'

  return {
    resortId: resort.id,
    resortName: resort.name,
    location: resort.location,
    weatherText: `${condition} ${temperature}℃`,
    snowText: snowLevel(weatherCode, snowfall),
    temperature,
    windSpeed: current.windspeed || '',
    humidity: '',
    snowfall,
    updatedAtText: formatUpdatedAt(current.time),
    source: 'Open-Meteo'
  }
}

exports.main = async (event) => {
  const action = event.action || 'current'
  if (action === 'current') {
    return {
      weather: await getCurrentWeather(event.resort)
    }
  }
  throw new Error(`Unknown action: ${action}`)
}
