import request from '@/utils/request'

const url = 'http://localhost:8080'

export function login(data) {
  return request({
    url: url + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: url + '/user/detail',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: url + '/user/logout',
    method: 'post'
  })
}
