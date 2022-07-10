import http from '@/utils/request'

export default {
  /**
   * 查询权限菜单列表
   * @param params
   */
  async getMenuList(params) {
    return await http.get('/permissionConsumer/permission/list', params)
  },
  /**
   * 获取上级菜单
   * @returns
   */
  async getParentMenuList(params) {
    return await http.get('/permissionConsumer/permission/parent/list', params)
  },
  /**
   * 添加菜单
   */
  async addMenu(params) {
    return await http.post('/permissionConsumer/permission/add', params)
  },
  /**
   * 修改菜单
   */
  async updateMenu(params) {
    return await http.put('/permissionConsumer/permission/update', params)
  },
  /**
   * 检查菜单下是否有子菜单
   */
  async checkPermission(params) {
    return await http.getRestApi('/permissionConsumer/permission/check', params)
  },
  /**
   * 删除菜单
   */
  async deleteById(params) {
    return await http.delete('/permissionConsumer/permission/delete', params)
  }
}
