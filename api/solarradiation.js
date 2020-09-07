import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getSolarRadiation(data = {}) {
  return request(
    url('solarradiation', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getSolarRadiationTypes(data = {}) {
  return request(
    url('solarradiationtypes', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export default {
  getSolarRadiation,
  getSolarRadiationTypes
}
