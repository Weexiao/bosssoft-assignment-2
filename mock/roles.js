const Mock = require('mockjs')

const data = Mock.mock({
  'item|2': [{
    id: '@id',
    'type|1': ['admin', 'user'],
    description: '@paragraph(1, 3)',
    'status|1': ['active', 'inactive'],
    'number': '10',
    'createTime': '@datetime',
    'updateTime': '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/roles/list',
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
