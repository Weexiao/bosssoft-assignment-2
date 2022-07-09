import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/forgot-password',
    component: () => import('@/views/login/forgetPassword'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', roles: ['admin', 'editor'] }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/center',
  //   component: Layout,
  //   redirect: '/#/user',
  //   name: 'UserCenter',
  //   meta: {
  //     title: 'UserCenter',
  //     icon: 'nested',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/usercontrol/index'), // Parent router-view
  //       name: 'UserControl',
  //       meta: { title: 'UserControl', roles: ['admin'] }
  //     },
  //     {
  //       path: 'permission',
  //       component: () => import('@/views/permissioncontrol/index'),
  //       name: 'PermissionControl',
  //       meta: { title: 'PermissionControl', roles: ['admin'] }
  //     },
  //     {
  //       path: 'roles',
  //       component: () => import('@/views/rolescontrol/index'),
  //       name: 'RolesControl',
  //       meta: { title: 'RolesControl', roles: ['admin'] }
  //     }
  //     // {
  //     //   path: 'group',
  //     //   component: () => import('@/views/groupcontrol/index'),
  //     //   name: 'GroupControl',
  //     //   meta: { title: 'GroupControl', roles: ['admin'] }
  //     // }
  //   ]
  // },
  //
  // {
  //   path: '/workflow',
  //   component: Layout,
  //   name: 'WorkFlow',
  //   meta: {
  //     title: 'WorkFlow',
  //     icon: 'nested',
  //     roles: ['admin', 'editor']
  //   },
  //   children: [
  //     {
  //       path: 'group',
  //       component: () => import('@/views/groupcontrol/index'),
  //       name: 'GroupControl',
  //       meta: { title: 'NewArticle', roles: ['admin', 'editor'] }
  //     },
  //     {
  //       path: 'group',
  //       component: () => import('@/views/groupcontrol/index'),
  //       name: 'GroupControl',
  //       meta: { title: 'ArticleControl', roles: ['admin', 'editor'] }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://blog.csdn.net/Weexiao?type=blog',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
