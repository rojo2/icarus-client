import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getSunspots(data = {}) {
  return request(
    url('sunspot', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getSunspotTypes(data = {}) {
  return request(
    url('sunspottypes', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getSunspotRegions(data = {}) {
  return request(
    url('sunspotregion', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export default {
  getSunspots,
  getSunspotTypes,
  getSunspotRegions
}
