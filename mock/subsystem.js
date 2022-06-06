const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@title(3, 5)',
    'rank|1-100': 1,
    'score|1-10': 1,
    'status|1': ['active', 'inactive'],
    'type|1': ['A', 'B', 'C'],
    'createTime': '@datetime',
    'updateTime': '@datetime'
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/subsystem/list',
    type: 'get',
    response: config => {
      // const items = data.items
      // return {
      //   code: 20000,
      //   data: {
      //     total: items.length,
      //     items: items
      //   }
      // }

      const { type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
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
