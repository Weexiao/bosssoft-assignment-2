const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@title(3, 5)',
    'rank|1-100': 1,
    'score|1-10': 1,
    'status|1': ['active', 'inactive'],
    'type|1': ['A', 'B', 'C'],
    'createTime': '@datetime',
    'updateTime': '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/subsystem/list',
    type: 'get',
    response: config => {
      const items = data.items
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
