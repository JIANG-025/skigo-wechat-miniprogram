const OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast'
const REQUEST_TIMEOUT = 7000

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

function formatLocalWeather(resort) {
  return {
    resortId: resort.id,
    resortName: resort.name,
    location: resort.location,
    weatherText: resort.weather,
    snowText: resort.snow,
    temperature: '',
    windSpeed: '',
    windSpeedText: '--',
    humidity: '',
    updatedAtText: '本地雪场数据',
    source: 'local',
    metaText: '本地雪场数据'
  }
}

function normalizeWeather(weather) {
  const windSpeedText = weather.windSpeed || weather.windSpeed === 0 ? weather.windSpeed : '--'
  return {
    ...weather,
    windSpeedText,
    metaText: `${weather.source || '天气数据'} · 观测 ${weather.updatedAtText || '刚刚更新'}`
  }
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

function buildWeatherUrl(resort) {
  const params = [
    `latitude=${encodeURIComponent(resort.latitude)}`,
    `longitude=${encodeURIComponent(resort.longitude)}`,
    'current_weather=true',
    'daily=snowfall_sum,precipitation_sum',
    'timezone=Asia%2FShanghai',
    'forecast_days=1'
  ]
  return `${OPEN_METEO_API}?${params.join('&')}`
}

function requestWeather(url) {
  return new Promise(resolve => {
    wx.request({
      url,
      method: 'GET',
      timeout: REQUEST_TIMEOUT,
      success(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data)
          return
        }
        resolve(null)
      },
      fail() {
        resolve(null)
      }
    })
  })
}

function formatApiWeather(resort, data) {
  const current = data && data.current_weather ? data.current_weather : null
  if (!current) return null
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

async function fetchWeather(resort) {
  if (!resort || !resort.latitude || !resort.longitude) {
    return normalizeWeather(formatLocalWeather(resort))
  }
  const data = await requestWeather(buildWeatherUrl(resort))
  const weather = formatApiWeather(resort, data)
  if (weather) return normalizeWeather(weather)
  return normalizeWeather(formatLocalWeather(resort))
}

module.exports = {
  fetchWeather,
  formatLocalWeather,
  normalizeWeather
}
