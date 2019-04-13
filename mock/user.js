
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      return {
        code: 20000,
        // message: "登录失败",
        data: tokens[username]
      }
    }
  },
  
  {
    url: '/test1',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        // message: "这是某个测试错误",
        data: {tit:'这是一个成功的测试结果'}
      }
    }
  },
  {
    url: '/test2',
    type: 'get',
    response: config => {
      return {
        code: 30000,
        message: "这是错误结果",
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      return {
        code: 20000,
        data: users[token]
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
