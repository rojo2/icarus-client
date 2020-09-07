import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getAlerts(data = {}) {
  return request(
    url('alerts', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getAlertTypes(data = {}) {
  return request(
    url('xtypes', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getForecast(data = {}) {
  return request(
    url('forecastrationale', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}
