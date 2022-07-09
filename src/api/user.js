import http from '@/utils/request'

/**
 * @description 用户登录
 * @returns
 */
export async function login(data) {
  return await http.login('/user/login', data)
}

/**
 * @description 获取用户信息和权限信息
 * @returns
 */
export async function getInfo() {
  return await http.get('/sysUserConsumer/sysUser/getInfo')
}

/**
 * @description 用户登出
 * @returns
 */
export async function logout(param) {
  return await http.post('/sysUserConsumer/sysUser/logout', param)
}

export async function register(data) {
  return await http.post('/userConsumer/user/register', data)
}

export async function forgotPassword(data) {
  return await http.post('/userConsumer/user/forgotPassword', data)
}

/**
 * 获取菜单数据
 */
export async function getMenuList() {
  return await http.get('/sysUserConsumer/sysUser/getMenuList')
}
