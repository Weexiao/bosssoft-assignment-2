import { login, logout, getInfo, register, forgotPassword } from '@/api/user'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERUID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token, expireTime } = response
        commit('SET_TOKEN', token)
        setToken(token)
        setTokenTime(expireTime)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, id } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        // 将权限字段保存到sessionStorage中
        sessionStorage.setItem('codeList', JSON.stringify(roles))
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        // 将用户id保存到vuex中
        commit('SET_USERUID', id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        // removeToken() // must remove  token  first
        // resetRouter()
        // commit('RESET_STATE')
        // resolve()

        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })
        commit('RESET_STATE')

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // register
  register({ commit }, userInfo) {
    const { username, realName, password, email, phone, qq } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), realName: realName.trim(), password: password, email: email.trim(), phone: phone.trim(), qq: qq.trim() }).then(response => {
        // eslint-disable-next-line no-unused-vars
        const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // forget password
  forgetPassword({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      forgotPassword({ username: username.trim(), password: password }).then(response => {
        // eslint-disable-next-line no-unused-vars
        const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

