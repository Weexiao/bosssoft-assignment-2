import http from '@/utils/request'

export default {
  /**
   * 查询角色列表
   */
  async getRoleList(params) {
    return await http.get('/roleConsumer/role/list', params)
  },
  /**
   * 添加角色
   */
  async addRole(params) {
    return await http.post('/roleConsumer/role/add', params)
  },
  /**
   * 编辑角色
   */
  async updateRole(params) {
    return await http.put('/roleConsumer/role/update', params)
  },
  /**
   * 查询分配权限树列表
   */
  async getAssignTree(params) {
    return await http.get('/roleConsumer/role/getAssignPermissionTree', params)
  },
  /**
   * 分配权限
   */
  async assignSave(params) {
    return await http.post('/roleConsumer/role//saveRolePermission', params)
  },
  /**
   * 检查角色是否被分配
   */
  async checkRole(params) {
    return await http.getRestApi('/roleConsumer/role/check', params)
  },

  /**
   * 删除角色
   */
  async deleteById(params) {
    return await http.delete('/roleConsumer/role/delete', params)
  }
}
