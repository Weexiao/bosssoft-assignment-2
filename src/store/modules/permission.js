import { constantRoutes } from '@/router'
// 导入获取菜单数据的方法
import { getMenuList } from '@/api/user'
// 导入Layout组件
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // return roles.some(role => route.meta.roles.includes(role))
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 过滤出所有拥有权限的菜单
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // 判断是否有相应的权限
    if (hasPermission(roles, tmp)) {
      // 获取组件
      const component = tmp.component
      // 判断该路由是否有组件
      if (route.component) {
        // 判断是否为根组件
        if (component === 'Layout') {
          tmp.component = Layout
        } else {
          // 获取对应的具体的组件信息
          tmp.component = (resolve) => require([`@/views${component}`], resolve)
        }
      }
      // 判断是否有子菜单
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getMenuList().then(res => {
        let accessedRoutes // 存放对应权限的路由信息
        // 如果状态码为200 则表示成功
        if (res.code === 200) {
          accessedRoutes = filterAsyncRoutes(res.data, roles)
        }
        // 将路由信息保存到store中
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(err => {
        reject(err)
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
