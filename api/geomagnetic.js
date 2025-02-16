import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getGeomagneticActivity(data = {}) {
  return request(
    url('geomagactivity', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}
