/* 用户相关请求模块 */

import request from '@/utils/request'
import store from '@/store'

export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 发送验证码
export const sendsSms = (mobile) => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile,
    method: 'GET'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.state.user.data.token}`
    }
  })
}
