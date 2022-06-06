const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'status|1': ['editor', 'admin'],
    name: '@name',
    department: '@department',
    age: '@integer(18, 60)',
    address: '@region',
    date: '@date',
    salary: '@float(1000, 10000, 2, 2)',
    position: '@position',
    'createTime': '@datetime',
    'updateTime': '@datetime'
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const { status, name, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.status !== status) return false
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
