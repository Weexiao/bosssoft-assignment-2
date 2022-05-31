// Just a mock data

const constantRoutes = [
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
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },

  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: 'external-link',
    component: 'layout/Layout',
    children: [
      {
        path: 'https://blog.csdn.net/Weexiao?type=blog',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/center',
    component: 'layout/Layout',
    redirect: '/#/user',
    name: 'UserCenter',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'UserCenter',
      icon: 'nested',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/usercontrol/index'), // Parent router-view
        name: 'UserControl',
        meta: { title: 'UserControl', roles: ['admin'] }
      },
      {
        path: 'subsystem',
        component: () => import('@/views/subsystem/index'),
        name: 'SubSystem',
        meta: { title: 'SubSystemControl', roles: ['admin'] }
      },
      {
        path: 'roles',
        component: () => import('@/views/rolescontrol/index'),
        name: 'RolesControl',
        meta: { title: 'RolesControl', roles: ['admin'] }
      },
      {
        path: 'group',
        component: () => import('@/views/groupcontrol/index'),
        name: 'GroupControl',
        meta: { title: 'GroupControl', roles: ['admin'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
