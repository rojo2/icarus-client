import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getProtonFlux(data = {}) {
  return request(
    url('protonflux', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getProtonFluxTypes(data = {}) {
  return request(
    url('ptypes', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}
