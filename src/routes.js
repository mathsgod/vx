function index() {
  return import(/* webpackChunkName: "index" */ './pages/index.vue')
}
function auth_login_basic() {
  return import(
    /* webpackChunkName: "auth-login-basic" */ './pages/auth-login-basic.vue'
  )
}
function Dashboard_index() {
  return import(
    /* webpackChunkName: "Dashboard-index" */ './pages/Dashboard/index.vue'
  )
}
function System_index() {
  return import(
    /* webpackChunkName: "System-index" */ './pages/System/index.vue'
  )
}
function User_index() {
  return import(/* webpackChunkName: "User-index" */ './pages/User/index.vue')
}
function UserGroup_index() {
  return import(
    /* webpackChunkName: "UserGroup-index" */ './pages/UserGroup/index.vue'
  )
}
function ACL_all() {
  return import(/* webpackChunkName: "ACL-all" */ './pages/ACL/all.vue')
}
function System_mail_test() {
  return import(
    /* webpackChunkName: "System-mail-test" */ './pages/System/mail-test.vue'
  )
}
function System_package() {
  return import(
    /* webpackChunkName: "System-package" */ './pages/System/package.vue'
  )
}
function System_phpinfo() {
  return import(
    /* webpackChunkName: "System-phpinfo" */ './pages/System/phpinfo.vue'
  )
}
function System_setting() {
  return import(
    /* webpackChunkName: "System-setting" */ './pages/System/setting.vue'
  )
}
function System_test() {
  return import(/* webpackChunkName: "System-test" */ './pages/System/test.vue')
}
function System_database_index() {
  return import(
    /* webpackChunkName: "System-database-index" */ './pages/System/database/index.vue'
  )
}
function User_add() {
  return import(/* webpackChunkName: "User-add" */ './pages/User/add.vue')
}
function User_setting() {
  return import(
    /* webpackChunkName: "User-setting" */ './pages/User/setting.vue'
  )
}
function User_setting_2fa() {
  return import(
    /* webpackChunkName: "User-setting-2fa" */ './pages/User/setting/2fa.vue'
  )
}
function User_setting_bio_auth() {
  return import(
    /* webpackChunkName: "User-setting-bio-auth" */ './pages/User/setting/bio-auth.vue'
  )
}
function User_setting_general() {
  return import(
    /* webpackChunkName: "User-setting-general" */ './pages/User/setting/general.vue'
  )
}
function User_setting_information() {
  return import(
    /* webpackChunkName: "User-setting-information" */ './pages/User/setting/information.vue'
  )
}
function User_setting_password() {
  return import(
    /* webpackChunkName: "User-setting-password" */ './pages/User/setting/password.vue'
  )
}
function User_setting_style() {
  return import(
    /* webpackChunkName: "User-setting-style" */ './pages/User/setting/style.vue'
  )
}
function UserGroup_add() {
  return import(
    /* webpackChunkName: "UserGroup-add" */ './pages/UserGroup/add.vue'
  )
}
function System_database_charset() {
  return import(
    /* webpackChunkName: "System-database-charset" */ './pages/System/database/charset.vue'
  )
}
function User__id_edit() {
  return import(
    /* webpackChunkName: "User-id-edit" */ './pages/User/_id/edit.vue'
  )
}
function UserGroup__id_edit() {
  return import(
    /* webpackChunkName: "UserGroup-id-edit" */ './pages/UserGroup/_id/edit.vue'
  )
}

export default [
  {
    name: 'index',
    path: '/',
    component: index,
  },
  {
    name: 'auth-login-basic',
    path: '/auth-login-basic',
    component: auth_login_basic,
  },
  {
    name: 'Dashboard',
    path: '/Dashboard',
    component: Dashboard_index,
  },
  {
    name: 'System',
    path: '/System',
    component: System_index,
  },
  {
    name: 'User',
    path: '/User',
    component: User_index,
  },
  {
    name: 'UserGroup',
    path: '/UserGroup',
    component: UserGroup_index,
  },
  {
    name: 'ACL-all',
    path: '/ACL/all',
    component: ACL_all,
  },
  {
    name: 'System-mail-test',
    path: '/System/mail-test',
    component: System_mail_test,
  },
  {
    name: 'System-package',
    path: '/System/package',
    component: System_package,
  },
  {
    name: 'System-phpinfo',
    path: '/System/phpinfo',
    component: System_phpinfo,
  },
  {
    name: 'System-setting',
    path: '/System/setting',
    component: System_setting,
  },
  {
    name: 'System-test',
    path: '/System/test',
    component: System_test,
  },
  {
    name: 'System-database',
    path: '/System/database',
    component: System_database_index,
  },
  {
    name: 'User-add',
    path: '/User/add',
    component: User_add,
  },
  {
    name: 'User-setting',
    path: '/User/setting',
    component: User_setting,
    children: [
      {
        name: 'User-setting-2fa',
        path: '2fa',
        component: User_setting_2fa,
      },
      {
        name: 'User-setting-bio-auth',
        path: 'bio-auth',
        component: User_setting_bio_auth,
      },
      {
        name: 'User-setting-general',
        path: 'general',
        component: User_setting_general,
      },
      {
        name: 'User-setting-information',
        path: 'information',
        component: User_setting_information,
      },
      {
        name: 'User-setting-password',
        path: 'password',
        component: User_setting_password,
      },
      {
        name: 'User-setting-style',
        path: 'style',
        component: User_setting_style,
      },
    ],
  },
  {
    name: 'UserGroup-add',
    path: '/UserGroup/add',
    component: UserGroup_add,
  },
  {
    name: 'System-database-charset',
    path: '/System/database/charset',
    component: System_database_charset,
  },
  {
    name: 'User-id-edit',
    path: '/User/:id/edit',
    component: User__id_edit,
  },
  {
    name: 'UserGroup-id-edit',
    path: '/UserGroup/:id/edit',
    component: UserGroup__id_edit,
  },
]
