import http from '@/utils/request'

export default {
  /**
   * 查询部门列表
   * @param param
   * @returns
   */
  async getDepartmentList(param) {
    return await http.get('/deptConsumer/department/list', param)
  },

  /**
   * 获取所属部门列表
   */
  async getParentTreeList() {
    return await http.get('/deptConsumer/department/parent/list')
  },

  /**
   * 添加部门
   */
  async addDept(params) {
    return await http.post('/deptConsumer/department/add', params)
  },

  /**
   * 修改部门
   */
  async updateDept(params) {
    return await http.put('/deptConsumer/department/update', params)
  },

  /**
   * 检查部门下是否存在子部门
   */
  async checkDepartment(params) {
    return await http.getRestApi('/deptConsumer/department/check', params)
  },

  /**
   * 删除部门
   */
  async deleteById(params) {
    return await http.delete('/deptConsumer/department/delete', params)
  }
}
