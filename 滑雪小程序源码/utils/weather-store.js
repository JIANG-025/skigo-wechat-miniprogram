const CLOUD_FUNCTION = 'weatherService'
const CLOUD_TIMEOUT = 2500

function withTimeout(promise, timeout = CLOUD_TIMEOUT) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('weatherService request timeout')), timeout)
    })
  ])
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

async function fetchWeather(resort) {
  try {
    const response = await withTimeout(
      wx.cloud.callFunction({
        name: CLOUD_FUNCTION,
        data: {
          action: 'current',
          resort: {
            id: resort.id,
            name: resort.name,
            location: resort.location,
            latitude: resort.latitude,
            longitude: resort.longitude
          }
        }
      })
    )
    const result = response.result || {}
    if (result.weather) return normalizeWeather(result.weather)
  } catch (error) {
    console.warn('[weatherService] fallback to local weather', error && error.message ? error.message : error)
  }
  return normalizeWeather(formatLocalWeather(resort))
}

module.exports = {
  fetchWeather,
  formatLocalWeather,
  normalizeWeather
}
