const Mock = require('mockjs')

const data = Mock.mock({
  'item|5': [{
    'id|+1': 1,
    'department': 'Department',
    'number|1-100': 1,
    'address': '@county(true)',
    'status|1': ['active', 'inactive'],
    'createTime': '@datetime',
    'updateTime': '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/group/list',
    type: 'get',
    response: config => {
      const items = data.item
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
