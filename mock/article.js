import Mock from 'mockjs'

const List = []
const du_list = []
const count = 5

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  du_list.push(Mock.mock({
    pid: '@increment',
    timestamp: '@datetime',
    author: '@cname',
    title: '@ctitle(10, 40)',
    // content_short: '@csentence(20, 50)',
    // content: '@cparagraph(20, 50)',
    published: '@integer(0,1)',
    'order|1-20': 1
  }))
}

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}



export default [
  {
    url: '/du_list',
    type: 'get',
    response: config => {
      const { published, title, page = 1, limit = 10, sort } = config.query
      let mockList = du_list.filter(item => {
        
        if (published>-1 && item.published != published)
         {
           return false
          }
        if (title && item.title.indexOf(title) < 0) {return false}
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
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
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/delList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: du_list.length,
          list: du_list
        }
      }
    }
  },
  {
    url: '/delPic',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: du_list.length,
          list: du_list
        }
      }
    }
  },
  {
    url: '/publishList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: du_list.length,
          list: du_list
        }
      }
    }
  },
  {
    url: '/stopPublishList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: du_list.length,
          list: du_list
        }
      }
    }
  },
  {
    url: '/sortList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: du_list.length,
          list: du_list
        }
      }
    }
  }
]

