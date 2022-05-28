const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@cname',
    department: '@department',
    age: '@integer(18, 60)',
    address: '@county(true)',
    date: '@date',
    salary: '@float(1000, 10000, 2, 2)',
    position: '@position',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
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
