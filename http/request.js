import axios from 'axios'

export function request(url, options) {
  return axios({
    ...options,
    url
  })
}

export default request
