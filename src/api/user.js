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
  return await http.put('/userConsumer/user/updatePassword', data)
}

/**
 * 获取菜单数据
 */
export async function getMenuList() {
  return await http.get('/sysUserConsumer/sysUser/getMenuList')
}

/**
 * 刷新token
 */
export async function refreshToken(params) {
  return await http.post('/sysUserConsumer/sysUser/refreshToken', params)
}

export default {
  /**
   * 查询用户列表
   * @param params
   */
  async getUserList(params) {
    return await http.get('/userConsumer/user/list', params)
  },
  /**
   * 添加用户
   */
  async addUser(params) {
    return await http.post('/userConsumer/user/add', params)
  },
  /**
   * 编辑用户
   */
  async updateUser(params) {
    return await http.put('/userConsumer/user/update', params)
  },
  /**
   * 删除用户
   */
  async deleteUser(params) {
    return await http.delete('/userConsumer/user/delete', params)
  },
  /**
   * 查询用户角色列表
   */
  async getAssignRoleList(params) {
    return await http.get('/userConsumer/user/getRoleListForAssign', params)
  },
  /**
   * 获取分配角色列表数据
   */
  async getRoleIdByUserId(params) {
    return await http.getRestApi('/userConsumer/user/getRoleListByUserId', params)
  },
  /**
   * 分配角色
   */
  async assignRoleSave(params) {
    return await http.post('/userConsumer/user/saveUserRole', params)
  }
}
