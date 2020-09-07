import { config } from '@/api/config'
import { url } from '@/api/url'
import { request } from '@/http/request'

export function getImageChannels(data = {}) {
  return request(
    url('imagechannels', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}

export function getImageChannelTypes(data = {}) {
  return request(
    url('channeltypes', {
      ...data,
      format: 'json'
    }),
    config.CREDENTIALS
  )
}
